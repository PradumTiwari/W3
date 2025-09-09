// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "chainlink-brownie-contracts/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";

contract AutomationHello is AutomationCompatibleInterface{
    uint public counter;//Counts how many times upkeep is performed
    uint public lastTimeStamp;//LAst time upkeep run
    uint public interval;


    constructor(uint updateInterval){
        interval=updateInterval;
        lastTimeStamp=block.timestamp;
        counter=0;
    }


    function checkUpkeep(bytes calldata) external view override returns(bool upkeepNeeded,bytes memory performData){
        upkeepNeeded=(block.timestamp-lastTimeStamp)>interval;
        performData="";
    } 

    //called on chain when upkeepNeeded =true
    function performUpkeep(bytes calldata) external override{
        if((block.timestamp-lastTimeStamp)>interval){
            lastTimeStamp=block.timestamp;
            counter+=1;
        }
    }
}