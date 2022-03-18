import '../styles/globals.css';
import Layout from '../components/Layout';
import { AuthProvider } from "../auth";




export default function App({ Component, pageProps: { session, ...pageProps },}){
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}