//SPDX-License-Identifier:MIT

pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/TreasuryDAOWithQuorum.sol";

contract TreasuryDAOWithQuorumTest is Test{
    TreasuryDAOWithQuorum dao;

    address payable alice=payable(address(0xA1));//Recipent
    address owner=address(0x10);
    address addr1=address(0x11);
    address addr2=address(0x12);
    address addr3=address(0x13);

    function setUp() public{
        //quorou =3 (minimum 3 votes)
        dao=new TreasuryDAOWithQuorum(3,1 days);

        //Fund dao wth 5 ether
        vm.deal(address(this),10 ether);
        (bool ok, )=address(dao).call{value:5 ether}("");
        require(ok,"Funding failed");
    }

    function testQuorumBlocksExecutionWhenNotReached() public{
        //Create proposal to send 2 eth to alice,voting period=1 days
        dao.createProposal("Pay 2 eth to alice",alice,2 ether,1 days);

        //twp pwners vote (yes)
        vm.prank(addr1);
        dao.vote(0,true);

        vm.prank(addr2);
        dao.vote(0,true);

        vm.prank(addr3);
        dao.vote(0,true);

        //Move time forward so voting period ends
        vm.warp(block.timestamp+1 days+1);
     
        dao.finalizeProposal(0);
        //try to execute =>should revert back quorum(4) not reached

        vm.expectRevert(bytes("timeLock not passed"));
        dao.executeProposal(0);
    }



    function testExecuteAfterTimelock() public{
        dao.createProposal("Pay alice 2 Eth", alice, 2 ether, 1 days);
        vm.prank(addr1);
        
        dao.vote(0,true);

         vm.prank(addr2);
        dao.vote(0,true);

         vm.prank(addr3);
        dao.vote(0,true);


        //Fast forward beyond voting period
        vm.warp(block.timestamp+1 days+1);
        dao.finalizeProposal(0);


        //fast forward timelock
       vm.warp(block.timestamp + 1 days + 1);

       uint balanceBefore=alice.balance;
       dao.executeProposal(0);
       assertEq(alice.balance,balanceBefore+2 ether);
    }

    
}

