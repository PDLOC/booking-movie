import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actLogin } from "./slice"
import { Navigate } from "react-router-dom";

export default function Auth() {
    const { loading, data, error } = useSelector(state => state.loginAdminReducer)
    const dispatch = useDispatch();

    // state handle form login
    const [user, setUser] = useState({
        taiKhoan: "",
        matKhau: "",
    });

    const [errors, setErrors] = useState({
        taiKhoan: "",
        matKhau: "",
    });

    const isDisabled = (!user.taiKhoan || !user.matKhau) || (errors.taiKhoan || errors.matKhau);

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,// giữ lại các giá trị cũ của user
            [name]: value, // cập nhật lại những giá trị mới cho thuộc tính có tên là name
        });
    };

    /**
     * Kiểm tra nếu data tồn tại => chuyển hướng tới admintemplate
     */
    if (data) {
        return <Navigate to="/admin/list-user" />
    }

    const handleLogin = (event) => {
        // Chặn hành vi tải lại trang của form
        event.preventDefault();
        // dispatch tới API LOGIN
        dispatch(actLogin(user));
    }

    const validateForm = (event) => {
        const { name, value } = event.target;
        let errorName = name;
        if (errorName === "taiKhoan") {
            errorName = "tài khoản";
        } else if (errorName === "matKhau") {
            errorName = "mật khẩu";
        }

        let mess = value.trim() === "" ? `Vui lòng nhập trường ${errorName}` : "";

        // handlee validation cho taiKhoan va matKhau
        switch (name) {
            case "taiKhoan":
                if (value.trim() && value.trim().length < 4) {
                    mess = "Tài khoản phải có ít nhất 4 ký tự"
                }
                break;
            // case "matKhau":
            //     const letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
            //     if (value.trim() && !value.trim().match(letter)) {
            //         mess = "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
            //     }
            //     break;
            default:
                break;
        }

        setErrors({
            ...errors,
            [name]: mess,
        });
    }

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <form className="max-w-sm mx-auto mt-10" onSubmit={handleLogin}>
                {error && (<div className="flex items-start sm:items-center p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                    <p className="font-medium me-1">{error.response.data.content}</p>
                </div>)}
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Tài khoản</label>
                    <input onBlur={validateForm} onChange={handleOnChange} name="taiKhoan"
                        type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập tài khoản" />
                    {errors.taiKhoan && (<div className="flex items-start sm:items-center p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                        <p className="font-medium me-1">{errors.taiKhoan}</p>
                    </div>)}
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Mật khẩu</label>
                    <input onBlur={validateForm} onChange={handleOnChange} name="matKhau"
                        type="password" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Nhập mật khẩu" />
                    {errors.matKhau && (<div className="flex items-start sm:items-center p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                        <p className="font-medium me-1">{errors.matKhau}</p>
                    </div>)}
                </div>
                <button
                    disabled={isDisabled}
                    type="submit"
                    className={`${isDisabled ? "disabled:opacity-50 text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" : "text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"}`}
                >
                    Login
                </button>
            </form>
        </div>
    )
}
