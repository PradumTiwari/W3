//SPDX-License-Identifier:MIT

pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Counter.sol";

contract DeployCounter is Script{
    function run() external returns(Counter){
         uint256 privateKey = vm.envUint("PRIVATE_KEY"); // load from .env or shell

        vm.startBroadcast(privateKey);

        Counter counter=new Counter();
        vm.stopBroadcast();

        return counter;
    }
}