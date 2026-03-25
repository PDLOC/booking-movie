import { Outlet } from "react-router-dom"
import Header from "./_components/Header"
import Footer from "./_components/Footer"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export default function AdminTemplate() {
    const { data } = useSelector(state => state.loginReducer);

    if (!data) {
        return <Navigate to="/auth" />
    }

    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div >
    )
}
