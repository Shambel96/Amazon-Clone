import React, { useState, useContext } from "react";
import classes from "./Auth.module.css";
import amazonLogo from "../../assets/amazon-logo.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signin: false,
    signup: false,
  });
  const navigate = useNavigate();
  const navStateData = useLocation();
  //console.log(email, password);
  const { state, dispatch } = useContext(DataContext);
  //console.log(state.user);
  const { user } = state;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      //console.log('Please fill in all fields');
      return;
    }
    if (e.target.name === "signin") {
      setLoading({ ...loading, signin: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch({ type: "SET_USER", user: userCredential.user });
          setLoading({ ...loading, signin: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signin: false });
        });
    } else {
      setLoading({ ...loading, signup: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch({ type: "SET_USER", user: userCredential.user });
          setLoading({ ...loading, signup: false });
          navigate(navStateData?.state?.redirect || "/auth");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signup: false });
        });
    }
  };
  return (
    <div style={{backgroundColor:"#fff"}}>
      <div className={classes.auth_Container}>
        <Link to="/">
          <img src={amazonLogo} alt="amazon-logo" />
        </Link>
        <div className={classes.auth_Form}>
          <h2>Sign In {error && <p style={{ color: "red" }}>{error}</p>}</h2>
          {navStateData?.state?.msg && (
            <small
              style={{
                padding: "5px",
                textAlign: "center",
                color: "red",
                fontWeight: "bold",
              }}
            >
              {navStateData?.state?.msg}
            </small>
          )}
          <form action="">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" name="signin" onClick={handleSubmit}>
              {loading.signin ? <ClipLoader size={15} /> : "Sign In"}
            </button>
          </form>
          {/*Agreement*/}
          <p>
            By signing in, you agree to our Terms and Privacy Policy of Amazon
            fake clone with cookies and local storage.
          </p>
          <button
            className={classes.signUp}
            name="signup"
            onClick={handleSubmit}
          >
            {loading.signup ? (
              <ClipLoader size={15} />
            ) : (
              "Create Your Amazon Account"
            )}
          </button>
        </div>
      </div>
      <hr />
      <div className={classes.underlineFooter}>
        <div className={classes.footer_links}>
          <p>Conditions of use</p>
          <p>Privacy notice</p>
          <p>Help</p>
        </div>

        <div>
          <p>© 1996-2024, Amazon-clone.com, Inc. or its affiliates</p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
