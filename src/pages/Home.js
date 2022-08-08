import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CountdownTimer from '../components/CountdownTimer';
import Winner from '../components/Winner';
import {
  approve,
  buttonClicked,
  getCount,
  getCountdownEnd,
  getPrize,
  getWinner,
  getInitial,
  getFinal,
  getBalance,
  winner,
} from '../utils/Web3';
import Notify from '../components/Notify';

const Home = () => {
  const [countdownEnd, setCountdownEnd] = useState();

  const [timerDays, setTimerDays] = useState(0);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const [showPop, setShowPop] = useState(false);
  const [show, setShow] = useState(false);

  const [acceptReq, setAcceptReq] = useState(false);
  const [win, setWin] = useState();

  const [success, setSuccess] = useState(false);

  const [prize, setPrize] = useState(0);
  const [balance, setBalance] = useState(0);
  const [cnt, setCnt] = useState(0);
  const [initialAmount, setInitialAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  // const [data, setData] = useState({
  //   initialAmount: 0,
  //   finalAmount: 0,
  //   prize: 0,
  //   cnt: 0,
  //   balance: 0,
  // });

  let interval;

  const fetchData = async () => {
    const c = await getCount();
    setCnt(c);

    const b = await getBalance();
    setBalance(b);

    const i = await getInitial();
    setInitialAmount(i);

    const f = await getFinal();
    setFinalAmount(f);

    const p = await getPrize();
    setPrize(p);

    console.log('cnt', cnt);
    console.log('balance', balance);
  };

  const fetchDate = () => {
    getCountdownEnd()
      .then((countdownEnd) => {
        setCountdownEnd(countdownEnd);
        console.log('countdownEnd', countdownEnd);
        interval = setInterval(() => {
          const now = new Date().getTime();
          const gap = countdownEnd * 1000 - now;
          const days = Math.floor(gap / (24 * 60 * 60 * 1000));
          const hours = Math.floor(
            (gap % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor((gap % (60 * 60 * 1000)) / (1000 * 60));
          const seconds = Math.floor((gap % (60 * 1000)) / 1000);

          if (gap < 0) {
            //stop timer
            clearInterval(interval.current);
          } else {
            //update
            setTimerDays(days);
            setTimerHours(hours);
            setTimerMinutes(minutes);
            setTimerSeconds(seconds);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleApprove = async () => {
    await approve();
    toast.success('Approved Successfully', { autoClose: 4000 });
  };

  const handlePop = () => {
    setShowPop(true);
    console.log('showPop', showPop);
  };
  const handleClick = async () => {
    try {
      if (
        (cnt >= 1 && balance !== 0 && balance >= initialAmount) ||
        balance >= finalAmount
      ) {
        if (balance < initialAmount || balance < finalAmount) {
          toast.error('Not sufficient Balance', { autoClose: 4000 });
        }
        console.log('count is more than 0');
        await handlePop();
        console.log('buhahahha');
        await buttonClicked();
        console.log('changeDeposit');
        setSuccess(true);
        toast.success('Participation Success', { autoClose: 4000 });
      } else {
        await buttonClicked();
        setSuccess(true);
        toast.success('Participation Success', { autoClose: 2000 });
      }
    } catch (error) {}
  };
  const declareWinner = async () => {
    await winner();
    setShow(true);
  };

  const fetchwin = async () => {
    const winn = await getWinner();
    setWin(winn);
    console.log('win', win);
  };

  useEffect(() => {
    fetchData();
    fetchDate();
    if (new Date().getTime() / 1000 >= countdownEnd) {
      fetchwin();
    }
  }, []);

  return (
    <Container>
      {
        <Notify
          setAcceptReq={setAcceptReq}
          showPop={showPop}
          setShowPop={setShowPop}
        />
      }
      {show && <Winner win={win} show={show} />}
      <Content>
        <h1>Button</h1>
        {new Date().getTime() / 1000 >= countdownEnd && (
          <ApproveButton onClick={declareWinner}>winner</ApproveButton>
        )}
        <h2>COUNT DOWN</h2>
        {/* <p>{countdownEnd}</p> */}
        <CountdownTimer
          timerDays={timerDays}
          timerHours={timerHours}
          timerMinutes={timerMinutes}
          timerSeconds={timerSeconds}
        />
        <Div>
          <ButtonDiv>
            <Button onClick={() => handleClick()}></Button>
          </ButtonDiv>
        </Div>
        <ApproveButton onClick={handleApprove}>Approve</ApproveButton>
        <h2>PRIZE ACCUMULATED: {prize / 10 ** 18} TT</h2>
        <p>
          Click the button to become the<b> new leader</b>
        </p>
        <p>and reset the countdown</p>
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

export default Home;

const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  color: white;
  background-color: #1b1c1c;
`;

const Content = styled.section`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  padding-bottom: 50px;
  h1 {
    padding: 20px 0px;
    font-size: 60px;
    color: lightgray;
  }
  h2 {
    padding: 20px 0px;
  }
  p {
    text-align: center;
    font-size: 20px;
  }
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const ButtonDiv = styled.div`
  height: 220px;
  width: 220px;
  border-radius: 50%;
  border: 4px solid #1f99f0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  height: 180px;
  background-color: #1f99f0;
  border-radius: 50%;
  width: 180px;
  border: none;
  /* font-size: 20px; */
  color: white;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }
`;
const ApproveButton = styled.button`
  height: 40px;
  background-color: #1f99f0;
  width: 100px;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background-color: grey;
  }
`;
