import React from "react";
import { useNavigate } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const headersData = [
    // {
    //   label: "Listings",
    //   href: "/listings",
    // },
    // {
    //   label: "Mentors",
    //   href: "/mentors",
    // },
    // {
    //   label: "My Account",
    //   href: "/account",
    // },
    {
        label: "Log Out",
        href: "/logout",
    },
];

function getStyles() {
    return {
        header: {
            backgroundColor: "#FFF",
            paddingRight: "79px",
            paddingLeft: "118px",
        },
        toolbar: {
            display: "flex",
            justifyContent: "space-between",
        },
        menuButton: {
            fontFamily: "Open Sans, sans-serif",
            fontWeight: 700,
            size: "18px",
            marginLeft: "38px",
            color: "black"
        },
        logo : {
            fontFamily: "Open Sans, sans-serif",
            fontWeight: 700,
            size: "18px",
            marginLeft: "38px",
            color: "black"
        }
    }};

function Header(){
    let navigate = useNavigate();
    const { header, logo, menuButton, toolbar } = getStyles();

    const userInfo = localStorage.getItem('courseUserInfo');

    const displayDesktop = () => {
        return (
            <Toolbar style={toolbar}>
                {femmecubatorLogo}
                {userInfo && <div>{getMenuButtons()}</div>}
            </Toolbar>
        );
    };

    const femmecubatorLogo = (
        <Typography variant="h6" component="h1" style={logo}>
            <img src="/sunriselogo.png" height={50} width={80} style={{marginRight: "15px"}}/>
            Academic ERP
        </Typography>
    );

    const getMenuButtons = () => {

        return (
            <Button
                style= {menuButton}
                onClick={handleLogout}
                color = "primary"
            >
                Logout
            </Button>
        );

    };

    const handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem('courseUserInfo');
        navigate('/');
    }
    return (
        <div>
            {/* <h2 className="text-center mt-2">Academic ERP</h2>
            <h3 onClick={handleLogout}>Logout</h3> */}
            <AppBar style={header}>{displayDesktop()}</AppBar>
        </div>
    );
}

export default Header;