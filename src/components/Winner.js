import React from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';

const Winner = ({ show, win, setShow }) => {
  const handleCross = () => {
    console.log('clicked');
    setShow(false);
  };
  return (
    <>
      {show && (
        <MainPopup>
          <Popup>
            <CloseButton onClick={handleCross}>
              <FiX fontSize={28} color="white" cursor="pointer" />
            </CloseButton>
            <Content>
              <h1>CONGRATULATIONS</h1>
              <h3>Winner Wallet Address:</h3>

              <p>{win}</p>
            </Content>
          </Popup>
          ;
        </MainPopup>
      )}
    </>
  );
};

export default Winner;
const MainPopup = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 500;
  width: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  background: rgba(155, 155, 155, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(3.5px);
  -webkit-backdrop-filter: blur(3.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
const Popup = styled.div`
  z-index: 100;
  position: fixed;
  float: right;
  bottom: 30%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  height: 35vh;
  width: 400px;
  margin-top: 25%;
  border: none;
  background-color: #1f99f0;

  h1 {
    color: white;
    text-align: center;
    padding-bottom: 20px;
  }

  h3 {
    padding-top: 20px;
    text-align: center;
  }
`;

const CloseButton = styled.button`
  position: relative;
  float: right;
  background: none;
  border: none;
  color: #564480;
  top: 10px;
  right: 10px;
  padding: 10px;
`;
const Content = styled.div`
  background-color: white;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #1f99f0;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  padding: 20px;
  p {
    text-align: center;
    font-size: 18px;
    /* padding-top: 20px; */
  }
`;
