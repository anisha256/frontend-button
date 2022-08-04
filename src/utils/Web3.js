import Web3 from 'web3';
import TestTokenBuild from '../abi/TestToken.json';
import CountdownButtonBuild from '../abi/CountdownButton.json';

let ttContract;
let cbContract;

let selectedAccount;
let isInitialized = false;

const web3 = new Web3(window.ethereum);
ttContract = new web3.eth.Contract(
  TestTokenBuild.abi,
  '0x8127499D2225e4003BB8b9930E9d208d826E0105'
);
cbContract = new web3.eth.Contract(
  CountdownButtonBuild.abi,
  '0x3A5EF132a2c19A91D7b87cAc509667Bc0352A5F0'
);

export const connectMetamask = async (setAccountAddress) => {
  let provider = window.ethereum;
  if (typeof provider !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      selectedAccount = accounts[0];
      setAccountAddress(selectedAccount);

      console.log(`selected account is ${selectedAccount}`);
    } catch (error) {
      console.log(error);
      return;
    }
    window.ethereum.on('accountsChanged', function (accounts) {
      selectedAccount = accounts[0];
      console.log(`selected account changed to is ${selectedAccount}`);
      setAccountAddress(selectedAccount);
    });
    isInitialized = true;
    console.log(isInitialized);
  }
};

export const buttonClicked = async () => {
  if (!isInitialized) {
    await connectMetamask();
  }
  return cbContract.methods.onClick(true).send({
    from: selectedAccount,
  });
};

export const getPrize = async () => {
  return await ttContract.methods
    .balanceOf('0x3A5EF132a2c19A91D7b87cAc509667Bc0352A5F0')
    .call();
};

export const approve = async () => {
  if (!isInitialized) {
    await connectMetamask();
  }
  return ttContract.methods
    .approve(
      '0x3A5EF132a2c19A91D7b87cAc509667Bc0352A5F0',
      '10000000000000000000000'
    )
    .send({
      from: selectedAccount,
    });
};

export const getCountdownEnd = () => {
  return cbContract.methods.countdownEnd().call();
};
export const winner = async () => {
  return cbContract.methods.winner().send();
};
export const getWinner = () => {
  return cbContract.methods.winnerAddress().call();
};
export const getCount = () => {
  return cbContract.methods.count().call();
};

export const changeDeposit = async (change, newAmount) => {
  if (!isInitialized) {
    await connectMetamask();
  }
  return cbContract.methods.changeDepositAmount(change, newAmount).send({
    from: selectedAccount,
  });
};
