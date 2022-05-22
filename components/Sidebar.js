import { useState,useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuth , upload } from "../auth";
import { db } from "../firebase/firebaseDatabase";
import { collection, addDoc,updateDoc,doc, setDoc } from "@firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import { ToastContainer,toast } from "react-toastify";

const SideBar = () => {
    const [userLookup, setUserLookup] = useState("");
    const [photo, setPhoto] = useState(null);
    const [profilePicture, setProfilePicture] = useState(false);
    const [loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState("");
    const auth = getAuth();
    const { user } = useAuth();
    const [ snapshotChats ] = useCollection(collection(db, "chats"));
    const chats = snapshotChats?.docs.map((doc => ({id: doc.id, ...doc.data()})));

    const [ snapshotUsers ] = useCollection(collection(db, "users"));
    const users = snapshotUsers?.docs.map((doc => ({id: doc.id, ...doc.data()})));

    const push = (id) => {        
        window.location = `/chat/${id}`;
    }

    const chatExists = email => chats?.find(chat => (chat.emails.includes(user.email) && chat.emails.includes(email)))


    const getEmail = (name) => {
        try {
            let email = users?.filter(user => user.id == name )[0].email
            return email
        }
        catch(err) {
            alert("User does not exist")
        }
        
    }

    const userlookup = async (e) => {
        e.preventDefault();
        if ((userLookup.toLowerCase() != user.displayName.toLowerCase()) && userLookup != ""){
            const email = getEmail(userLookup.toLowerCase());
            if(email && email != user.email && !chatExists(email)){
                await addDoc(collection(db,"chats"),{emails: [email, user.email],users: [user.displayName.toLowerCase(), userLookup.toLowerCase()]})

            }
            
        }
        
    }

    
    const UserPreview = props => {
        return (
            <div id="friend-username">
                <span onClick={() => push(props.id)} >{props.photoURL != null && props.photoURL != "" ? (<> <a><img className="profilepic" src={props.photoURL} width="30" height="30" ></img></a></>) : ( <i className="fa-solid fa-user"></i>)} {props.name}</span>  
            </div>
        )
    }

    const getUser = (users, currentUser) => {
        return users?.filter(user => user!== currentUser.displayName.toLowerCase())[0];
    
    }

    const getProfilePicture = (name) => {
        try {
            let photoUrl = users?.filter(user => user.id == name.toLowerCase() )[0].photoURL
            return photoUrl
        }
        catch(err) {
            //
        }
    }

    const UserList = () => {
        return (
        <>
            {chats?.filter(chat => chat.emails.includes(user.email))
            .map(
                chat => 
                <UserPreview key={chat.users} name={getUser(chat.users,user)} url={chat.id} id={chat.id} photoURL={getProfilePicture(getUser(chat.users,user))}/> )}
        </>
        )
    }

    const logout = async () => {
        signOut(auth)
        .catch((error) => {
            toast.error(error.message);
        });
    };

 
    const openProfilePicture = () => {
        setProfilePicture(true);
    }
    const closeProfilePicture = () => {
        setProfilePicture(false);
    }

    function handleChange(e) {
        if (e.target.files[0]) {
          setPhoto(e.target.files[0])
        }
    }


    async function handleClick() {
    upload(photo, user,setLoading);
    setProfilePicture(false)
    }

        
    useEffect(() => {
    if (user?.photoURL) {
        setPhotoURL(user.photoURL);
    }
    }, [user])
    
    return (
        <>
        <div className="preview">
            <ToastContainer />
            <div className="topbar">
                <div>
                {user?.photoURL != null && user?.photoURL != "" ? (<> <a onClick={openProfilePicture}><img className="profilepic" src={user.photoURL} width="30" height="30"></img></a></>) : ( <a onClick={openProfilePicture}><i className="fa-solid fa-user"></i></a>)}
                     {user?.displayName}
                </div>
                <a className="signout" onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i></a>
            </div>
            <form onSubmit={userlookup}>
                <input id="userlookup" onChange={(e) => setUserLookup(e.target.value)}
                        value={userLookup} placeholder="username"></input>
                <button id="newchat" type="submit" > add user</button>
            </form>
            <UserList/>
        </div>
        {profilePicture ? (<div className="photoupload">
            <input type="file" onChange={handleChange} />
            <a onClick={closeProfilePicture} className="close-pf"><i className="fa-solid fa-xmark"></i></a>
            <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
        </div>) : (<></>)}
        
    </>   
    )
}
export default SideBar;