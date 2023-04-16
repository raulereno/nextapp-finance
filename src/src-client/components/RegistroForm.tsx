import React, { useState } from "react";

interface RegistrationFormProps {
  onSubmit: (username: string, email: string, password: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username.match(/^[a-zA-Z0-9]{1,8}$/)) {
      setError("El nombre de usuario debe tener hasta 8 caracteres alfanuméricos");
      return;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Ingrese una dirección de correo electrónico válida");
      return;
    }
    if (!password.match(/^[a-zA-Z0-9]{1,8}$/)) {
      setError("La contraseña debe tener hasta 8 caracteres alfanuméricos");
      return;
    }
    onSubmit(username, email, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && <div>{error}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
