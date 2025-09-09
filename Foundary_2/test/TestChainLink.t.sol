// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "forge-std/console.sol";       // ✅ gives you assertEq, assertGt, etc.
import "../src/ChainLink.sol";


contract TestChainLink is Test {     // ✅ must inherit Test
    ChainLink chain;

    function setUp() public {
        chain = new ChainLink();
    }

    function testLatestPrice() public view {
        int price = chain.getLatestPrice();
        console.log("ETH/USD Price:", price);

        assertGt(price, 0);
    }

    function testDecimals() public view {
        uint8 decimals = chain.getDecimals();
        console.log("Decimals:", decimals);

        assertGt(decimals, 0);
        assertLt(decimals, 20);
    }

    function testDescription() public view {
        string memory desc = chain.getDescription();
        console.log("Feed Description:", desc);

        assertEq(desc, "ETH / USD");
    }

    function testVersion() public view {
        uint256 ver = chain.getVersion();
        console.log("Feed Version:", ver);

        assertGt(ver, 0);
    }
}
