import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react"
import axios from "axios"
import tokenContext from "../contexts/TokenContext"

export default function SignInPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useContext(tokenContext);
  const navigate = useNavigate();

  function handleToken(dbToken) {

    const newToken = dbToken;
    setToken(newToken);
    localStorage.setItem('token', newToken);
    navigate('/home');
  }

  function signIn(e) {

    e.preventDefault();

    axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, { email, password })
      .then((res) => {
        handleToken(res.data)
      })
      .catch((err) => alert(err))

  }



  return (
    <SignInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input data-test="email" placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input data-test="password" placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button data-test="sign-in-submit">Entrar</button>
      </form>

      <Link to={'/cadastro'}>
        Primeira vez? Cadastre-se!
      </Link>
    </SignInContainer>
  )
}

const SignInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
