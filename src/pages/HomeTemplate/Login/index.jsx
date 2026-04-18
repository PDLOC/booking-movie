import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actLoginHome } from "./slice"
import { Navigate, Link, useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

export default function Login() {
    const { loading, data, error } = useSelector(state => state.loginHomeReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // state handle form login
    const [user, setUser] = useState({
        taiKhoan: "",
        matKhau: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    // state handle validation form
    const [errors, setErrors] = useState({
        taiKhoan: "",
        matKhau: "",
    });

    //disable button login
    const isDisabled = (!user.taiKhoan || !user.matKhau) || (errors.taiKhoan || errors.matKhau);

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    useEffect(() => {
        if (data) {
            navigate("/");
        }
    }, [data, navigate]);

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(actLoginHome(user));
    }

    const validateForm = (event) => {
        const { name, value } = event.target;
        let errorName = name;
        if (errorName === "taiKhoan") {
            errorName = "tài khoản";
        } else if (errorName === "matKhau") {
            errorName = "mật khẩu";
        }

        let mess = value.trim() === "" ? `Vui lòng nhập ${errorName}` : "";

        switch (name) {
            case "taiKhoan":
                if (value.trim() && value.trim().length < 4) {
                    mess = "Tài khoản phải có ít nhất 4 ký tự"
                }
                break;
            default:
                break;
        }

        setErrors({
            ...errors,
            [name]: mess,
        });
    }

    if (loading) return <p>Loading....</p>


    return (
        <div className="text-white">
            <h1 className="relative text-4xl uppercase text-center my-10 font-bold after:content-[''] after:block after:w-50 after:h-1 after:bg-amber-400 after:mx-auto after:mt-3">
                Đăng nhập
            </h1>
            <form className="max-w-sm mx-auto mb-15" onSubmit={handleLogin}>
                {error && (<div className="flex items-start sm:items-center p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                    <p className="font-medium me-1">{error.response?.data?.content || error.message || "Đã có lỗi xảy ra"}</p>
                </div>)}
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-md font-medium">Tài khoản</label>
                    <input onBlur={validateForm} onChange={handleOnChange} name="taiKhoan"
                        type="text" className="bg-neutral-secondary-medium border border-default-medium text-gray-900 text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập tài khoản" />
                    {errors.taiKhoan && (<div className="flex items-start sm:items-center p-4 mb-4 mt-2 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                        <p className="font-medium me-1">{errors.taiKhoan}</p>
                    </div>)}
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-md font-medium text-white">Mật khẩu</label>
                    <div className="relative">
                        <input onBlur={validateForm} onChange={handleOnChange} name="matKhau"
                            type={showPassword ? "text" : "password"} className="bg-neutral-secondary-medium border border-default-medium text-gray-900 text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Nhập mật khẩu" />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </button>
                    </div>
                    {errors.matKhau && (<div className="flex items-start sm:items-center p-4 mb-4 mt-2 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                        <p className="font-medium me-1">{errors.matKhau}</p>
                    </div>)}
                </div>
                <div className="flex justify-between">
                    <button
                        disabled={isDisabled}
                        type="submit"
                        className={`${isDisabled ? "disabled:opacity-50  text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" : "text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"}`}
                    >
                        Đăng nhập
                    </button>

                    <Link to="/register" className="text-md hover:text-amber-400 hover:transition-all hover:ease-in-out duration-200">Đăng ký</Link>
                </div>
            </form>
        </div>
    )
}
