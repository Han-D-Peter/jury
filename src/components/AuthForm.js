import React, { useState } from "react";
import { authService } from "firebaseInit";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = event => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name == "checkPassword") {
      setCheckPassword(value);
    }
  };

  const onSubmit = async event => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        if (password !== checkPassword) {
          setError("Check Password and Confirm Password match");
          return;
        }
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (e) {
      setError(e.message);
    }
  };

  const toggleAccount = () => setNewAccount(prev => !prev);

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <input
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
            style={{
              width: "400px",
              height: "50px",
              border: "0px solid white",
              borderRadius: "30px",
              boxShadow: "2px 2px 5px 0.1px #423e3e",
              textAlign: "center",
            }}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
            style={{
              width: "400px",
              height: "50px",
              border: "0px solid white",
              borderRadius: "30px",
              boxShadow: "2px 2px 5px 0.1px #423e3e",
              textAlign: "center",
              marginTop: "15px",
            }}
          />
        </div>
        <div>
          {newAccount ? (
            <div>
              <input
                name="checkPassword"
                type="password"
                placeholder="Corfirm Password"
                required
                value={checkPassword}
                onChange={onChange}
                style={{
                  width: "400px",
                  height: "50px",
                  border: "0px solid white",
                  borderRadius: "30px",
                  boxShadow: "2px 2px 5px 0.1px #423e3e",
                  textAlign: "center",
                  marginTop: "15px",
                }}
              />
            </div>
          ) : null}
        </div>
        <div
          style={{
            color: "red",
            textAlign: "center",
            marginTop: "10px",
            fontSize: "12px",
          }}
        >
          {error}
        </div>
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
          style={{
            width: "400px",
            height: "50px",
            border: "0px solid white",
            borderRadius: "30px",
            boxShadow: "2px 2px 5px 0.1px #423e3e",
            textAlign: "center",
            marginTop: "15px",
            color: "white",
            backgroundColor: "#5ec649",
          }}
        />
      </form>
      {newAccount ? (
        <div
          onClick={toggleAccount}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "300px",
              height: "40px",
              border: "0px solid white",
              borderRadius: "30px",
              boxShadow: "2px 2px 5px 0.1px #423e3e",
              textAlign: "center",
              marginTop: "15px",
              color: "white",
              backgroundColor: "#a8772f",
            }}
          >
            <div>Sign in.</div>
          </div>
        </div>
      ) : (
        <div
          onClick={toggleAccount}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "300px",
              height: "40px",
              border: "0px solid white",
              borderRadius: "30px",
              boxShadow: "2px 2px 10px 0.1px #8e8b8b",
              textAlign: "center",
              marginTop: "15px",
              color: "white",
              backgroundColor: "#2e8cf2",
            }}
          >
            <div>CreateAccount</div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthForm;
