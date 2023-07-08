import React, { useState } from "react";
import { authService } from "../services/AuthService";
import useAuth from "../hooks/useAuth";
import { ErrorMessage } from "../components/ErrorMessage";

export default function RegisterPage() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [areCredentialsInvalid, setAreCredentialsInvalid] = useState(false);
  const [errors, setErrors] = useState({});

  const { user, register } = useAuth();

  const handleOnRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    const response = await register(newUser);

    if (response.status === 401) {
      setAreCredentialsInvalid(true);
    }

    if (response.status === 422) {
      setErrors(response.data.errors);
    }
  };

  const renderErrors = (fieldKey) => {
    if (!errors[fieldKey]) {
      return;
    }

    return errors[fieldKey].map((error) => {
      return <ErrorMessage message={error} />;
    });
  };

  return (
    <div className="App">
      <h1>Welcome to Cars page</h1>
      <form
        onSubmit={handleOnRegister}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <input
          required
          placeholder="name"
          type="text"
          value={newUser.name}
          onChange={({ target }) =>
            setNewUser({ ...newUser, name: target.value })
          }
        />
        {renderErrors("name")}

        <input
          required
          placeholder="email"
          type="email"
          name="name"
          value={newUser.email}
          onChange={({ target }) =>
            setNewUser({ ...newUser, email: target.value })
          }
        />
        {renderErrors("email")}

        <input
          required
          placeholder="password"
          type="password"
          value={newUser.password}
          onChange={({ target }) =>
            setNewUser({ ...newUser, password: target.value })
          }
        />
        {renderErrors("password")}

        <input
          required
          placeholder="confirm password"
          type="password"
          value={newUser.password_confirmation}
          onChange={({ target }) =>
            setNewUser({ ...newUser, password_confirmation: target.value })
          }
        />
        {renderErrors("password_confirmation")}

        <button type="submit">Register</button>
        {areCredentialsInvalid && (
          <ErrorMessage message="Invalid credentials" />
        )}
      </form>
    </div>
  );
}
