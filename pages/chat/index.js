import React, {useEffect} from 'react';
import { useAuth } from "../../auth";
import { useRouter } from "next/router";
import SideBar from '../../components/Sidebar';


function Chat() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user == false) {
            router.push("/")
        }
    }, [user]);

    return (
        <> {!user || user == null  ? ( <></> ) : (<><SideBar></SideBar>
                                                    <div className='chatbox'>
                                                        <h1>Add/select a user to start chatting</h1>

                                                    </div>
                                                    </>)} </>
    )
}

export default Chat;