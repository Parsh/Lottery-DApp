import React from 'react'

const Manage = ({pickWinner}) => {
    return (
        <div>
            <h3> Ready to pick a winner (Manager Only)?</h3>
            <button onClick = {pickWinner}>Pick a winner!</button>
        </div>
    );
};

export default Manage;