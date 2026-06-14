import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {auth} from "../features/auth/auth";
import "./style/login.css"; 

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // fake user (بعدين بنربطه بbackend)
        const user = {
            id: 1,
            name: name || "User",
            email: email,
        };

        auth.login(user);

        navigate("/dashboard");
    };

  return (
      <div className="login-page">
          <div className="login-card">
              <div className="login-title">Welcome Back</div>
              <div className="login-subtitle">Login to continue to TaskFlow</div>

              <form onSubmit={handleLogin}>
                  <input
                      className="login-input"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />

                  <input
                      className="login-input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />

                  <button className="login-button" type="submit">
                      Login
                  </button>
              </form>

              <div className="login-footer">TaskFlow • Project Management System</div>
          </div>
      </div>
  );
}
