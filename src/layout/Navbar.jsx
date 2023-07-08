import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { authService } from "../services/AuthService";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  const { user } = useAuth();
  const history = useHistory();
  const { logout } = useAuth();
  const token = localStorage.getItem("token");

  return (
    <div>
      <ul className="d-flex p-3">
        {!user.name && (
          <li className="m-3">
            <Link to="/login">Login</Link>
          </li>
        )}
        {!user.name && (
          <li className="m-3">
            <Link to="/register">Register</Link>
          </li>
        )}
        {user.name && (
          <li className="m-3">
            <Link to="/cars">Cars</Link>
          </li>
        )}
        {user.name && (
          <li className="m-3">
            <Link to="/add">Add</Link>
          </li>
        )}
        {user.name && (
          <li className="m-3">
            <button onClick={logout}>Logout</button>
          </li>
        )}
      </ul>
    </div>
  );
}
