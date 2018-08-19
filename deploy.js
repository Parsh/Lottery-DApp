const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledContract = require('./compile')

const mnemonic = "chief outside coast artefact enrich pelican raw top yellow witness slogan glide";
const networkUrl = "https://rinkeby.infura.io/v3/b4e2b3bf723f4985ae36bc838089e50d";

const provider = new HDWalletProvider(mnemonic, networkUrl);
const web3 = new Web3(provider);

var accounts, lottery;

const deploy = async () => {

    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(compiledContract.interface))
        .deploy({
            data: "0x" + compiledContract.bytecode
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        });

    console.log("Contract Interface (ABI): ", compiledContract.interface);
    console.log("Contract Deployed! Contract Address: ", lottery.options.address);

}

const test = async () => {
    
    await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei('1', 'ether')
    });
    console.log('Player entered the lottery');
    
    const currentBal = await web3.eth.getBalance(accounts[0]);

    lotteryBalance = await web3.eth.getBalance(lottery.options.address);
    console.log('Initial Balance of the Contract (in ether): ', web3.utils.fromWei(lotteryBalance, 'ether'));

    await lottery.methods.pickWinner().send({
        from: accounts[0]
    });
    console.log('Winner is picked!')

    const finalBal = await web3.eth.getBalance(accounts[0]);
    const diff = finalBal - currentBal; //would be less than 1, due to gas costs for calling pickWinner
    console.log('Amount to the winner (with gas deduction): ', web3.utils.fromWei(diff.toString(), 'ether'));

    const players = await lottery.methods.getPlayers().call({
        from: accounts[0]
    });

    console.log("Lottery reset, players:", players.length);

    lotteryBalance = await web3.eth.getBalance(lottery.options.address);
    console.log('Final Balance of the Contract (in ether): ', web3.utils.fromWei(lotteryBalance, 'ether'))
}

deploy()
    //.then(test); //testing@Rinkeby
