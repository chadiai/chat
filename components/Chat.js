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

    return ( <div className="navbar"><a onClick={logout}>Sign out</a></div>  );
}
 
export default Chat;