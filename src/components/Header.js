import React from "react";
import { useNavigate } from 'react-router-dom';

function Header(){
    let navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem('courseUserInfo');
        navigate('/');
    }
    return (
        <div>
            <h2 className="text-center mt-2">Academic ERP</h2>
            <h3 onClick={handleLogout}>Logout</h3>
        </div>
    );
}

export default Header;