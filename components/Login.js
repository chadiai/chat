import { useState } from "react";
import styles from "../styles/Login.module.css"
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebaseClient from "../firebase/firebaseClient";
import {
    getAuth,
    signInWithEmailAndPassword 
  } from "firebase/auth";


function Login() {
    firebaseClient();
    
    var errorMessage = "";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userLogin = async (e) => {
        e.preventDefault();
        const auth = await getAuth();
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            window.location.href = "/chat";
        })
        .catch((error) => {console.log(error.code)
            switch (error.code) {
                case "auth/invalid-email":
                  errorMessage = "Your email address appears to be malformed.";
                  break;
                case "auth/too-many-requests":
                  errorMessage = "Too many attempts, try again later.";
                  break;
                case "auth/wrong-password":
                    errorMessage = "Your password is incorrect.";
                    break;
                case "auth/user-not-found":
                    errorMessage = "This user does not exist.";
                    break;
                default:
                  errorMessage = "An undefined Error happened.";
              }
            toast.error(errorMessage);
        });
    };
    return ( 
        <div>                        
            <ToastContainer />
            <form onSubmit={userLogin} className={styles.box}>      
                <h1>Login</h1>
                <label for="email">Email</label>
                <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    id="email"
                    placeholder="Email"
                />
                <label for="password">Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    id="password"
                    placeholder="Password"
                />
                <button className={styles.button} type="submit">Login</button>
            </form>
        </div>
     );

     
}
 
export default Login;