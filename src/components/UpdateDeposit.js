import React from 'react';
import styled from 'styled-components';
import { changeDeposit } from '../utils/Web3';
import { FiX } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateDeposit = ({
  show,
  setShow,
  setUpdateDepositData,
  updateDepositData,
}) => {
  const handleCross = () => {
    console.log('clicked');
    setShow(false);
  };

  const handleChange = (e) => {
    setUpdateDepositData(() => ({
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handle submit ');
    setUpdateDepositData({
      newAmount: updateDepositData.newAmount,
    });
    const amount = updateDepositData.newAmount * 10 ** 18;
    console.log(amount);
    await changeDeposit(true, amount);
    console.log(updateDepositData);
    toast.info(`New Deposit amount ${amount}TT`, { autoClose: 3000 });
    setShow(false);
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    console.log('handle cancel');
    await changeDeposit(false, 0);
    toast.info('Increased deposit amount by 10 TT', {
      autoClose: 3000,
    });
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
              <EditForm>
                <InputC>
                  <label>Change Deposit Amount:</label>
                  <Input
                    id="newAmount"
                    type="string"
                    name="newAmount"
                    value={updateDepositData.newAmount}
                    onChange={handleChange}
                  />
                </InputC>

                <InputC>
                  <ButtonDiv>
                    <Button type="submit" onClick={handleSubmit}>
                      Submit
                    </Button>
                    <Button type="submit" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </ButtonDiv>
                </InputC>
              </EditForm>
            </Content>
          </Popup>
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
        </MainPopup>
      )}
    </>
  );
};

export default UpdateDeposit;
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
  background-color: #1b1c1c;

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
  background-color: #1b1c1c;
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
const EditForm = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
  label {
    font-size: 20px;
    color: white;
    display: inline-block;
    text-align: center;
    padding-bottom: 20px;
  }
`;
const Button = styled.button`
  padding: 5px 10px;
  background-color: #1f99f0;
  border: none;
  border-radius: 5px;
  height: 40px;
  width: 100px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
`;
const InputC = styled.section`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  height: 45px;
  display: flex;
  padding: 10px;
  border-radius: 3px;
  border: none;
  background-color: white;
  font-size: 20px;
  color: black;
  &:active {
    outline: none;
    border: none;
    background-color: white;
  }
  &:focus {
    outline: 0;
    border: none;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  gap: 20px;
`;
