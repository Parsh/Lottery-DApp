import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

import Jumbotron from './components/jumbotron';
import Enter from './components/enter';
import Manager from './components/manage';

class App extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {manager : ""};
  // }

  state = {
    //ES6 equivalent to the code above (while converting this code via babel to ES5,
    manager: '', //such variable (state) initializations are automatically put into a contructor)
    players: [],
    balance: '',
    value: '',
    loadingEnter: false,
    loadingPick: false,
    errorMessage: '',
    sucessMessage: '',
    firefoxCORSError: false
  };

  async componentDidMount() {
    //runs only once, when the component is rendered to the screen for the first time
    try {
      const manager = await lottery.methods.manager().call();
      //we don't need configure call (putting the from property) as the provider that we hijacked
      //from metamask has a default account (which is the first account we are logged into @Metamask)
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);

      this.setState({ manager, players, balance });
    } catch (err) {
      if ('Invalid JSON RPC response: ""' === err.message) {
        this.setState({ firefoxCORSError: true });
      }
    }
  }

  onSubmit = async event => {
    event.preventDefault(); //making sure that the form doesn't attemp to submit itself in a classic html way

    this.setState({
      errorMessage: '',
      sucessMessage: '',
      loadingEnter: true
    });

    try {
      if (parseFloat(this.state.value) < 0.011) {
        throw Error('Please enter a value more than the specified minimum');
      }

      const accounts = await web3.eth.getAccounts();

      await lottery.methods.enter().send({
        //for the current version of web3, we do have to mention from property while sending transaction
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      this.setState({
        sucessMessage: "Cheers! You've successfully entered into the lottery",
        loadingEnter: false,
        players: await lottery.methods.getPlayers().call(),
        balance: await web3.eth.getBalance(lottery.options.address)
      });
    } catch (err) {
      if (
        err.message ===
        'No "from" address specified in neither the given options, nor the default options.'
      ) {
        err.message =
          'Metamask (operating over Rinkeby n/w) is required to create campaign! Please check if you are signed into metamask.';
      }
      this.setState({ errorMessage: err.message, loadingEnter: false });
    }
  };

  pickWinner = async () => {
    this.setState({
      errorMessage: '',
      sucessMessage: '',
      loadingPick: true
    });

    try {
      const accounts = await web3.eth.getAccounts();

      if (accounts[0] !== this.state.manager) {
        throw Error(
          "You are not the manager of this lottery, therefore, you can't pick a winner"
        );
      }

      await lottery.methods.pickWinner().send({
        from: accounts[0]
      });

      this.setState({
        sucessMessage: 'Yay! A winner is picked.',
        loadingPick: false,
        players: await lottery.methods.getPlayers().call(),
        balance: await web3.eth.getBalance(lottery.options.address)
      });
    } catch (err) {
      if (
        err.message ===
        'No "from" address specified in neither the given options, nor the default options.'
      ) {
        err.message =
          'Metamask (operating over Rinkeby n/w) is required to create campaign! Please check if you are signed into metamask.';
      }
      this.setState({ errorMessage: err.message, loadingPick: false });
    }
  };

  render() {
    let errorAlert, successAlert;

    if (this.state.errorMessage) {
      errorAlert = (
        <div
          className="alert alert-danger mt-4 z-depth-2 text-center animated fadeIn"
          role="alert"
        >
          <strong>Error: </strong>
          {this.state.errorMessage}
        </div>
      );
    }

    if (this.state.sucessMessage) {
      successAlert = (
        <div
          className="alert alert-success mt-4 z-depth-2 clearfix mb-5 text-center animated fadeIn"
          style={{ fontSize: '20px' }}
          role="alert"
        >
          {this.state.sucessMessage}
        </div>
      );
    }

    let corsError = this.state.firefoxCORSError ? (
      <div
        className="alert alert-danger z-depth-2 text-center animated fadeIn"
        role="alert"
        style={{ fontSize: '25px', marginTop: '75px' }}
      >
        {' '}
        <div className="mt-3 mb-3">
          Cross-Origin Request Blocked <strong>@Firefox</strong>.<br />
          We strongly recommend you to use browsers like Chrome, Brave or any
          other Wallet-enabled browser in order to interact with Ethstarter.
        </div>
      </div>
    ) : null;

    return (
      <div className="container-fluid">
        <div className="row">
          <Jumbotron
            manager={this.state.manager}
            players={this.state.players}
            balance={this.state.balance}
          />
        </div>
        {corsError} {errorAlert} {successAlert}
        <div className="row" style={{ marginTop: 100 }}>
          <div className="col-sm-12 col-md-4 offset-md-1 text-center">
            <Enter
              onSubmit={this.onSubmit}
              value={this.state.value}
              loading={this.state.loadingEnter}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <div className="col-sm-12 col-md-4 offset-md-2 text-center">
            <Manager
              loading={this.state.loadingPick}
              pickWinner={this.pickWinner}
            />
          </div>
        </div>
        <div className="row" style={{ marginTop: 65 }}>
          <div className="col-sm-12 text-center">
            <h4>{this.state.message}</h4>
          </div>
        </div>
        <div className="card container-fluid " style={{ marginTop: 50 }}>
          <div className="card-body text-center">
            We expect you to either have MetaMask or a Wallet enabled browser,
            operating over Rinkeby n/w, to use the Lottery DApp.
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
