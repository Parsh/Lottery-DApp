import React from 'react';

const Enter = ({value, onChange, onSubmit}) => {
   return (
        <div className="card hoverable">
        <div className="card-body">
            <h2 className="card-title">Want to try your luck?</h2>
            <br/>
            <h4 className="card-text">Amount of Ether (Minimum 0.011 eth)</h4>
            <div className="md-form col-md-6 offset-md-3">
                <input type="text" className="form-control" 
                value = {value}
                placeholder="Enter the ether amount"
                onChange = {onChange}/>
                
            </div>
            <button className="btn btn-primary" onClick = {onSubmit}>Enter the Lottery</button>
        </div>
        </div>
   );
}

export default Enter;
