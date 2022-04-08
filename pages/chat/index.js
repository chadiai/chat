import React, {useEffect} from 'react';
import { useAuth } from "../../auth";
import { useRouter } from "next/router";
import SideBar from '../../components/Sidebar';


function chat() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user == false) {
            router.push("/")
        }
    }, [user]);

    return (
        <> {!user || user == null  ? ( <></> ) : (<SideBar></SideBar>)} </>
    )
}

export default chat;