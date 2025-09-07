// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleMultiSig{
    //owner and threshold
    address[] public owners;
    mapping(address=>bool) public isOwner;
    uint256 public required;

    struct Transaction{
        address to,//Target contract/EOA
        uint256 value;
        bytes data;
        bool executed;
        uint256 confirmations;//No of approavals
    }

    Transaction[] public transactions;
    mapping(uint256=>mapping(address=>bool)) public approved;//txId=>owner=>approaved?

    //Event for transparency
    event Submit(uint256 indexed txid,address indexed to,uint256 value,bytes data);
    event Approve(address indexed owner,uint256 indexed txId);
    event Revoke(address indexed owner,uint256 indexed txId);
    event execute(uint256 indexed txId,bool success);


    constructor(address[] memory _owners,uint256 _required){
        require(_owners.length>0,"No owners");
          require(_required > 0 && _required <= _owners.length, "bad threshold");
   
   
            for(uint256 i=0;i<_owners.length;i++){
                address owner=_owners[i];
                require(owner!=address(0),"Owner zero");

                require(!isOwner[owner],"Owner dup");

                isOwner[owner]=true;
                owners.push(owner);
            }

            required=_required;
    }

    //Recieve eth
    recieve() external payable{}

    //submit a transaction (owner- only)

    function submit(address _to,uint256 _value,bytes calldata, _data) external onlyOwner{
         transactions.push(Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false,
            confirmations: 0
        }));
        emit Submit(transactions.length - 1, _to, _value, _data);
    }

    


}