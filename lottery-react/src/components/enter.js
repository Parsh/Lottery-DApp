import React from 'react';

const Enter = ({ loading, value, onChange, onSubmit }) => {
  return (
    <div className="z-depth-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Want to try your luck?</h2>
          <br />
          <h4 className="card-text">Amount of Ether (Minimum 0.011 eth)</h4>
          <div className="md-form col-md-6 offset-md-3">
            <input
              type="text"
              className="form-control"
              value={value}
              placeholder="Enter the ether amount"
              onChange={onChange}
            />
          </div>
          {loading ? (
            <div>
              <button
                className="btn btn-lg btn-primary mt-4 animated fadeIn"
                disabled
              >
                <i className="fa fa-refresh fa-spin mr-3"> </i>
                Entering...
              </button>{' '}
            </div>
          ) : (
            <button
              onClick={onSubmit}
              className="btn btn-lg btn-primary mt-4 animated fadeIn"
            >
              Enter the Lottery!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Enter;
