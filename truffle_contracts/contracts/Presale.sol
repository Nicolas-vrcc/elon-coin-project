// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function decimals() external view returns (uint8);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

contract Presale is Ownable {
    using SafeMath for uint256;

    // The token being sold
    IERC20 public token;

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

    uint256 public cap; //amount of BUSD to raise == 80000 == 80000/4 = 20000 tokens

    // investor minimum contributions, an investor can't have less than 4usdt in his contribution
    uint256 public investorMinCap; // 4 busd

    // Track investor contributions
    mapping(address => uint256) public contributions;

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

    //constructor
    constructor(address _token, address _tokenBUSD) public {
        require(_token != address(0), "Zero address");
        require(_tokenBUSD != address(0), "Zero address");

        wallet = msg.sender;
        token = IERC20(_token);
        tokenBUSD = IERC20(_tokenBUSD);

        rate = 10**(uint256(token.decimals())); //4busd == 1TOKEN
        cap = 80000 * (10**uint256(tokenBUSD.decimals()));
        investorMinCap = 4 * (10**uint256(tokenBUSD.decimals()));

        token.receiveTokenForPresale(); // Get the tokens for presale
    }

    // -----------------------------------------
    // Crowdsale external interface
    // -----------------------------------------

    /**
     * @dev fallback function ***DO NOT OVERRIDE***
     */
    receive() external payable {
        revert("Sent bnb");
    }

    //// -----------------------------------------
    // Crowdsale Public interface
    // -----------------------------------------

    /**
     * @dev Checks whether the cap has been reached.
     * @return Whether the cap was reached
     */
    function capReached() public view returns (bool) {
        return busdRaised >= cap;
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
        //If Ended, It ca't be started again
    }

    /**
     * @dev low level token purchase ***DO NOT OVERRIDE***
     * @param _beneficiary Address performing the token purchase
     */
    function buyTokens(address _beneficiary, uint256 busdAmount)
        public
        presaleOngoing
    {
        _preValidatePurchase(_beneficiary, busdAmount);

        // calculate token amount to be created
        uint256 tokens = _getTokenAmount(busdAmount);

        // update state
        busdRaised = busdRaised.add(busdAmount);

        //Send tokens to buyer
        _deliverTokens(_beneficiary, tokens);
        //emit an event
        emit TokenPurchase(msg.sender, _beneficiary, busdAmount, tokens);

        //Forward BUSD to wallet
        _forwardFunds(busdAmount);
    }

    // -----------------------------------------
    // MODIFIER
    // -----------------------------------------

    modifier presaleOngoing() {
        require(isOngoing, "Presale has ended");
        _;
    }

    // -----------------------------------------
    // Internal interface (extensible)
    // -----------------------------------------

    /**
     * @dev Validation of an incoming purchase. Use require statements to revert state when conditions are not met. Use super to concatenate validations.
     * @param _beneficiary Address performing the token purchase
     * @param _busdAmount Value in wei involved in the purchase
     */
    function _preValidatePurchase(address _beneficiary, uint256 _busdAmount)
        internal
        virtual
    {
        require(_beneficiary != address(0), "Zero Address");
        require(busdRaised.add(_busdAmount) <= cap, "Cap exceeded");
        uint256 _existingContribution = contributions[_beneficiary];
        uint256 _newContribution = _existingContribution.add(_busdAmount);
        require(_newContribution >= investorMinCap);
        contributions[_beneficiary] = _newContribution;
    }

    /**
     * @dev Source of tokens. Override this method to modify the way in which the crowdsale ultimately gets and sends its tokens.
     * @param _beneficiary Address performing the token purchase
     * @param _tokenAmount Number of tokens to be emitted
     */
    function _deliverTokens(address _beneficiary, uint256 _tokenAmount)
        internal
    {
        token.transfer(_beneficiary, _tokenAmount);
    }

    /**
     * @dev Override to extend the way in which busd is converted to tokens.
     * @param _busdAmount Value in wei to be converted into tokens
     * @return Number of tokens that can be purchased with the specified _busdAmount
     */
    function _getTokenAmount(uint256 _busdAmount)
        internal
        view
        returns (uint256)
    {
        return _busdAmount.div(investorMinCap).mul(rate);
    }

    function busdToToken(uint256 _busdAmount) public view returns (uint256) {
        return _getTokenAmount(_busdAmount);
    }

    /**
     * @dev Determines how BUSD is stored/forwarded on purchases.
     */
    function _forwardFunds(uint256 _busdAmount) internal virtual {
        tokenBUSD.transferFrom(msg.sender, wallet, _busdAmount);
    }
}
