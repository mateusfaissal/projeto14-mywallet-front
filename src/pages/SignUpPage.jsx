import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"


export default function SignUpPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();

  function signUp(e) {

    e.preventDefault();

    if (password !== confPassword) return alert("Password must be equal!");

    axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, { name, email, password })
    .then(() => navigate("/"))
    .catch((err) => alert(err.message))

  }

  return (
    <SignUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" value={name} onChange={e => setName(e.target.value)} required/>
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
        <input placeholder="Senha" type="password"  value={password} onChange={e => setPassword(e.target.value)} required/>
        <input placeholder="Confirme a senha" type="password" value={confPassword} onChange={e => setConfPassword(e.target.value)} required/>
        <button>Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SignUpContainer>
  )
}

const SignUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
