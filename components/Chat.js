import { toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";


const Chat = () => {
    const auth = getAuth();

    const logout = async () => {
        signOut(auth)
        .catch((error) => {
            toast.error(error.message);
        });
    };

    function send() {
      var usermsg = document.getElementById("send-input").value;
      var senddiv = document.querySelector(".user-input");
      senddiv.style.display = "block";
      senddiv.textContent = usermsg; 
    }
    

    return (
    <> 
    <div className="chat">        
        <div className="navbar"><a onClick={logout}>Sign out</a></div>
        <div className="preview" >
            <form id="searchform"> 
            <input type="search" id="search" name="search" placeholder="Search..."/>
            </form>
            <div >
                <div id="friend-username">
                    <span id="name">user1</span>
                    <span id="lastmsg">last message</span>
                </div>
            </div>
            <div>
                <div id="friend-username">
                    <span id="name">user2</span>
                    <span id="lastmsg">last message</span>
                </div>
            </div>
            <div>
                <div id="friend-username">
                    <span id="name">user3</span>
                    <span id="lastmsg">last message</span>
                </div>
            </div>
            <div>
                <div id="friend-username">
                    <span id="name">user4</span>
                    <span id="lastmsg">last message</span>
                </div>
            </div>
            <div>
                <div id="friend-username">
                    <span id="name">user5</span>
                    <span id="lastmsg">last message</span>
                </div>
            </div>
                <div>
                <div id="friend-username">
                    <span id="name">user6</span>
                    <span id="lastmsg">last message</span>
                </div>
            </div>
        </div>
        <div className="chatbox">
            <div className="user-input">
                    messages
            </div>
            <div className="input-msg">
                <textarea type="text" id="send-input" placeholder="type something" />
            </div>
        </div>
  </div>
    </> );
}
 
export default Chat;