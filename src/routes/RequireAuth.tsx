import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user!);

    if(!userData || !userData.token || !userData.role.includes("Admin")) {
        return <Navigate to="/login" />
    }

    return <Outlet/>
}

export default RequireAuth