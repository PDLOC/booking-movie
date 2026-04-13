import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react";
import logo from "./../../../../assets/logo.jfif"

export default function Header() {
    const { data } = useSelector(state => state.loginHomeReducer);
    const [dropDown, setDropDown] = useState(false);
    const handleDropDown = () => {
        setDropDown(prev => !prev);
    }

    const handleLogOut = () => {
        localStorage.removeItem("USER_ADMIN");
        window.location.reload();
    }

    return (
        <nav className="bg-neutral-primary w-full z-20 top-0 inset-s-0 border-b border-default">
            <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-15" alt="logo" />
                    <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">Movie Booking Ticket</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" /></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? `text-blue-500` : `block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent`} aria-current="page">Trang chủ</NavLink>
                        </li>
                        <li>
                            <NavLink to="about" className={({ isActive }) => isActive ? `text-blue-500` : `block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent`}>Giới thiệu</NavLink>
                        </li>
                        <li>
                            <NavLink to="list-movie" className={({ isActive }) => isActive ? `text-blue-500` : `block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent`}>Danh sách phim</NavLink>
                        </li>
                        <li>
                            {
                                !data ? (
                                    <NavLink to="login" className={({ isActive }) => isActive ? `text-blue-500` : `block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent cursor-pointer`}>Đăng nhập</NavLink>
                                ) : (
                                    <>
                                        <div className="relative">
                                            <button onClick={handleDropDown}
                                                className="flex items-center cursor-pointer justify-between w-full py-2 px-3 rounded font-medium text-heading md:w-auto hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0"
                                                id="dropdownNvbarButton" data-dropdown-toggle="dropdownNavbar">
                                                {data.hoTen}
                                                <svg className={`w-4 h-4 ms-1.5 transition-transform ${dropDown ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" /></svg>
                                            </button>
                                            <div id="dropdownNavbar" className={`z-99 ${dropDown ? "block" : "hidden"} absolute top-full left-0 mt-2 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44`}>
                                                <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownNvbarButton">
                                                    {data.maLoaiNguoiDung === "QuanTri" && (
                                                        <li>
                                                            <NavLink to="admin/list-user" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
                                                                Quản trị
                                                            </NavLink>
                                                        </li>
                                                    )}
                                                    <li>
                                                        <NavLink to="profile" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
                                                            Thông tin tài khoản
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <button
                                                            onClick={handleLogOut}
                                                            className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
                                                            Đăng xuất
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                )

                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}
