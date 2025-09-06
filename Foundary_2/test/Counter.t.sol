// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Counter.sol";

contract CounterTest is Test{
    Counter counter;

    function setUp() public {
        counter=new Counter();//Deploy the counter before each test
    }

    function testSetNumber() public{
        counter.setNumber(43);
        assertEq(counter.number(),43);//Check if the value is set

    }

    function testIncrement() public{
           counter.setNumber(43);
        counter.increment();
        assertEq(counter.number(),44);
    }

    function testFuzz_SetNumber(uint256 x) public{
        counter.setNumber(x);
        assertEq(counter.number(),x);

        vm.expectRevert();
        revert("Force a revert");
    }
}