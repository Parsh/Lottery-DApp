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

  state = { //ES6 equivalent to the code above (while converting this code via babel to ES5, 
    manager: "",     //such variable (state) initializations are automatically put into a contructor)
    players: [],
    balance: "",
    value: "",
    message: ""
  };

  async componentDidMount(){ //runs only once, when the component is rendered to the screen for the first time
    
    const manager = await lottery.methods.manager().call(); 
    //we don't need configure call (putting the from property) as the provider that we hijacked 
    //from metamask has a default account (which is the first account we are logged into @Metamask)
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({manager, players, balance});
  }

  onSubmit = async (event) => {
    event.preventDefault(); //making sure that the form doesn't attemp to submit itself in a classic html way
  
    const accounts = await web3.eth.getAccounts();

    this.setState({message: "Entering you into the lottery [Waiting for transaction success]..."})

    await lottery.methods.enter().send({ //for the current version of web3, we do have to mention from property while sending transaction
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({
      message: "You have been entered!",
      players: await lottery.methods.getPlayers().call(),
      balance: await web3.eth.getBalance(lottery.options.address),
    })
  }

  pickWinner = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({message: "Picking a winner..."})

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })

    this.setState({
      message: "A winner has been picked!",
      players: await lottery.methods.getPlayers().call(),
      balance: await web3.eth.getBalance(lottery.options.address),
    })
  }
  
  render() {

    return (
      <div className="container-fluid">

        <div className="row">
          <Jumbotron 
          manager={this.state.manager} 
          players={this.state.players}
          balance={this.state.balance} />
        </div>
        
        <div className = "row" style={{marginTop:100}}>
          <div className="col-md-6 text-center">
            <Enter
            onSubmit = {this.onSubmit}
            value = {this.state.value}
            onChange = {(event) => this.setState({value: event.target.value})}
            />
          </div>
          <div className="col-md-6 text-center">
            <Manager pickWinner = {this.pickWinner}/>
          </div>
        </div>

        <div className = "row" style={{marginTop:50}}>
          <h4>{this.state.message}</h4>  
        </div> 

      </div>
    );
  }
}

export default App;
