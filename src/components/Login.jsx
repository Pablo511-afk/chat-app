import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ user: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid credentials");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert(`Welcome ${data.user.name}!`);

      navigate("/dashboard");
    } catch (err) {
      console.log(err.message);

      setError(err.message ?? "An error occurred");
    }
  };

  // Redirigir al formulario de creación de usuario
  const handleCreateAccount = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <label>User:</label>
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="login-button" type="submit">
            Log In
          </button>
        </form>
        <div className="create-account">
          <p>¿No tienes una cuenta?</p>
          <button
            className="register-button"
            type="button"
            onClick={handleCreateAccount}
          >
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
