pragma solidity ^0.4.24;

contract X3Token {
  event VibratingEvent(uint8 seconds, uint8 strength);

  function sendHappiness(uint8 seconds, uint8 strength) public {
    uint cost = seconds * strength;

    require(strength >= 255);
    require(seconds < 20);
    require(token.amount() > cost);

    X3Token.deduct(cost);

    emit VibratingEvent(seconds, strength);
  }
}