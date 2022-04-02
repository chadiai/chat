import { getFirestore } from "firebase/firestore";
import firebaseClient from "./firebaseClient";


const app = firebaseClient();

export const db = getFirestore(app);