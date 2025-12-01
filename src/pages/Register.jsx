import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import './Register.css';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await register(username, email, password, confirmPassword);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setError("Erro ao criar conta. Verifique os dados.");
    }
  };

  return (
    <div className="page-container">
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit} className="form-fields">
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input"
          required
        />

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Conta criada com sucesso!</p>}

        <button type="submit" className="btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
}
