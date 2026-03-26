import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {

      const response = await loginUser(formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userEmail", response.data.email || "");
      localStorage.setItem("userName", response.data.name || "");

      // Dispatch custom event to notify navbar of login
      window.dispatchEvent(new Event('login'));

      navigate("/recipes");

    } catch (error) {

      console.error(error);

      const message = error.response?.data?.error || error.response?.data?.message || error.message;
      alert(message || "Login failed");

    }

  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-warning w-100" type="submit">
            Login
          </button>
        </form>
        <Link to="/signup" className="auth-link">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
}

export default Login;