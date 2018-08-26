import React from 'react';

const Manage = ({ loading, pickWinner }) => {
  return (
    <div className="z-depth-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Ready to pick a winner?</h2>
          <h3>(Manager Only)</h3>
          <br />
          <h4 className="card-text">
            This section is specific to the Manager of this Lottery. Any
            individual other then the manager would fail to pick.
          </h4>
          <br />
          {loading ? (
            <div>
              <button
                className="btn btn-lg btn-primary mt-4 animated fadeIn"
                disabled
              >
                <i className="fa fa-refresh fa-spin mr-3"> </i>
                Picking...
              </button>{' '}
            </div>
          ) : (
            <button
              onClick={pickWinner}
              className="btn btn-lg btn-primary mt-4 animated fadeIn"
            >
              Pick a Winner!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manage;
