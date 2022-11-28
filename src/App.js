import './App.css';
import Header from "./components/Header";
import Login from "./components/Login";
import { Route, Routes} from "react-router-dom";
import ProtectedRoutes from "./components/utils/ProtectedRoutes";
import { ToastContainer } from 'react-toastify';
import AddCourse from "./components/AddCourses";

function App() {

    return (
        <>
            <ToastContainer/>
            <Header />
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/addCourse" element={<AddCourse />}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;