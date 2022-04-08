import SideBar from "../../components/Sidebar";
import { useRouter } from "next/router"

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
    
    const router = useRouter();
    const { id } = router.query;
    

    return (
    <>   
        <SideBar/>
        <Chatbox/>
    </> );
}
 
export default Chat;