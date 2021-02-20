// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract Dividend {
    using SafeMath for uint256;

    mapping(address => uint256) public userLastDividened;
    IERC20 public token;
    address public presale;

    constructor(address _token, address presale_) public {
        token = IERC20(_token);
        presale = presale_;
    }

    function claimDividend() public returns (bool) {
        address _customer = msg.sender;
        uint256 userBalance = token.balanceOf(_customer);
        uint256 presaleBalance = token.balanceOf(presale);
        uint256 totalDividened = token.balanceOf(address(this));

        // substract last value user has taken
        uint256 dividendToBeShared =
            totalDividened.sub(userLastDividened[_customer]);

        require(userBalance > 0, "Only holders allowed");

        require(dividendToBeShared > 0, "No token in the pool");

        uint256 totalSupply_ =
            token.totalSupply().sub(presaleBalance).sub(totalDividened);

        //Calculate how many token a user gets, FORMULA balance/totalSupply(minus presale balance and dividend contract balance)*tokenToBeShared
        uint256 usersShare =
            userBalance.div(totalSupply_).mul(dividendToBeShared);

        userLastDividened[_customer] = totalDividened;
    }
}
