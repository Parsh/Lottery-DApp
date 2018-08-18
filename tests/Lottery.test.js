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
    })
});

