const ganache = require('ganache-cli');
const Web3 = require('Web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');


describe('Lottery Contract', () => {

    beforeEach( async () => {
        accounts = await web3.eth.getAccounts();
        lottery = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({
                data: bytecode
            })
            .send({
                from: accounts[0],
                gas: '1000000'
            });
    });

    
});

