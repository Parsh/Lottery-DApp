pragma solidity ^0.4.17;

contract Lottery{
    
    address public manager;
    address[] public players;
    
    
    constructor() public{
        manager = msg.sender;
    }
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    function enter() public payable {
        require(msg.value > 0.01 ether);
        players.push(msg.sender);
    }
}