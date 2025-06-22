
//SPDX-License-Identification:MIT

pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Multiplier is ERC20{
  address public owner;
  uint public number;

  constructor(uint _num,string memory _name,string memory _symbol) ERC20(_name,_symbol){
    owner=msg.sender;
    number=_num;
  }

  function mintToken(address to,uint amount) public {
    require(msg.sender==owner,"Not an owner");
    _mint(to,amount);
  }
}
