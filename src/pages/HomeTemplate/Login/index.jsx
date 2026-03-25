import { useState } from "react";

export default function Login() {
    // state handle form login
    const [user, setUser] = useState({
        taiKhoan: "",
        matKhau: "",
    });

    // state handle validation form
    const [errors, setErrors] = useState({
        taiKhoan: "",
        matKhau: "",
    });

    //disable button login
    const isDisabled = (!user.taiKhoan || !user.matKhau) || (errors.taiKhoan || errors.matKhau);

    const handleOnChange = (event) => {
        /**
         * event.target (input): đại diện cho thẻ input đang được thao tác
         * 
         * event.target.value: lấy value từ input
         */
        const { name, value } = event.target;
        setUser({
            ...user,// giữ lại các giá trị cũ của user
            [name]: value, // cập nhật lại những giá trị mới cho thuộc tính có tên là name
        });
    };

    const handleLogin = (event) => {
        // Chặn hành vi tải lại trang của form
        event.preventDefault();

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


        // handlee validation cho taiKhoan va matKhau
        switch (name) {
            case "taiKhoan":
                if (value.trim() && value.trim().length < 4) {
                    mess = "Tài khoản phải có ít nhất 4 ký tự"
                }
                break;
            case "matKhau":
                const letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
                if (value.trim() && !value.trim().match(letter)) {
                    mess = "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
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
    console.log("user", user);
    console.log("errors", errors);



    return (
        <div className="text-white">
            <h1 className="relative text-4xl uppercase text-center my-10 font-bold after:content-[''] after:block after:w-50 after:h-1 after:bg-amber-400 after:mx-auto after:mt-3">
                Đăng nhập
            </h1>
            <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-md font-medium">Tài khoản</label>
                    <input onBlur={validateForm} onChange={handleOnChange} name="taiKhoan"
                        type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập tài khoản" />
                    {errors.taiKhoan && (<div className="flex items-start sm:items-center p-4 mb-4 mt-2 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                        <p className="font-medium me-1">{errors.taiKhoan}</p>
                    </div>)}
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-md font-medium text-white">Mật khẩu</label>
                    <input onBlur={validateForm} onChange={handleOnChange} name="matKhau"
                        type="password" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Nhập mật khẩu" />
                    {errors.matKhau && (<div className="flex items-start sm:items-center p-4 mb-4 mt-2 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                        <p className="font-medium me-1">{errors.matKhau}</p>
                    </div>)}
                </div>
                <button
                    disabled={isDisabled}
                    type="submit"
                    className={`${isDisabled ? "disabled:opacity-50 mb-10 text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" : "text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"}`}
                >
                    Đăng nhập
                </button>
            </form>
        </div>
    )
}
