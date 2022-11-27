import { Outlet, Navigate } from 'react-router-dom';

const useAuth = () => {
    //THIS is VULNERABLE  to improve this you will need to
    //1. Get userinfo if present
    //2. Get user id,email and password form local storage and match it with backend data
    const Info = localStorage.getItem('courseUserInfo');
    return Info;
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    console.log(isAuth)

    return isAuth ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoutes;