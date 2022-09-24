import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const baseURL = "https://ct-testing.herokuapp.com";
export const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    event.preventDefault();

    const payload = {
      Username: userName,
      Password: password,
      testing: true,
      ttl: "120min,120min",
    };

    try {
      const response = await fetch(`${baseURL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      localStorage.setItem("accessToken", data.data[0].accessToken);
      localStorage.setItem("refreshToken", data.data[0].refreshToken);
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      setUserName("");
      setPassword("");
    }
  };

  return (
    <div>
      <form onSubmit={login} className="fo-rm">
        <h3 className="admin-heading">Admin Login</h3>
        <div>
          <label for="exampleInputEmail1" className="form-label label-tag">
            Email address
          </label>
          <input
            type="text"
            className="form-control input-field"
            id="exampleInputEmail1"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label label-tag">
            Password
          </label>
          <input
            type="password"
            className="form-control input-field"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="btnn">
          <button
            type="submit"
            disabled={userName === "" || password === ""}
            className="btn btn-primary submint-button"
          >
            LogIn
          </button>
        </div>
      </form>
    </div>
  );
};
