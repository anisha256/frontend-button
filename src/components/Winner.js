import React from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import image from '../assets/winner.png';

const Winner = ({ win, show, setShow }) => {
  // const handleCross = () => {
  //   console.log('clicked');
  //   setShow(false);
  // };
  return (
    <>
      <MainPopup>
        <Popup>
          {/* {' '}
          <CloseButton onClick={handleCross}>
            <FiX fontSize={28} color="white" cursor="pointer" />
          </CloseButton> */}
          <Content>
            <h1>CONGRATULATIONS</h1>
            <ImageDiv>
              <Image src={image} />
            </ImageDiv>
            <h3>Winner Address:</h3>
            <p>{`${win.slice(0, 12)}...${win.slice(
              win.length - 4,
              win.length
            )}`}</p>
          </Content>
        </Popup>
      </MainPopup>
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
  background: rgba(100, 164, 242, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
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
  height: 60vh;
  width: 400px;
  margin-top: 25%;
  border: none;

  h1 {
    color: white;
    text-align: center;
    padding-bottom: 20px;
    font-size: 40px;
  }

  h3 {
    padding-top: 20px;
    text-align: center;
    font-size: 30px;
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
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  row-gap: 40px;
  p {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  object-fit: cover;
`;
