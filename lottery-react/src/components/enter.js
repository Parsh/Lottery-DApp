import React from 'react';

const Enter = ({value, onChange, onSubmit}) => {
   return (
       <div>
           <form onSubmit = {onSubmit}>
                <h4>Want to try your luck? (Amount to enter > 0.01 ether)</h4>
                
                <div>
                <label>Amount of ether to enter</label>
                <input 
                value = {value}
                onChange = {onChange}
                />
                </div>

                <button>Enter</button>
            </form>
       </div>
   );
}

export default Enter;