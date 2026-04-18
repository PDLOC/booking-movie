import { useState } from "react"
import { actAddUser } from '../slice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

export default function AddUser() {
    const dispatch = useDispatch();
    const negative = useNavigate();
    const { loading, error } = useSelector(state => state.addUserReducer);
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "GP01",
        maLoaiNguoiDung: "",
        hoTen: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };
    const handleAddUser = (e) => {
        e.preventDefault();
        dispatch(actAddUser(user))
            .unwrap()
            .then(() => {
                negative("/admin/list-user");
                console.log("Thêm mới thành công");

            })
            .catch(
                (err) => {
                    console.log(err);
                }
            );
    }

    return (
        <div className="ms-10">
            <h1 className="text-lg pb-3 uppercase font-bold">Thêm người dùng</h1>
            <form className="max-w-sm mt-5" onSubmit={handleAddUser}>
                {error && (<div className="flex items-start sm:items-center p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                    <p className="font-medium me-1">{error.response?.data?.content || error.message || "Đã có lỗi xảy ra"}</p>
                </div>)}
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Tài khoản</label>
                    <input onChange={handleOnChange} name="taiKhoan"
                        type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập tài khoản" />

                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Mật khẩu</label>
                    <div className="relative">
                        <input onChange={handleOnChange} name="matKhau"
                            type={showPassword ? "text" : "password"} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Nhập mật khẩu" />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </button>
                    </div>
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Email</label>
                    <input onChange={handleOnChange} name="email"
                        type="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập email" />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Họ tên</label>
                    <input onChange={handleOnChange} name="hoTen"
                        type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập họ tên" />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Số điện thoại</label>
                    <input onChange={handleOnChange} name="soDt"
                        type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập số điện thoại" />
                </div>
                <div className="mb-5">
                    <label htmlFor="countries" className="block mb-2.5 text-sm font-medium text-heading">Chọn loại người dùng</label>
                    <select onChange={handleOnChange} name="maLoaiNguoiDung" id="countries" className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                        <option value="">Chọn loại người dùng</option>
                        <option value="KhachHang">Khách hàng</option>
                        <option value="QuanTri">Quản trị</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="text-white bg-amber-500 box-border border border-transparent hover:bg-amber-600 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 mt-5 focus:outline-none cursor-pointer hover:transition hover:ease-in-out duration-200"
                >
                    Thêm người dùng
                </button>
            </form>
        </div>

    )
}
