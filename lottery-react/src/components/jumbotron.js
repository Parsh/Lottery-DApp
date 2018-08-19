import React from 'react';
import web3 from '../web3'

const Jumbotron = ({manager, players, balance}) => {
    return (
        <div>
        <h1> Lottery Contract</h1>
        <p>
          This lottery is managed by: {manager}. <br/>
          Currently {players.length} enteries, 
          competing to win {web3.utils.fromWei(balance, 'ether')} ether! 
        </p>
        </div>
    );
}

export default Jumbotron;