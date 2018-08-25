pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract X3Token is ERC20 {
  using SafeMath for uint;

  uint256 rate = 10 ** 11;
  uint supplies = 1000000;

  event VibratingEvent(uint duration, uint8 strength);

  mapping (address => uint) balances;
  mapping (address => mapping (address => uint)) internal allowances;

  function totalSupply() public view returns (uint) {
      return supplies;
  }

  function balanceOf(address who) public view returns (uint) {
      return balances[who];
  }

  function transfer(address to, uint amount)
  public returns (bool)
  {
      require(amount <= balances[msg.sender]);

      Transfer(msg.sender, to, amount);

      return true;
  }

  function allowance(address owner, address spender)
  public view returns (uint)
  {
      return allowances[owner][spender];
  }

  function transferFrom(address from, address to, uint amount)
  public returns (bool)
  {
      require(to != address(0));
      require(amount <= allowance(from, to));
      require(amount <= balances[from]);

      balances[from] = balances[from].sub(amount);
      balances[to] = balances[to].add(amount);

      allowances[from][msg.sender] = allowances[from][msg.sender].sub(amount);

      Transfer(from, to, amount);

      return true;
  }

  function approve(address spender, uint amount)
  public returns (bool)
  {
      allowances[msg.sender][spender] = amount;

      Approval(msg.sender, spender, amount);

      return true;
  }

  function getPriceRange(uint strength) public pure returns (uint) {
    if (strength > 230) {return 7;}
    if (strength > 210) {return 6;}
    if (strength > 190) {return 5;}
    if (strength > 170) {return 4;}
    if (strength > 150) {return 3;}
    if (strength > 130) {return 2;}
    return 1;
  }

  /// @author Phoomparin Mano
  /// @notice Strength must be between 150 and 255,
  ///         and Duration (msec) must be less than 20000.
  /// @dev    Vibrator Server should listen for VibratingEvent
  function sendHappiness(uint msec, uint8 strength) public {
    uint cost = msec * getPriceRange(strength);
  
    require(msec <= 20000);
    require(strength >= 130);
    require(strength <= 255);
    require(balanceOf(msg.sender) >= cost);
    
    balances[msg.sender] = balances[msg.sender].sub(cost);

    VibratingEvent(msec, strength);
  }

  /// @dev 1 ether => 1M XTN
  ///      0.01 ether => 10000 XTN
  function buyToken() public payable {
    uint256 amount = msg.value.div(rate);

    balances[msg.sender] = balances[msg.sender].add(amount);
  }

  function destroyTokens() public {
    balances[msg.sender] = 0;
  }
}