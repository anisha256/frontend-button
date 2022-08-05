import React from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import image from '../assets/request.png';

const Notify = ({ showPop, setShowPop, setAcceptReq }) => {
  const handleCross = () => {
    console.log('clicked');
    setShowPop(false);
  };
  return (
    <>
      {showPop && (
        <MainPopup>
          <Popup>
            <CloseButton onClick={handleCross}>
              <FiX fontSize={28} color="white" cursor="pointer" />
            </CloseButton>
            <Content>
              <ImageDiv>
                <Image src={image} />
              </ImageDiv>
              <h1>REQUESTED TO PARTICIPATE</h1>
            </Content>
          </Popup>
          ;
        </MainPopup>
      )}
    </>
  );
};

export default Notify;
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
  height: 42vh;
  width: 400px;
  margin-top: 25%;
  border: none;
  /* background-color: #1b1c1c; */

  h1 {
    color: white;
    text-align: center;
    padding-bottom: 20px;
    font-size: 20px;
  }

  h3 {
    padding-top: 20px;
    text-align: center;
    font-size: 30px;
  }
  @media screen and (max-width: 390px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 45vh;
    bottom: 30%;
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
