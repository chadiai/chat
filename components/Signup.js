import { useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebaseClient from "../firebase/firebaseClient";
import {
    getAuth,
    createUserWithEmailAndPassword, updateProfile
  } from "firebase/auth";

import { db } from "../firebase/firebaseDatabase";
import { collection, addDoc } from "@firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"

const Signup = () => {
    firebaseClient();
    let errorMessage = "";
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [ snapshotUsers ] = useCollection(collection(db, "users"));
    const users = snapshotUsers?.docs.map((doc => ({id: doc.id, ...doc.data()})));



    const register = async (e) => {
        e.preventDefault();
        const userExists = username => users?.find(user => {
          return user.name==username
        })
        if (password === confirmPassword )  {
          if (userExists(username)) return toast.error("username already exists")
            const auth = await getAuth();
            await createUserWithEmailAndPassword(auth, email, password)
            .then(function () {
              updateProfile(auth.currentUser, {
                displayName: username
              }).then(() => {
                addDoc(collection(db,"users"),{email: email,name: username})
              }).catch((error) => {
                toast.error("Could not create account with that username");
              });
            })
            .catch((error) => {
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
        <div className="box">
            <ToastContainer />
            <form onSubmit={register} >
                <h1>Sign in</h1>
                <label htmlFor="email">Email</label>
                <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="emailAddress"
                />
                <label htmlFor="username">Username</label>
                <input
                type="username"
                name="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                id="username"
                />
                <label htmlFor="password">Password</label>
                <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                id="confirmPassword"
                />
                <button type="submit" className="submit"> Register</button>
            </form>
        </div>
     );
}
 
export default Signup;