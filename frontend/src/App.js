import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom"; // outlet for the react router
import { ToastContainer } from "react-toastify"; //show a message if we get wrong email address in the login
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header";
import Footer from "./components/Footer";



const App = () => {
  return (
    <>
    <Header />
    <main className="py-3">
      <Container>
        <Outlet />
      </Container>
    </main>
    <Footer />
    <ToastContainer />
    
    </>
  )
}

export default App
