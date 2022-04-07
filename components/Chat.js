import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../auth";
import { db } from "../firebase/firebaseDatabase";
import { collection, addDoc } from "@firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"


const SideBar = () => {
    const [userLookup, setUserLookup] = useState("");
    
    const auth = getAuth();
    const { user } = useAuth();
    const [ snapshotChats ] = useCollection(collection(db, "chats"));
    const chats = snapshotChats?.docs.map((doc => ({id: doc.id, ...doc.data()})));

    const [ snapshotUsers ] = useCollection(collection(db, "users"));
    const users = snapshotUsers?.docs.map((doc => ({id: doc.id, ...doc.data()})));

    const chatExists = email => chats?.find(chat => {chat.emails.includes(user.email) && chat.emails.includes(email)})

    const getDisplayName = (email) => {
        try {
            let name = users?.filter(user => user.email.includes(email))[0].name
            return name
        }
        catch(err) {
            // To do: popup maken
            console.log("user does not exist")
        }
        
    }

    const userlookup = async (e) => {
        e.preventDefault();
        if (!chatExists(userLookup) && (userLookup != user.email)){
            const displayName = getDisplayName(userLookup);
            if(displayName){
                await addDoc(collection(db,"chats"),{emails: [user.email, userLookup],users: [user.displayName, displayName]})
            }
            
        }
        
    }

    
    const UserPreview = props => {
        return (
            <div id="friend-username">
                <span><i className="fa-solid fa-user"></i> {props.name}</span>  
            </div>
        )
    }

    const getUser = (users, currentUser) => {
        return users?.filter(user => user!== currentUser.displayName)[0];
    
    }

    const UserList = () => {
        return (
        <>
            {chats?.filter(chat => chat.emails.includes(user.email))
            .map(
                chat => 
                <UserPreview key={chat.users} name={getUser(chat.users,user)} /> )}
        </>
        )
    }

    const logout = async () => {
        signOut(auth)
        .catch((error) => {
            toast.error(error.message);
        });
    };
    
    return (
        <div className="preview" >
            <div className="topbar">
                <div>
                    <i className="fa-solid fa-user"></i> {user.displayName}
                </div>
                <a className="signout" onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i></a>
            </div>
            <form onSubmit={userlookup}>
                <input id="userlookup" onChange={(e) => setUserLookup(e.target.value)}
                        value={userLookup}></input>
                <button id="newchat" type="submit" > add user</button>
            </form>
            <UserList/>
        </div>    
    )
}


const Chatbox = () => {

    return (
        
        <div className="chatbox">
                
                    
                    <p className="chat-right">message</p>
                    <p className="chat-left">message</p>
                    <p className="chat-right">message</p>
                    <p className="chat-right">message</p>
                    <p className="chat-left" >message</p>
                    <p className="chat-left" >message</p>
            <div className="input-msg">
                <textarea type="text" id="send-input" placeholder="type something" />
            </div>
        </div>
    )
}

const Chat = () => {
    

    return (
    <>   
        <SideBar/>
        <Chatbox/>
    </> );
}
 
export default Chat;