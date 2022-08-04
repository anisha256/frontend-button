import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connectMetamask } from '../utils/Web3';
import { MdAdminPanelSettings } from 'react-icons/md';

const Navbar = () => {
  const [accountAddress, setAccountAddress] = useState(null);
  console.log(accountAddress);
  // if (accountAddress !== '0xbb729f824d6c8ca59106dce008265a74b785aa99') {
  //   toast.error('NOT A ADMIN', { autoClose: 2000 });
  // }
  return (
    <>
      <Nav>
        <NavLeft></NavLeft>
        <NavRight>
          <MdAdminPanelSettings fontSize={30} />
          <WalletButton
            variant="contained"
            onClick={() => connectMetamask(setAccountAddress)}
          >
            {accountAddress
              ? `${accountAddress.slice(0, 6)}...${accountAddress.slice(
                  accountAddress.length - 4,
                  accountAddress.length
                )}`
              : 'Connect Wallet'}
          </WalletButton>
        </NavRight>
      </Nav>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Navbar;
const Nav = styled.div`
  top: 0;
  width: 100%;
  height: 80px;
  background-color: #1b1c1c;
  /* display: grid;
  grid-template-columns: 60px 1fr 2fr 1.5fr 60px; */
  position: sticky;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
`;
const NavLeft = styled.div``;
const NavRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  gap: 20px;
`;
const WalletButton = styled.button`
  height: 40px;
  width: auto;
  min-width: 32px;
  justify-content: center;
  padding: 0px 15px;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background-color: #1f99f0;
  color: white;
  cursor: pointer;
`;