const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const compiledContract = require('../compile');


describe('Lottery Contract', () => {

    beforeEach( async () => {
        accounts = await web3.eth.getAccounts();
        lottery = await new web3.eth.Contract(JSON.parse(compiledContract.interface))
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

        expect(players.length).toBe(1);
        expect(players[0]).toEqual(accounts[0]);

    });
});

