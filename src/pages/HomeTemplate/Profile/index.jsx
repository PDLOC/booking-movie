import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetail, actUpdateProfile } from "../Profile/slice"
import { format } from "date-fns"
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Account() {
    const navigate = useNavigate();
    const [tab, setTab] = useState("profile");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector(state => state.profileReducer);
    const userAdmin = localStorage.getItem("USER_ADMIN");
    const user = userAdmin ? JSON.parse(userAdmin) : {};
    const [updateUser, setUpdateUSer] = useState({
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDT: "",
        maNhom: "GP01",
        maLoaiNguoiDung: "",
        hoTen: "",
        loaiNguoiDung: null,
        thongTinDatVe: null,
    });

    useEffect(() => {
        dispatch(fetchDetail(user.taiKhoan));
    }, []);

    useEffect(() => {
        if (data) {
            setUpdateUSer({
                taiKhoan: data.taiKhoan || "",
                matKhau: data.matKhau || "",
                email: data.email || "",
                soDT: data.soDT || "",
                maNhom: data.maNhom || "GP01",
                maLoaiNguoiDung: data.maLoaiNguoiDung || "",
                hoTen: data.hoTen || "",
                loaiNguoiDung: null,
                thongTinDatVe: null,
            });
        }
    }, [data]);

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setUpdateUSer({
            ...updateUser,
            [name]: value,
        });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(actUpdateProfile(updateUser))
            .unwrap()
            .then(() => {
                console.log("Cập nhật thành công");
                localStorage.setItem("USER_ADMIN", JSON.stringify(updateUser));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const allTickets = useMemo(() => {
        return data?.thongTinDatVe?.flatMap((item) => {
            const date = new Date(item.ngayDat);
            const now = new Date();
            date.setHours(now.getHours(), now.getMinutes());
            const newDate = format(date, "dd/MM/yyyy HH:mm");
            const formattedPrice = item.giaVe.toLocaleString("vi-VN");

            return item?.danhSachGhe.map((ghe, index) => (
                <div key={`${item.maVe}-${index}`} className="flex flex-col items-center my-5 bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs md:flex-row md:max-w-2xl mx-auto">
                    <img className="object-cover w-100 rounded-base h-64 md:h-auto md:w-48 mb-4 md:mb-0" src={item.hinhAnh} />
                    <div className="flex flex-col justify-between md:p-4 leading-normal">
                        <div>
                            <h3 className="mb-2 text-xl font-bold tracking-tight text-heading">{item.maVe}</h3>
                            <h3 className="mb-2 text-lg font-bold tracking-tight text-heading">{ghe.tenHeThongRap}</h3>
                            <h2 className="mb-2 text-lg font-bold tracking-tight text-heading">{item.tenPhim}</h2>
                            <p className="mb-6 text-body">Ngày đặt {newDate} - {ghe.tenRap} - Ghế: {ghe.tenGhe}</p>
                            <p className="mb-6 text-body">Giá vé: {formattedPrice} đ</p>
                        </div>
                    </div>
                </div>
            ));
        }) || [];
    }, [data]);

    const displayedTickets = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return allTickets.slice(startIndex, startIndex + pageSize);
    }, [allTickets, currentPage]);

    const renderTabButton = (id, label) => {
        const isActive = tab === id;
        return (
            <li className="" role="presentation">
                <button
                    onClick={() => setTab(id)}
                    className={`inline-block p-4 border-b-2 rounded-t-base transition-colors duration-200 ${isActive
                        ? "text-white border-brand uppercase"
                        : "border-transparent hover:text-fg-brand hover:border-brand text-body"
                        }`}
                    id={`${id}-tab`}
                    type="button"
                    role="tab"
                    aria-controls={id}
                    aria-selected={isActive}
                >
                    {label}
                </button>
            </li>
        );
    };

    if (loading) {
        return (
            <div className="text-center my-10">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>

        )
    }

    if (!userAdmin) {
        navigate("/login");
        return null;
    }

    return (
        <div>
            <div className='container my-10 px-30'>
                <div className="mb-4 border-b border-default">
                    <ul className="flex flex-wrap text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                        {renderTabButton("profile", "THÔNG TIN TÀI KHOẢN")}
                        {renderTabButton("ticket", "LỊCH SỬ ĐẶT VÈ")}
                    </ul>
                </div>
                <div id="default-tab-content">
                    <div className={`${tab === "profile" ? "block" : "hidden"} px-4 py-10 rounded-base bg-neutral-secondary-soft`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <form className="max-w-sm lg:max-w-2xl mx-auto" onSubmit={handleUpdate}>
                            {error && (
                                <div className="flex items-start sm:items-center p-4 mb-4 text-sm text-red-800 rounded-base bg-red-50" role="alert">
                                    <p className="font-medium me-1">{error.response?.data?.content || "Có lỗi xảy ra"}</p>
                                </div>
                            )}
                            <div className='flex gap-5'>
                                <div className="mb-5 w-1/2">
                                    <label htmlFor="email" className="block mb-2.5  text-sm font-medium text-heading">Email</label>
                                    <input
                                        type="email" id="email" name="email"
                                        value={updateUser.email}
                                        disabled
                                        className="bg-neutral-tertiary-soft border border-default-medium text-heading text-sm rounded-base block w-full px-3 py-2.5 shadow-xs opacity-70 cursor-not-allowed" required
                                    />
                                </div>
                                <div className="mb-5 w-1/2">
                                    <label htmlFor="taiKhoan" className="block mb-2.5 text-sm font-medium text-heading">Tài khoản</label>
                                    <input
                                        type="text" id="taiKhoan" name="taiKhoan"
                                        value={updateUser.taiKhoan}
                                        disabled
                                        className="bg-neutral-tertiary-soft border border-default-medium text-heading text-sm rounded-base block w-full px-3 py-2.5 shadow-xs opacity-70 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                            <div className='flex gap-5'>
                                <div className="mb-5 w-1/2">
                                    <label htmlFor="hoTen" className="block mb-2.5 text-sm font-medium text-heading">Họ tên</label>
                                    <input
                                        onChange={handleOnchange}
                                        type="text" id="hoTen" name="hoTen"
                                        value={updateUser.hoTen}
                                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required
                                    />
                                </div>
                                <div className="mb-5 w-1/2">
                                    <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Mật khẩu</label>
                                    <input
                                        onChange={handleOnchange}
                                        type="password" id="password" name="matKhau"
                                        value={updateUser.matKhau}
                                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="phone" className="block mb-2.5 text-sm font-medium text-heading">Số điện thoại</label>
                                <input
                                    onChange={handleOnchange}
                                    type="text" id="phone" name="soDT"
                                    value={updateUser.soDT}
                                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required
                                />
                            </div>
                            <button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Cập nhật thông tin</button>
                        </form>
                    </div>
                    <div className={`${tab === "ticket" ? "block" : "hidden"} px-4 py-10 rounded-base bg-neutral-secondary-soft`} id="ticket" role="tabpanel" aria-labelledby="ticket-tab">
                        {displayedTickets}

                        {allTickets.length > pageSize && (
                            <div className="flex justify-center mt-8">
                                <Pagination
                                    current={currentPage}
                                    pageSize={pageSize}
                                    total={allTickets.length}
                                    onChange={(page) => setCurrentPage(page)}
                                    showSizeChanger={false}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
