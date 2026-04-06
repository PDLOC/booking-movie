import { useState, useEffect } from "react"
import { actUpdateUser } from './../slice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, loading, error } = useSelector(state => state.addUserReducer);
    const [user, setUser] = useState({
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "GP01",
        maLoaiNguoiDung: "",
        hoTen: "",
    });

    // Tìm thông tin người dùng từ danh sách khi component mount hoặc id thay đổi
    useEffect(() => {
        if (id && data?.items) {
            const foundUser = data.items.find(item => item.taiKhoan === id);
            if (foundUser) {
                setUser({
                    ...foundUser,
                    maNhom: foundUser.maNhom || "GP01"
                });
            }
        }
    }, [id, data]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };
    const handleUpdateUser = (e) => {
        e.preventDefault();
        dispatch(actUpdateUser(user))
            .unwrap()
            .then(() => {
                navigate("/admin/list-user");
            })
            .catch((err) => {
                console.error("Lỗi cập nhật:", err);
            });
    }

    return (
        <div className="ms-10">
            <h1 className="text-lg pb-3 uppercase font-bold">Cập nhật người dùng</h1>
            <form className="max-w-sm mt-5" onSubmit={handleUpdateUser}>
                {error && (
                    <div className="flex items-start sm:items-center p-4 mb-4 text-sm text-red-800 rounded-base bg-red-50" role="alert">
                        <p className="font-medium me-1">{error.response?.data?.content || "Có lỗi xảy ra"}</p>
                    </div>
                )}
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Tài khoản</label>
                    <input value={user.taiKhoan} disabled onChange={handleOnChange} name="taiKhoan"
                        type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập tài khoản" />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Mật khẩu</label>
                    <input value={user.matKhau} onChange={handleOnChange} name="matKhau"
                        type="password" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Nhập mật khẩu" />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Email</label>
                    <input value={user.email} onChange={handleOnChange} name="email"
                        type="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập email" />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Họ tên</label>
                    <input value={user.hoTen} onChange={handleOnChange} name="hoTen"
                        type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập họ tên" />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Số điện thoại</label>
                    <input value={user.soDt} onChange={handleOnChange} name="soDt"
                        type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập số điện thoại" />
                </div>
                <div className="mb-5">
                    <label htmlFor="countries" className="block mb-2.5 text-sm font-medium text-heading">Chọn loại người dùng</label>
                    <select value={user.maLoaiNguoiDung} onChange={handleOnChange} name="maLoaiNguoiDung" id="countries" className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                        <option value="">Chọn loại người dùng</option>
                        <option value="KhachHang">Khách hàng</option>
                        <option value="QuanTri">Quản trị</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`${loading ? 'bg-gray-400' : 'bg-amber-500 hover:bg-amber-600'} text-white box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 mt-5 focus:outline-none cursor-pointer hover:transition hover:ease-in-out duration-200`}
                >
                    {loading ? "Đang cập nhật..." : "Cập nhật người dùng"}
                </button>
            </form>
        </div>

    )
}
