// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "forge-std/Vm.sol";

import "src/Multiplier.sol";


contract TestMultiplier is Test{

    Multiplier m;

    function setUp() public{
        m=new Multiplier(10,"PradumT","PKT");
    }


    function testMinting() public {
       //1st to test minting i will first mint 100 of my token to me
       m.mintToken(address(this),100);
     
       assertEq(m.balanceOf(address(this)),100);
    }


    function testTransfer() public {
        m.mintToken(address(this),300);
       
        m.transfer(0xbC9303E08fCA44dFf9323cb683A39F03bB6545e5,100);//Here we transfer 100 token from 300 token
        vm.prank(0xbC9303E08fCA44dFf9323cb683A39F03bB6545e5);
        assertEq(m.balanceOf(0xbC9303E08fCA44dFf9323cb683A39F03bB6545e5),100);
        assertEq(m.balanceOf(address(this)),200);
    }

     function test_Approve() public{
        m.mintToken(address(this),400);//Mint 400 token to me
        m.approve(0xbC9303E08fCA44dFf9323cb683A39F03bB6545e5,168);
        //Now i have allowed 168 token to transfer
        //3rd account which i have to transfer from 2nd 0x0d682EB0a2A820dc2AD8ddf75968459D90bC4862
        vm.prank(0xbC9303E08fCA44dFf9323cb683A39F03bB6545e5);
        m.transferFrom(address(this),0x0d682EB0a2A820dc2AD8ddf75968459D90bC4862,160);//Transfer using 2nd account via 1st to the 3rd

        //The balance left in the current account is
        assertEq(m.balanceOf(address(this)), 240);
        
        //Transfer rest of the 8 balance from their to my account
        vm.prank(0xbC9303E08fCA44dFf9323cb683A39F03bB6545e5);
        m.transferFrom(address(this),0xbC9303E08fCA44dFf9323cb683A39F03bB6545e5,8);

        assertEq(m.balanceOf(address(this)), 232);
        
        assertEq(m.balanceOf(0xbC9303E08fCA44dFf9323cb683A39F03bB6545e5),8);
     }
}