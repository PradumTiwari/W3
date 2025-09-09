// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "chainlink-brownie-contracts/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
//https://docs.chain.link/data-feeds/api-reference
contract ChainLink{

    AggregatorV3Interface internal priceFeed;

    constructor(){
        //Eth/Used price on sepolia
        priceFeed=AggregatorV3Interface(
              0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
    }


    function getLatestPrice() public view returns (int){
        ( ,int256 price , , ,)=priceFeed.latestRoundData();
        return price;
    }

    function getDecimals() public view returns(uint8){
        return priceFeed.decimals();
    }

    function getDescription() public view returns(string memory){
        return priceFeed.description();
    }

    function getVersion() public view returns(uint256){
        return priceFeed.version();
    }
}