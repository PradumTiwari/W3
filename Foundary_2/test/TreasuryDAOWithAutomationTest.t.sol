// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/TreasuryDAOWithQuorum.sol";

contract TreasuryDAOWithAutomationTest is Test{
    TreasuryDAOWithQuorum dao;

    address payable alice=payable(address(0xA1));
    address  addr1=address(0x11);
    address  addr2=address(0x12);
    address  addr3=address(0x13);
 

    function setUp() public{
        dao=new TreasuryDAOWithQuorum(3,1 days);
        //Fund dao with 5 ether
        vm.deal(address(this), 10);
        (bool ok,)=address(dao).call{value:5 ether}("");
        require(ok,"Funding Failed");

    }


    function testAutomationExecuteReadyProposal() public{
        dao.createProposal("Pay Alice 2 ETH", alice, 2 ether, 1 days);

        vm.prank(addr1);
        dao.vote(0, true);
        

          vm.prank(addr2);
        dao.vote(0, true);

          vm.prank(addr3);
        dao.vote(0, true);

        //Fast forward beyond voting period
         vm.warp(block.timestamp+1 days+1);

        //Finalize=> approve +set Ready at
        dao.finalizeProposal(0);

        //At this point readyAt=block.timestamp+timeLockDelay(1Day) so not ready at

        vm.warp(block.timestamp+1 days+1);

        //call checkUpKeep--->Simple off-chain automation nodes

        (bool upkeepNeeded,bytes memory performData)=dao.checkUpKeep("");


      assertTrue(upkeepNeeded, "upkeep should be needed");

      uint proposalId=abi.decode(performData,(uint256));
      assertEq(proposalId, 0);

       dao.performUpkeep(performData);

          (, , uint amount, , uint yesVotes, uint noVotes, bool executed, bool approved, ) = dao.getProposal(0);
        assertEq(amount, 2 ether);
        assertEq(yesVotes, 3);
        assertEq(noVotes, 0);
        assertTrue(approved);
        assertTrue(executed);

    }
}