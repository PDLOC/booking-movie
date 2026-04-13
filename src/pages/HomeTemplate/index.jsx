import { Outlet } from "react-router-dom";
import Header from "./_components/Header"
import Footer from "./_components/Footer"
export default function HomeTemplate() {
    return (
        <div className="h-full bg-fixed bg-[#0f172a] text-white">

            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}
