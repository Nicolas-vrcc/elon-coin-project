// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

interface IERCExtended {
    function decimals() external view returns (uint8);
}

contract ElonCoinWithPresale is Ownable, ERC20, ERC20Burnable, ERC20Capped {
    using SafeMath for uint256;

    // The token being received
    IERC20 public tokenBUSD;

    // Address where funds are sent to
    address public wallet;

    // How many token a buyer gets per 4 busd.
    // The rate is the conversion between busd and the smallest and indivisible token unit.
    // So, if you are using a rate of 10**18 with an ERC20 token with 18 decimals called TOK
    // 4 busd will give you 1000000000000000000 unit, or 1 TOK.
    uint256 public rate;

    // Amount of busd raised
    uint256 public busdRaised;

    // Presale is still ongoing
    bool public isOngoing = true;

    uint256 public presaleCap; //amount of BUSD to raise == 80000 == 80000/4 = 20000 tokens

    // investor minimum contributions, an investor can't have less than 4usdt in his contribution
    uint256 public investorMinCap; // 4 busd

    // Track investor contributions
    mapping(address => uint256) public contributions;

    //last dividend pool
    mapping(address => uint256) public userLastDividened;

    // total token in dividen pool
    uint256 public totalDividend;

    // -----------------------------------------
    // MODIFIER
    // -----------------------------------------

    modifier presaleOngoing() {
        require(isOngoing, "Presale has ended");
        _;
    }

    // -----------------------------------------
    // Crowdsale EVENTS
    // -----------------------------------------

    /**
     * Event for token purchase logging
     * @param purchaser who paid for the tokens
     * @param beneficiary who got the tokens
     * @param value busd paid for purchase
     * @param amount amount of tokens purchased
     */
    event TokenPurchase(
        address indexed purchaser,
        address indexed beneficiary,
        uint256 value,
        uint256 amount
    );

    //--------------------------------------------
    //  TOKENOMICS
    //--------------------------------------------
    uint256 internal constant dividendFee_ = 5; // 5% is being shared to holders
    uint256 internal constant burntFee_ = 1000000; //0.0001% is being burnt,, solidity doesn't support decimals, amount/1000000 == 0.0001%
    uint256 presaleTokens; // number of tokens to send to the presale contract, should be 20%% of maxSupply

    //-------------------------
    // OVERIDDEN FUNCTIONS
    //---------------------------

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC20, ERC20Capped) {
        super._beforeTokenTransfer(from, to, amount);
    }

    /**
     * @dev Destroys `amount` tokens from the caller.
     *
     * See {ERC20-_burn}.
     */
    function burn(uint256 amount) public virtual override {
        uint256 _dividenedFee = amount.div(100).mul(dividendFee_);
        totalDividend = totalDividend.add(_dividenedFee);
        amount = amount.sub(_dividenedFee);
        super.burn(amount);
    }

    //Extend parent to charge fee
    function burnFrom(address account, uint256 amount) public virtual override {
        //Override main burnFrom cause we need to get a transaction fee

        uint256 decreasedAllowance =
            allowance(account, _msgSender()).sub(
                amount,
                "ERC20: burn amount exceeds allowance"
            );

        _approve(account, _msgSender(), decreasedAllowance);
        uint256 _dividenedFee = amount.div(100).mul(dividendFee_);
        totalDividend = totalDividend.add(_dividenedFee);
        _burn(account, amount.sub(_dividenedFee));
    }

    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * Extends parent transfer
     */
    function transfer(address recipient, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        uint256 _dividenedFee = amount.div(100).mul(dividendFee_);
        totalDividend = totalDividend.add(_dividenedFee);
        uint256 _burntFee = amount.div(burntFee_);
        amount = amount.sub(_dividenedFee).sub(_burntFee);
        _burn(msg.sender, _burntFee);
        super.transfer(recipient, amount);
    }

    function mint(uint256 amount) public onlyOwner {
        uint256 _dividenedFee = amount.div(100).mul(dividendFee_);
        totalDividend = totalDividend.add(_dividenedFee);
        uint256 _burntFee = amount.div(burntFee_); // Since coin isn't already created, there's no need to burn it, so instead, we just DON'T create the coin
        amount = amount.sub(_dividenedFee).sub(_burntFee);
        _mint(msg.sender, amount);
    }

    constructor(address _tokenBUSD, uint8 decimal_)
        public
        ERC20("ElonCoin", "ELON")
        ERC20Capped(100000 * (10**uint256(decimal_)))
    {
        require(_tokenBUSD != address(0), "Zero address");
        _setupDecimals(decimal_);
        wallet = msg.sender;
        tokenBUSD = IERC20(_tokenBUSD);

        presaleCap = 80000 * (10**uint256(IERCExtended(_tokenBUSD).decimals()));
        investorMinCap = 4 * (10**uint256(IERCExtended(_tokenBUSD).decimals()));
        rate = 10**uint256(decimal_); //4busd == 1TOKEN

        // presaleTokens = 20000 * 10**(uint256(decimals())); //we could hardcode this here (20000 Tokens)
        presaleTokens = cap().div(100).mul(20); //or compute the value from cap
        _mint(address(this), presaleTokens);
    }

    //// -----------------------------------------
    // Crowdsale Public interface
    // -----------------------------------------

    /**
     * @dev Checks whether the cap has been reached.
     * @return Whether the cap was reached
     */
    function capReached() public view returns (bool) {
        return busdRaised >= presaleCap;
    }

    /**
     * @dev Returns the amount contributed so far by a sepecific user.
     * @param _beneficiary Address of contributor
     * @return User contribution so far
     */
    function getUserContribution(address _beneficiary)
        public
        view
        returns (uint256)
    {
        return contributions[_beneficiary];
    }

    /**
     * @dev Allows admin to end the presale
     */
    function endPresale() public onlyOwner {
        isOngoing = false;
        //If Ended, It can't be started again
    }

    /**
     * @dev low level token purchase ***DO NOT OVERRIDE***
     * @param _beneficiary Address performing the token purchase
     */
    function buyTokens(address _beneficiary, uint256 _busdAmount)
        public
        presaleOngoing
    {
        require(_beneficiary != address(0), "Zero Address");
        require(busdRaised.add(_busdAmount) <= presaleCap, "Cap exceeded");

        uint256 _existingContribution = contributions[_beneficiary];
        uint256 _newContribution = _existingContribution.add(_busdAmount);
        require(
            _newContribution >= investorMinCap,
            "User must have at least 4BUSD contribution to be able to buy lower"
        );
        contributions[_beneficiary] = _newContribution;

        // calculate token amount to be created
        uint256 tokens = busdToToken(_busdAmount);

        // update state
        busdRaised = busdRaised.add(_busdAmount);

        //Send tokens to buyer
        _transfer(address(this), _beneficiary, tokens);

        //emit an event
        emit TokenPurchase(msg.sender, _beneficiary, _busdAmount, tokens);

        //Forward BUSD to wallet
        tokenBUSD.transferFrom(msg.sender, wallet, _busdAmount);
    }

    function claimDividend() public returns (bool) {
        address _customer = msg.sender;
        uint256 userBalance = balanceOf(_customer);

        // substract last value user has taken
        uint256 dividendToBeShared =
            totalDividend.sub(userLastDividened[_customer]);

        require(userBalance > 0, "Only holders allowed");

        require(dividendToBeShared > 0, "No token in the pool");

        uint256 totalSupply_ =
            totalSupply().sub(presaleTokens).sub(totalDividend);

        //Calculate how many token a user gets, FORMULA balance/totalSupply(minus presale balance and dividend contract balance)*tokenToBeShared
        uint256 usersShare =
            userBalance.div(totalSupply_).mul(dividendToBeShared);
        _mint(msg.sender, usersShare);

        userLastDividened[_customer] = totalDividend;
    }

    // -----------------------------------------
    // Internal interface (extensible)
    // -----------------------------------------

    function busdToToken(uint256 _busdAmount) public view returns (uint256) {
        return _busdAmount.div(investorMinCap).mul(rate);
    }

    // -----------------------------------------
    // Crowdsale external interface
    // -----------------------------------------

    /**
     * @dev fallback function ***DO NOT OVERRIDE***
     */
    receive() external payable {
        //Send 0 BNB to claim dividends... Won't stop you from sending more tho :)
        claimDividend();
    }
}
