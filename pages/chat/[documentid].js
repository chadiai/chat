import {  useState, useEffect, useRef, React } from 'react';
import SideBar from "../../components/Sidebar";
import { useRouter } from "next/router"
import { useAuth } from "../../auth";
import { collection, serverTimestamp, addDoc,query,orderBy } from "firebase/firestore"
import { useCollection  , useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../../firebase/firebaseDatabase";

const Chat  = () => {

    const [ id, setId ] = useState();
    const IsAuthorized = false;
    const [text, setText] = useState("");
    const router = useRouter();
    const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"))    
    const [ snapshotChats ] = useCollection(collection(db, "chats"));
    const chats = snapshotChats?.docs.map((doc => ({id: doc.id, ...doc.data()})));
    const { user } = useAuth();
    const [messages] = useCollectionData(q);
    const endOfChatRef = useRef(null)
    
    useEffect(()=>{
        if (user == false) {
            router.push("/")
        }
        else if (user != null){
            while(!router.isReady) return;
            const id  = router.query.documentid;
            setId(id);
            
        }
        
        
        
        
    },[router.isReady,user]);

    const scrollToBottom =  () => {
        if(endOfChatRef.current != null){
            endOfChatRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    const chatAuth = () => chats?.find(
        chat => ( chat.emails.includes(user.email) && chat.id == id))

    if (chatAuth() != undefined){
        IsAuthorized = true;
    }
    
    const Messages = () => messages?.map((msg, i , row) => {
        if (msg.timestamp != null && IsAuthorized){
            const isSender = msg.sender === user.email;
            let milliseconds = msg.timestamp.seconds*1000+(msg.timestamp.nanoseconds/1000000);
            let time = new Date(milliseconds)
            return (
            <div ref={endOfChatRef} key={time.getTime()} className={isSender ? "right" : "left"}>
                <p   className={isSender ? "message-right" : "message-left"} >
                {msg.text}</p>
                <p className={isSender ? "timestamp-right" : "timestamp-left"}>{time.toUTCString()}</p>
            </div>
            )
        }
    });

    const sendMessage = async (e) => {
        e.preventDefault();
        if (text == "") { return }
        setText("");
        await addDoc(collection(db, `chats/${id}/messages`), {
            text: text,
            sender: user.email,
            timestamp: serverTimestamp()
          })
        scrollToBottom();
    }

    return (
    <>   
        <SideBar/>
        <div className="chatbox" onClick={scrollToBottom}>
            {Messages()}
        </div>
        <form className="input-msg" onSubmit={sendMessage}>
                <input type="text" id="send-input" placeholder="A..." onChange={e => setText(e.target.value)} value={text} />
        </form>

    </> );
}
 
export default Chat;