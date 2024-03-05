import { Outlet, Navigate } from "react-router-dom"; //Outlet is what we want to return if there is a user (will put out whatever page or screen we are trying to load)
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const { userInfo } = useSelector((state)=> state.auth);
  return userInfo? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
// replace is to replace any past history