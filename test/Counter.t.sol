// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/Counter.sol";


contract TestCounter is Test {
    Counter c;

    function setUp() public {
        c = new Counter(5);
    }

    function testInc() public{
        c.increment();
        c.increment();
        assertEq(c.getCount(),7,"ok");

    }

    function testRevertWhenDecrementBelowZero() public{
        c.decrement();
        c.decrement();
        c.decrement();
        c.decrement();
        c.decrement();

        vm.expectRevert(); //This one should revert
       //vm.expectRevert()	Expect the next line to revert (fail)
       
        c.decrement();
    }

   

    function testBar() public {
        assertEq(uint256(1), uint256(1), "ok");
    assertTrue(!(1 == 2), "false");

    }

    function testFoo(uint256 x) public {
        vm.assume(x < type(uint128).max);
        assertEq(x + x, x * 2);
    }
}
