import React from 'react';
import web3 from '../web3'

const Jumbotron = ({manager, players, balance}) => {

    return (
         <div className="col-md-12">
            <div className=" z-depth-3">
                <div className="card card-image jumbo">
                    <div className="text-white text-center py-5 px-4 my-5">
                        <div>
                            <h1 className="card-title pt-3 mb-5 font-bold"><strong>Welcome to the Lottery DApp</strong></h1>
                            <h3 className="mx-5 mb-5">
                            This lottery is managed by: {manager}. <br/>
                            Presently we have {players.length} enteries, 
                            competing to win {web3.utils.fromWei(balance, 'ether')} ether! 
                            </h3>
                        </div>
                    </div>
                 </div>
             </div>
         </div>       
    );
}

export default Jumbotron;