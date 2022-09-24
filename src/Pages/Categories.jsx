import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateCatego from "./CreateCatego";
import "./Categories.css";
const baseURL = "https://ct-testing.herokuapp.com";
export const Categories = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${baseURL}/admin/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const logout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    // const payload = { refreshToken: refreshToken };

    try {
      await fetch(`${baseURL}/admin/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        // body: JSON.stringify(payload),
      });
      localStorage.setItem("accessToken", "");
      localStorage.setItem("refreshToken", "");
      navigate("/login");
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <div className="main-div">
      <div className="btn-div">
        <div>
          <h2 className="text-center">Admin Pannel</h2>
          <div>
            <button className="btn btn-primary" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div>
        <CreateCatego />
      </div>
    </div>
  );
};
