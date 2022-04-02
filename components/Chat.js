import { useState } from "react";
import { toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../auth";


const SideBar = () => {
    const [userLookup, setUserLookup] = useState("");
    
    const { user } = useAuth();
    
    const userlookup = async (e) => {
        e.preventDefault();
        console.log("pressed")

    }

    return (
        <div className="preview" >
            <UserPreview name={user.displayName}/>
            
            <form onSubmit={userlookup}>
                <input id="userlookup" onChange={(e) => setUserLookup(e.target.value)}
                        value={userLookup}></input>
                <button id="newchat" type="submit" > new chat</button>
            </form>
            <UserPreview name="user"/>
        </div>    
    )
}

const UserPreview = props => {
    return (
        <div id="friend-username">
            <i class="fa-solid fa-user"></i>
            {props.name}
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