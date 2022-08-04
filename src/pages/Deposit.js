import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { changeDeposit, winner } from '../utils/Web3';

const Deposit = () => {
  const [win, setWin] = useState();

  const [updateDepositData, setUpdateDepositData] = useState({
    newAmount: 0,
  });
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
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    console.log('handle cancel');
    await changeDeposit(false, 0);
    toast.info('Increased deposit amount by 10 TT', {
      autoClose: 3000,
    });
  };
  const fetchWinner = async () => {
    try {
      const winnerAdd = await winner();
      setWin(winnerAdd);
      winner();
    } catch (error) {}
  };
  return (
    <Container>
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
        <Button onClick={fetchWinner}>Winner</Button>
      </Content>

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
    </Container>
  );
};

export default Deposit;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #1b1c1c;
  border-radius: 10px;
  height: 500px;
  width: 400px;
  padding: 20px;
  /* border: 1px solid white; */
  p {
    text-align: center;
    font-size: 18px;
    /* padding-top: 20px; */
  }
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
    padding-bottom: 40px;
  }
`;
const Button = styled.button`
  padding: 5px 10px;
  background-color: #1f99f0;
  border: none;
  border-radius: 5px;
  height: 50px;
  width: 120px;
  color: white;
  font-size: 20px;
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
