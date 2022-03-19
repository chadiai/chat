import { toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";


const Chat = () => {
    const auth = getAuth();
    const router = useRouter();

    const logout = async () => {
        signOut(auth)
        .then(() => {
            router.push("/");
        })
        .catch((error) => {
            toast.error(error.message);
        });
    };
    //send user input
    function send() {
      var usermsg = document.getElementById("send-input").value;
      var senddiv = document.querySelector(".user-input");
      senddiv.style.display = "block";
      senddiv.innerHTML = usermsg; 
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
    <div class="chatbox">
      <div class="input-msg">
        <input type="text" id="send-input" placeholder="type something"/>
      </div>
    </div>
  </div>
    </> );
}
 
export default Chat;