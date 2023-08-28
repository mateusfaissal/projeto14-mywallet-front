import styled from "styled-components"
import axios from "axios"
import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import tokenContext from "../contexts/TokenContext"

export default function TransactionsPage() {

  const { tipo } = useParams();
  const navigate = useNavigate();
  const [token] = useContext(tokenContext);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");


  let title = "entrada";

  if (tipo === "saida") {
    title = "saída"
  }

  const newToken = token;


  const config = {
    headers: {
      Authorization: `Bearer ${newToken}`
    }
  }

  function postTransaction(e) {

    e.preventDefault();

    const newValue = value.replace(',', '.');

    axios.post(`${import.meta.env.VITE_API_URL}/transaction/${tipo}`, { value: newValue, description }, config)
      .then(() => navigate("/home"))
      .catch(err => console.log(err))
  }




  return (
    <TransactionsContainer>
      <h1>Nova {title} </h1>
      <form onSubmit={postTransaction}>
        <input data-test="registry-amount-input" placeholder="Valor" type="text" value={value} onChange={e => setValue(e.target.value)} />
        <input data-test="registry-name-input" placeholder="Descrição" type="text" value={description} onChange={e => setDescription(e.target.value)} />
        <button data-test="registry-save">Salvar {title}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
