import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import styles from "../Styles/Signup.module.css";
export default function Regester(disp) {
  disp.visibility(false);
  const [user, setuser] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordconfirm, setpasswordconfirm] = useState("");
  const navegate = useNavigate();
  const LoginNotify = (msg) => toast(msg);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      user === "" ||
      password === "" ||
      username === "" ||
      email === "" ||
      passwordconfirm === ""
    ) {
      LoginNotify("Pleasee Complete The Data");
      return;
    }
    if (password !== passwordconfirm) {
      LoginNotify("Password must be same");
      return;
    }

    createUserWithEmailAndPassword(auth,email,password).then ((res)=>{
       console.log(res)
      localStorage.setItem("username", user);
      LoginNotify("Sign Successful");
      setTimeout(() => {
        navegate("/Welcome");
      }, 2500);
    }).catch(async (err)=>{
      if (err.message ==="Firebase: Error (auth/invalid-email)."){
        LoginNotify(err.message);
        return;
      } else if (err.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
        LoginNotify(err.message);
        return;
      }
   LoginNotify(err.message +"[please login with ur account]");
        console.log("Error", err);
      setTimeout(() => {
       navegate("/Login");
      }, 3000);
    
    });
  
  };
  return (
    <div className={styles.signupSection}>
      <div
        className={styles.container}
        
      >
      <h1 className={styles.titleH2}>Welcome to <span className={styles.titleSpan}>MA4</span></h1>
        <ul className={styles.signNav} id="ex1" role="tablist">
          <li className={styles.loginNavItem} role="presentation">
            <a
              className={styles.loginNavLink}
            
            >
              {" "}
              <Link className={styles.loginLink} to="/Login">Login</Link>
            </a>
          </li>
          <li className={styles.SignNavItem} role="presentation">
            <a
              className={styles.SignNavLink}
           
            >
              {" "}
              <Link
                className={styles.SignLink} to="/Signup"
              >
                Register
              </Link>
            </a>
          </li>
        </ul>
        <form>
          <div className={styles.fieldContainer}>
            <input
              value={user}
              onChange={(e) => setuser(e.target.value)}
              
              className={styles.inputInfo}
              placeholder="Name"
            />
          </div>

          <div className={styles.fieldContainer}>
            <input
              value={username}
              onChange={(e) => setusername(e.target.value)}
              type="text"
              
              className={styles.inputInfo}
              placeholder="Username"
            />
          </div>

          <div className={styles.fieldContainer}>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
             
              className={styles.inputInfo}
              placeholder="Email"
            />
          </div>

          <div className={styles.fieldContainer}>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              
              className={styles.inputInfo}
              placeholder="Password"
            />
          </div>

          <div className={styles.fieldContainer}>
            <input
              value={passwordconfirm}
              onChange={(e) => setpasswordconfirm(e.target.value)}
              type="password"
            
              className={styles.inputInfo}
              placeholder="Repeat password"
            />
          </div>
        
        
          <button
            onClick={handleSubmit}
           
            className={styles.submit}
          >
            Sign up
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
