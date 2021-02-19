// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract ElonCoin is Ownable, ERC20, ERC20Burnable, ERC20Capped {
    address public presale; // Presale Contract Address
    bool public alreadySent; // Presale vaiable to know if token is sent already false by default

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
        if (sender == presale || recipient == presale) {
            //No burning or dividened cut if the receiver or sender is the presale contract
            super.burn(amount);
        } else {
            uint256 _dividenedFee = amount.div(100).mul(dividendFee_);
            amount = amount.sub(_dividenedFee);
            super.burn(amount);
        }
    }

    //
    function burnFrom(address account, uint256 amount) public virtual override {
        if (sender == presale || recipient == presale) {
            //No burning or dividened cut if the receiver or sender is the presale contract
            super.burnFrom(account, amount);
        } else {
            uint256 _dividenedFee = amount.div(100).mul(dividendFee_);
            // amount = amount.sub(_dividenedFee);
            super.burnFrom(account, amount);
            // uint256 decreasedAllowance =
            //     allowance(account, _msgSender()).sub(
            //         amount,
            //         "ERC20: burn amount exceeds allowance"
            //     );

            // _approve(account, _msgSender(), decreasedAllowance);
            // _burn(account, amount);
        }
    }

    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * Extends parent _transfer
     */
    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal virtual override {
        if (sender == presale || recipient == presale) {
            //No burning or dividened cut if the receiver or sender is the presale contract
            super._transfer(sender, recipient, amount);
        } else {
            uint256 _dividenedFee = amount.div(100).mul(dividendFee_);
            uint256 _burntFee = amount.div(burntFee_);
            amount = amount.sub(_dividenedFee).sub(_burntFee);
            _burn(sender, _burntFee);
            super._transfer(sender, recipient, amount);
        }
    }

    /** @dev Extends the _mint from parent, make token capped
     */
    function _mint(address account, uint256 amount) internal virtual override {
        if (account == presale || msg.sender == presale) {
            //No burning or dividened cut if the receiver or sender is the presale contract
            super._mint(account, amount);
        } else {
            uint256 _dividenedFee = amount.div(100).mul(dividendFee_);
            uint256 _burntFee = amount.div(burntFee_); // Since coin isn't already created, there's no need to burn it, so instead, we just DON'T create the coin
            amount = amount.sub(_dividenedFee).sub(_burntFee);
            super._mint(account, amount);
        }
    }

    modifier onlyPresale() {
        require(msg.sender == presale);
        _;
    }

    function receiveTokenForPresale() public onlyPresale returns (bool) {
        require(!alreadySent, "Token for presale has been sent already"); //To make sure we don't send token twice to the presale contracts
        alreadySent = true; // change already sent to true
        mint(presaleTokens);
    }

    function mint(uint256 amount) public onlyOwner {
        _mint(_msgSender(), amount);
    }

    function updatePresaleAddress(address _presale) public onlyOwner {
        presale = _presale;
    }

    constructor()
        public
        ERC20("ElonCoin", "ELON")
        ERC20Capped(100000 * 10**(uint256(decimals())))
    {
        presaleTokens = 20000 * 10**(uint256(decimals())); //we could hardcode this here (20000 Tokens)
        presaleTokens = cap().div(100).mul(20); //or compute the value from cap
    }
}
