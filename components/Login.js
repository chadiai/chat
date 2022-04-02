import { useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebaseClient from "../firebase/firebaseClient";
import {
    getAuth,
    signInWithEmailAndPassword 
  } from "firebase/auth";


function Login() {
    firebaseClient();
    
    let errorMessage = "";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userLogin = async (e) => {
        e.preventDefault();
        const auth = await getAuth();
        await signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
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
        <div className="box">                        
            <ToastContainer />
            <form onSubmit={userLogin}>      
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
                <button type="submit" className="submit">Sign in</button>
            </form>
        </div>
     );

     
}
 
export default Login;