import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      await checkAuth();
      navigate("/");
    } catch (err) {
      setError("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="page-container">
      <h1>Entrar</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
