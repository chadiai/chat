import React, {useEffect} from 'react';
import { useAuth } from "../auth";
import Chat from '../components/Chat';
import { useRouter } from "next/router";


function chat() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user == false) {
            router.push("/")
        }
    }, [user]);

    return (
        <> {!user || user == null  ? ( <></> ) : (<Chat></Chat>)} </>
    )
}

export default chat;