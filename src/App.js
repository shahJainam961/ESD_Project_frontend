import './App.css';
import {Button, Col, Container, Row} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import AdminLogin from "./components/AdminLogin";
import Header from "./components/Header";
import Login from "./components/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState} from "react";

function App() {

    const buttonHandler = () =>{
        toast.success('Course added successfully', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    };

    const [user, setUser] = useState(null)
    return (
         <>
             <Header />
             <Routes>
                 <Route path="/" element={<Login />}/>
                 <Route path="/addCourse" element={<AdminLogin />}/>
             </Routes>
        </>
    );
}

export default App;
