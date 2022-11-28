import './App.css';
import {Button, Col, Container, Row} from "reactstrap";
import AddCourses from "./components/AddCourses";
import Header from "./components/Header";
import Login from "./components/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState} from "react";
import ProtectedRoutes from "./components/utils/ProtectedRoutes";
import { ToastContainer } from 'react-toastify';

function App() {

    return (
        <>
            <ToastContainer/>
            <Header />
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/addCourse" element={<AddCourses />}/>
                </Route>

            </Routes>
        </>
    );
}

export default App;