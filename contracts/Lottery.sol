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

    function _pseudoRandom() private view returns (uint){
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted{
        
        require(players.length > 0);

        uint index = _pseudoRandom() % players.length;
        players[index].transfer(this.balance);
        
        players = new address[](0); 
    }
    
    function getPlayers() public view returns (address[]){
        return players;
    }
    
}