// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/MyToken.sol";


contract TestContract is Test{
    MyToken t;

    function setUp() public{
        t=new MyToken();
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