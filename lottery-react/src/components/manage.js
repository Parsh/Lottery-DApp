import React from 'react'

const Manage = ({pickWinner}) => {
    return (
        <div className="z-depth-4">
        <div className="card">
        <div className="card-body">
            <h2 className="card-title">Ready to pick a winner?</h2>
            <h3>(Manager Only)</h3>
            <br/>
            <h4 className="card-text">This section is specific to the Manager of this Lottery. Any individual other then the manager would fail to pick.</h4>
            <br/>
            <button className="btn btn-primary" onClick = {pickWinner}>Pick a Winner!</button>
        </div>
        </div>
        </div>
    );
};

export default Manage;
