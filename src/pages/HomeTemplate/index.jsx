import { Outlet } from "react-router-dom";
import Header from "./_components/Header"
import Footer from "./_components/Footer"
export default function HomeTemplate() {
    return (
        <div className="h-full bg-fixed bg-[#0f172a] text-white">
            <div className="absolute w-100 h-100 bg-purple-600 opacity-30 blur-[120px] -top-25 -left-25"></div>

            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}
