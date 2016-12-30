if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount=web3.eth.accounts[0];
account = web3.eth.accounts[0];
hostAccount = web3.eth.accounts[1];
supervisorAccount = web3.eth.accounts[2];
