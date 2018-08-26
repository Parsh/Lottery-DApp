const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const compiledContract = require('../compile');

describe('Lottery Contract', () => {
  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(
      JSON.parse(compiledContract.interface)
    )
      .deploy({
        data: compiledContract.bytecode
      })
      .send({
        from: accounts[0],
        gas: '1000000'
      });
  });

  it('should deploy the contract', () => {
    expect(lottery.options.address).toBeDefined();
  });

  it('should allow an account to enter the lottery', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.1', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    expect(players[0]).toEqual(accounts[0]);
    expect(players.length).toBe(1);
  });

  it('should allow multiple accounts to enter the lottery', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.1', 'ether')
    });

    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.1', 'ether')
    });

    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('0.1', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    expect(players[0]).toEqual(accounts[0]);
    expect(players[1]).toEqual(accounts[1]);
    expect(players[2]).toEqual(accounts[2]);
    expect(players.length).toBe(3);
  });

  it('should require a minimum amount of ether to enter', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: '200'
      });

      fail(); //executes and fails the test if the above await didn't throw an error
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('should only allow the manager to call pickWinner ', async () => {
    try {
      await lotter.methods.pickWinner().send({
        from: accounts[1]
      });
      fail();
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('should send all the money to the (single) winner and reset the players array', async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('2', 'ether')
    });

    const currentBal = await web3.eth.getBalance(accounts[1]);

    lotteryBalance = await web3.eth.getBalance(lottery.options.address);
    expect(parseInt(lotteryBalance)).toEqual(
      parseInt(web3.utils.toWei('2', 'ether'))
    );

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    const finalBal = await web3.eth.getBalance(accounts[1]);
    const diff = finalBal - currentBal;

    expect(diff).toEqual(parseInt(web3.utils.toWei('2', 'ether')));

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });
    expect(players.length).toBe(0);

    lotteryBalance = await web3.eth.getBalance(lottery.options.address);
    expect(parseInt(lotteryBalance)).toEqual(0);
  });
});
