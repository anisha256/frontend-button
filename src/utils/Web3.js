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
  '0x2EF22D288CaC35d1036314813706e7F3f27dcF65'
);
cbContract = new web3.eth.Contract(
  CountdownButtonBuild.abi,
  '0xAE9BB3A2C6bBf0381A62EdD39a8F259b19Fa6a8e'
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
    localStorage.setItem('wallet-address', selectedAccount);
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
    .balanceOf('0xAE9BB3A2C6bBf0381A62EdD39a8F259b19Fa6a8e')
    .call();
};
export const getBalance = async () => {
  if (!isInitialized) {
    await connectMetamask();
  }
  return await ttContract.methods.balanceOf(selectedAccount).call();
};

export const approve = async () => {
  if (!isInitialized) {
    await connectMetamask();
  }
  return ttContract.methods
    .approve(
      '0xAE9BB3A2C6bBf0381A62EdD39a8F259b19Fa6a8e',
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
  return cbContract.methods.winner().send({
    from: selectedAccount,
  });
};
export const getWinner = () => {
  return cbContract.methods.winnerAddress().call();
};
export const getCount = () => {
  return cbContract.methods.count().call();
};
export const getInitial = () => {
  return cbContract.methods.initialDepositAmount().call();
};
export const getFinal = () => {
  return cbContract.methods.depositAmount().call();
};

export const changeDeposit = async (change, newAmount) => {
  if (!isInitialized) {
    await connectMetamask();
  }
  return cbContract.methods.changeDepositAmount(change, newAmount).send({
    from: selectedAccount,
  });
};
