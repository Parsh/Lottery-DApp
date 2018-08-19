import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

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
      <div>
        <h1> Lottery Contract</h1>
        <p>
          This lottery is managed by: {this.state.manager}. <br/>
          Currently {this.state.players.length} enteries, 
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether! 
        </p>

        <hr />

      <form onSubmit = {this.onSubmit}>
        <h4>Want to try your luck? (Amount to enter > 0.01 ether)</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input 
          value = {this.state.value}
          onChange = {event => this.setState({value: event.target.value})}
          />
        </div>
        <button>Enter</button>
      </form>

      <hr/>

      <h3> Ready to pick a winner (Manager Only)?</h3>
      <button onClick = {this.pickWinner}>Pick a winner!</button>

      <hr/>

      <h2>{this.state.message}</h2>
      
      </div>
    );
  }
}

export default App;
