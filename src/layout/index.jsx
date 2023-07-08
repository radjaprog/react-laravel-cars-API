import React from "react";
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";

export default function DefaultLayout({ children }) {
  const { user, login } = useAuth();

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>{children}</div>
      <footer>{user && user.email}</footer>
    </div>
  );
}
