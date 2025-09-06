// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "forge-std/Test.sol";
import "../src/SimpleDAO.sol";


contract SimpleDAOTest is Test{
    SimpleDAO dao;

    address alice=address(0x1);
    address bob=address(0x2);

    function setUp() public{
        dao=new SimpleDAO();
    }

    function testCreateProposal() public{
        dao.createProposal("Buy cricket kit");
        (string memory desc,uint deadline,uint yesVotes,uint noVotes,bool executed)=dao.getProposal(0);

        assertEq(desc,"Buy cricket kit");
          assertEq(yesVotes, 0);
        assertEq(noVotes, 0);
        assertEq(executed, false);
        assertGt(deadline, block.timestamp);
    }

    function testVote() public{
         dao.createProposal("Buy cricket kit");

         vm.prank(alice);
         dao.vote(0,true);

         vm.prank(bob);
         dao.vote(0,false);

         (,,uint yesVotes,uint noVotes,)=dao.getProposal(0);
         assertEq(yesVotes,1);
         assertEq(noVotes,1);
    }

      function testExecuteProposal() public {
        dao.createProposal("Buy cricket kit");

        vm.prank(alice);
        dao.vote(0, true);

        vm.prank(bob);
        dao.vote(0, true);

        console.log("The value of timestamp is",block.timestamp);

        // ⏩ Fast forward 1 day
        vm.warp(block.timestamp + 1 days);
 
        dao.executeProposal(0);

        (, , , , bool executed) = dao.getProposal(0);
        assertTrue(executed);
    }
}