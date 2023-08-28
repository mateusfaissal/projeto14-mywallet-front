import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";
import tokenContext from "../contexts/TokenContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function HomePage() {

  const [name, setName] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();
  const [token, setToken] = useContext(tokenContext);

  const newToken = token;


  const config = {
    headers: {
      Authorization: `Bearer ${newToken}`
    }
  }

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_API_URL}/transactions`, config)
      .then((res) => {
        setName(res.data.name)
        setTransactions(res.data.allTransactions.reverse())
        calcBalance(res.data.allTransactions)
      })
      .catch((err) => {
        alert(err)
        navigate("/")
      })

  }, []);



  function handleSignOut() {

    axios.post(`${import.meta.env.VITE_API_URL}/sign-out`, config)
      .then(() => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status = 401) {
          localStorage.removeItem("token");
          navigate("/");
        }
      });

  }

  function calcBalance(trans) {
    let val = 0;

    trans.forEach(t => {
      if (t.type === "entrada") {
        val += Number(t.value)
      } else {
        val -= Number(t.value);
      }
    });

    setBalance(val);

  }





  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {name} </h1>
        <BiExit data-test="logout" onClick={handleSignOut} />
      </Header>

      <TransactionsContainer>
        {transactions.length === 0 ? (
          <p> Não há registros de entrada ou saída </p>
        ) : (
          <>
            <ul>
              {transactions.map((t, i) => (

                <ListItemContainer key={i}>
                  <div>
                    <span>{t.date}</span>
                    <strong data-test="registry-name">{t.description}</strong>
                  </div>
                  <Value data-test="registry-amount" color={t.type === "entrada" ? "green" : "red"}>
                    {`R$ ${Number(t.value).toFixed(2).replace('.', ',')}`}
                  </Value>
                </ListItemContainer>

              ))}

            </ul>

            <article>
              <strong>Saldo</strong>
              <Value data-test="total-amount" color={balance >= 0 ? "green" : "red"}>
                {`R$ ${Number(balance).toFixed(2).replace('.', ',')}`}
              </Value>
            </article>
          </>
        )}




      </TransactionsContainer>


      <ButtonsContainer>

        <button data-test="new-income" onClick={()=> {navigate('/nova-transacao/entrada')}}>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
        </button>


        <button data-test="new-expense" onClick={()=> {navigate('/nova-transacao/saida')}}>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "green" ? " #90ee90" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`