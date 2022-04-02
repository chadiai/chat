import { useState } from "react";
import { toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../auth";
import { db } from "../firebase/firebaseDatabase";
import { collection, addDoc } from "@firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"


const SideBar = () => {
    const [userLookup, setUserLookup] = useState("");
    
    const { user } = useAuth();
    const [ snapshotChats ] = useCollection(collection(db, "chats"));
    const chats = snapshotChats?.docs.map((doc => ({id: doc.id, ...doc.data()})));

    const [ snapshotUsers ] = useCollection(collection(db, "users"));
    const users = snapshotUsers?.docs.map((doc => ({id: doc.id, ...doc.data()})));

    const chatExists = email => chats?.fill(chat => {chat.emails.includes(user.email) && chat.emails.includes(email)})

    const userlookup = async () => {
        const input = prompt("Enter email");

        if (!chatExists(input) && (input != user.email)){
            await addDoc(collection(db,"chats"),{emails: [user.email, input],users: [user.displayName, input]})
        }
        
    }

    
    const UserPreview = props => {
        return (
            <div id="friend-username">
                <i className="fa-solid fa-user"></i>
                {props.name}
            </div>
        )
    }

    const getUser = (users, currentUser) => {
        return users?.filter(user => user!== currentUser.displayName)[0];
    
    }

    const UserList = () => {
        return (
        <>
            {chats?.filter(chat => chat.id.includes(user.uid))
            .map(
                chat => 
                <UserPreview key={chat.users} name={getUser(chat.users,user)} /> )}
        </>
        )
    }
    
    
    return (
        <div className="preview" >
            <UserPreview name={user.displayName}/>            
            <form onSubmit={userlookup}>
                <input id="userlookup" onChange={(e) => setUserLookup(e.target.value)}
                        value={userLookup}></input>
                <button id="newchat" type="submit" > new chat</button>
            </form>
            <UserList/>
        </div>    
    )
}


const Chatbox = () => {
    return (
        <div className="chatbox">
            <div className="user-input">
                    messages
            </div>
            <div className="input-msg">
                <textarea type="text" id="send-input" placeholder="type something" />
            </div>
        </div>
    )
}

const Chat = () => {
    const auth = getAuth();

    const logout = async () => {
        signOut(auth)
        .catch((error) => {
            toast.error(error.message);
        });
    };

    return (
    <> 
    <div className="chat">        
        <div className="navbar"><a onClick={logout}>Sign out</a></div>
        <SideBar/>
        <Chatbox/>
        
  </div>
    </> );
}
 
export default Chat;