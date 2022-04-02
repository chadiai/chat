import '../styles/globals.css';
import { AuthProvider } from "../auth";

import { ToastContainer,toast } from "react-toastify";




export default function App({ Component, pageProps: { session, ...pageProps },}){
  return (
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
  )
}