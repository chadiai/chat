import { useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebaseClient from "../firebase/firebaseClient";
import {
    getAuth,
    createUserWithEmailAndPassword,
  } from "firebase/auth";


const Signup = () => {
    firebaseClient();
    var errorMessage = "";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const register = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const auth = await getAuth();
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                const user = userCredential.user;
                window.location.href = "/";
                })
                .catch((error) => {
                    console.log(error.code)
                    switch (error.code) {
                        case "auth/invalid-email":
                          errorMessage = "Your email address appears to be malformed.";
                          break;
                        case "auth/operation-not-allowed":
                          errorMessage = "Your password is wrong.";
                          break;
                        case "auth/weak-password":
                          errorMessage = "User with this email doesn't exist.";
                          break;
                        case "auth/operation-not-allowed":
                          errorMessage = "Signing in with Email and Password is not enabled.";
                          break;
                        case "auth/email-already-in-use":
                            errorMessage = "Email is already used.";
                            break;
                        default:
                          errorMessage = "An undefined Error happened.";
                      }
                    toast.error(errorMessage);
                });
            } else {
            toast.error("Your passwords do not match");
            }
      };

    return ( 
        <div>
            <ToastContainer />
            <form onSubmit={register} className="box">
                <h1>Sign in</h1>
                <label for="email">Email</label>
                <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="emailAddress"
                />
                <label for="password">Password</label>
                <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                />
                <label for="confirmPassword">Confirm Password</label>
                <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                id="confirmPassword"
                />
                <button type="submit"> Register</button>
            </form>
        </div>
     );
}
 
export default Signup;