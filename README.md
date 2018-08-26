# Lottery DApp

Lottery DApp is a decentralized application whose fundamental aspect is its Lottery Smart Contract which is deployed on the Ethereum blockchain and is responsible for conducting lotteries in a fair manner. The frontend for the DApp is built using React which interacts with the Smart Contract using Web3.

## Using the Lottery DApp

Using the DApp is pretty straightforward; you can see and interact with the DApp at [Lottery DApp](https://lottery-dapp.herokuapp.com/).

### Important Instructions

In order to properly interact with the DApp, you would either require the Metamask extension or a Wallet-enabled browser such as Brave and authenticate the transaction so as to enter the lottery. Also, please hold on for about 15-30 seconds, as the transaction would need that much time to be mined on the Ethereum blockchain and propagate the transaction receipt back to the DApp.

Note: Do not try to use the pick a winner component, unless you've been explicitly designated as a manager for the lottery.

> If you've got your ethers stuck into the DApp then please write to me at parsh.cosmos11@gmail.com, I'll surely help you with getting back your ethers.

## Interested in getting those hands dirty? Fetch a local copy and tune

Following instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Lottery DApp is built using React and the Node.js javascript runtime. Therefore, you'll need [Node](https://nodejs.org/en/) version 8.0 or above (npm would come along the ride) in order successfully construct the project and [React](https://reactjs.org/) to build the frontend.

### Installing

Start by cloning the repository to your machine.

```
$ git clone https://github.com/Parsh24/Lottery-DApp.git
```

Move into the cloned directory and perform npm install in order to install the dependencies (which will appear in the node_modules folder).

```
$ cd Lottery-DApp
$ npm install
```

Note that this is our first layer dependency installation, i.e., here we only installed the dependencies that are required to work around the lottery smart contract and its compilation, testing and deployment.

For the next layer dependencies, i.e., the dependencies to build the frontend using react, within the Lottery-Dapp folder move into the following and perform npm install:

```
$ cd lottery-react
$ npm install
```

Once the dependency installation completes, type in `npm start` from inside the lottery-react folder and if you see the following output that implies that Lottery DApp is successfully up and running.

```
Compiled successfully!

You can now view lottery-react in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://192.168.0.103:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```

## Running the tests

Let's have a look at how to run the automated tests for this system in order to be certain that the lottery smart contract is properly compiled, deployed and integrated with web3.

### Prerequisites

The tests for Lottery DApp are written using Jest, therefore, you have to install [jest](https://www.npmjs.com/package/jest) using the following command (this would be done in the Lottery-DApp directory and not in lottery-react):

```
$ npm install jest --save-dev
```

### Tests in action

There are 6 unit tests packed into a single test suite that assists in ensuring that the contract is working as intended. Run the following command to execute the tests:

```
$ npm test
```

If you see the following output after the tests complete, it implies that the contract is working properly.

```
Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        15.01s, estimated 22s
Ran all test suites.
```

Note: These tests are performed on the local Ethereum network (using ganache), therefore they would complete pretty quickly. However, to test contract deployment on an actual public testnet(Rinkeby) use the `test` method on the `deploy` method in the deploy.js (i.e. uncomment the `.then(test)`).
