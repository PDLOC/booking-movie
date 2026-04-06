import { useDispatch, useSelector } from "react-redux"
import { actRegister } from "./slice"
import { actLoginHome } from "../Login/slice"
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Register() {
    const dispatch = useDispatch();
    const { data, error } = useSelector(state => state.registerReducer);
    const [user, setUser] = useState({
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        hoTen: "",
        maNhom: "GP01",
    });

    const [errors, setErrors] = useState({
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        hoTen: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    }

    const getErrorMessage = (name, value) => {
        const labels = {
            taiKhoan: "tài khoản",
            matKhau: "mật khẩu",
            email: "email",
            soDt: "số điện thoại",
            hoTen: "họ tên",
        };

        const label = labels[name] || name;
        let mess = value.trim() === "" ? `Vui lòng nhập ${label}` : "";

        if (!mess && name === "taiKhoan" && value.trim().length < 4) {
            mess = "Tài khoản phải có ít nhất 4 ký tự";
        }

        if (!mess && name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) mess = "Email không hợp lệ";
        }

        if (!mess && name === "soDt") {
            const phoneRegex = /^[0-9]{10,11}$/;
            if (!phoneRegex.test(value)) mess = "Số điện thoại phải từ 10-11 chữ số";
        }

        return mess;
    };

    const handleRegister = (e) => {
        e.preventDefault();

        let validationErrors = {};
        let isValid = true;

        for (let key in errors) {
            const mess = getErrorMessage(key, user[key]);
            if (mess) {
                validationErrors[key] = mess;
                isValid = false;
            }
        }

        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        dispatch(actRegister(user))
            .unwrap()
            .then(() => {
                // Sau khi đăng ký thành công, tự động gọi api đăng nhập
                dispatch(actLoginHome({ taiKhoan: user.taiKhoan, matKhau: user.matKhau }));
            })
            .catch(() => { }); // Lỗi đăng ký đã được slice xử lý hiển thị ở biến error
    };

    const validateForm = (event) => {
        const { name, value } = event.target;
        const mess = getErrorMessage(name, value);

        setErrors({
            ...errors,
            [name]: mess,
        });
    }


    if (data) {
        return <Navigate to="/" />;
    }

    return (
        <form className="max-w-sm mx-auto mb-10 text-white" onSubmit={handleRegister} >
            <h1 className="relative text-4xl uppercase text-center my-5 font-bold after:content-[''] after:block after:w-50 after:h-1 after:bg-amber-400 after:mx-auto after:mt-3">
                Đăng ký
            </h1>
            {error && (<div className="flex items-start sm:items-center p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                <p className="font-medium me-1">{error.response.data.content}</p>
            </div>)}
            <div className="mb-5">
                <label htmlFor="" className="block mb-2.5 text-sm font-medium ">Tài khoản</label>
                <input name="taiKhoan" value={user.taiKhoan} onChange={handleOnChange} onBlur={validateForm}
                    type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập tài khoản" />
                {errors.taiKhoan && (<div className="flex items-start sm:items-center p-4 mb-4 mt-2 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                    <p className="font-medium me-1">{errors.taiKhoan}</p>
                </div>)}
            </div>
            <div className="mb-5">
                <label htmlFor="" className="block mb-2.5 text-sm font-medium ">Mật khẩu</label>
                <input name="matKhau" value={user.matKhau} onChange={handleOnChange} onBlur={validateForm}
                    type="password" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Nhập mật khẩu" />
                {errors.matKhau && (<div className="flex items-start sm:items-center p-4 mb-4 mt-2 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                    <p className="font-medium me-1">{errors.matKhau}</p>
                </div>)}
            </div>
            <div className="mb-5">
                <label htmlFor="" className="block mb-2.5 text-sm font-medium ">Email</label>
                <input name="email" value={user.email} onChange={handleOnChange} onBlur={validateForm}
                    type="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập email" />
                {errors.email && (<div className="flex items-start sm:items-center p-4 mb-4 mt-2 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                    <p className="font-medium me-1">{errors.email}</p>
                </div>)}
            </div>
            <div className="mb-5">
                <label htmlFor="" className="block mb-2.5 text-sm font-medium ">Số điện thoại</label>
                <input name="soDt" value={user.soDt} onChange={handleOnChange} onBlur={validateForm}
                    type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập số điện thoại" />
                {errors.soDt && (<div className="flex items-start sm:items-center p-4 mb-4 mt-2 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                    <p className="font-medium me-1">{errors.soDt}</p>
                </div>)}
            </div>

            <div className="mb-5">
                <label htmlFor="" className="block mb-2.5 text-sm font-medium">Họ tên</label>
                <input name="hoTen" value={user.hoTen} onChange={handleOnChange} onBlur={validateForm}
                    type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập họ tên" />
                {errors.hoTen && (<div className="flex items-start sm:items-center p-4 mb-4 mt-2 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                    <p className="font-medium me-1">{errors.hoTen}</p>
                </div>)}
            </div>
            <button
                type="submit"
                className="text-white bg-none box-border border border-gray-100 hover:border-amber-400 hover:text-amber-400 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none hover:transition hover:ease-in-out duration-200 cursor-pointer"
            >
                Đăng ký
            </button>
        </form>
    )
}
