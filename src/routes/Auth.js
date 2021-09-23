import React from "react";
import { authService } from "firebaseInit";
import { firebaseInstance } from "firebaseInit";
import AuthForm from "components/AuthForm";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import backImg from "../../src/images/backImg.jpg";

const Auth = () => {
  const onSocialClick = async event => {
    const {
      target: { name },
    } = event;
    let provider;
    try {
      if (name === "google") {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
      } else if (name === "github") {
        provider = new firebaseInstance.auth.GithubAuthProvider();
      }
      await authService.signInWithPopup(provider);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `url(${backImg})`,
        backgroundSize: "2000px",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "30px",
            fontWeight: "bolder",
          }}
        >
          <h2>Jury</h2>
        </div>
        <AuthForm />
        <div
          style={{
            width: "400px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div>
            <button
              onClick={onSocialClick}
              name="google"
              style={{
                width: "180px",
                padding: "10px",
                height: "40px",
                color: "white",
                backgroundColor: "#c94e4e",
                marginTop: "30px",
                border: "0px solid white",
                borderRadius: "5px 5px 5px 5px",
                boxShadow: "2px 2px 5px 0.1px #423e3e",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FcGoogle size={20} />
              {`| Continue with Google`}
            </button>
          </div>
          <div>
            <button
              onClick={onSocialClick}
              name="github"
              style={{
                width: "180px",
                padding: "10px",
                height: "40px",
                color: "white",
                backgroundColor: "#666060",
                marginTop: "30px",
                border: "0px solid white",
                borderRadius: "5px 5px 5px 5px",
                boxShadow: "2px 2px 5px 0.1px #423e3e",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ImGithub size={20} />
              {"|Continue with Github"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
