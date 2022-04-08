import {  useState, useEffect } from 'react';
import SideBar from "../../components/Sidebar";
import { useRouter } from "next/router"
import { useAuth } from "../../auth";
import { collection, serverTimestamp, addDoc,query,orderBy  } from "firebase/firestore"
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../../firebase/firebaseDatabase";

const Chat = () => {

    const [ id, setId ] = useState()    
    const [text, setText] = useState("");
    const router = useRouter();
    useEffect(()=>{
        if(!router.isReady) return;
        const id  = router.query.documentid;
        setId(id);
    },[router.isReady]);
    const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"))    
    const { user } = useAuth();
    const [messages] = useCollectionData(q);
    
    const Messages = () =>
            messages?.map(msg => {
            const isSender = msg.sender === user.email;
            return (
                <p key={msg.timestamp} className={isSender ? "message-right" : "message-left"} >
                {msg.text} </p>
            )
    });

    const sendMessage = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, `chats/${id}/messages`), {
          text: text,
          sender: user.email,
          timestamp: serverTimestamp()
        })
        setText("");
    }

    useEffect(() => {
        if (user == false) {
            router.push("/")
        }
    }, [user]);

    return (
    <>   
        <SideBar/>
        <div className="chatbox">
                    {Messages()}
            <form className="input-msg" onSubmit={sendMessage}>
                <input type="text" id="send-input" placeholder="A..." onChange={e => setText(e.target.value)} value={text} />
            </form>
        </div>
    </> );
}
 
export default Chat;