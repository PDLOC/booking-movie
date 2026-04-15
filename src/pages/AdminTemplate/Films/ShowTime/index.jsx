import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchCinema, actAddShowTime } from "./slice"
import { fetchCumRap } from "./cumRapSlice"
import { format } from "date-fns";


export default function ShowTime() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.showTimeReducer);
    const { data: cumRap } = useSelector(state => state.cumRapReducer);
    const { cinema, detail } = data || {};

    const [showTime, setShowTime] = useState({
        maPhim: id,
        ngayChieuGioChieu: "",
        maRap: "",
        giaVe: 0,
    });

    useEffect(() => {
        dispatch(fetchCinema(id));
    }, [id]);

    const handleChangeHeThongRap = (e) => {
        const maHeThongRap = e.target.value;
        if (maHeThongRap) {
            dispatch(fetchCumRap(maHeThongRap));
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === "ngayChieuGioChieu" && value) {
            const date = new Date(value);
            const now = new Date();
            date.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
            newValue = format(date, "dd/MM/yyyy HH:mm:ss");
        }
        setShowTime((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actAddShowTime(showTime))
            .unwrap()
            .then(() => {
                console.log("Dữ liệu tạo lịch chiếu:", showTime);
                alert("Thêm lịch chiếu thành công!");
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="container">
            <div className="text-center">
                <h1 className="text-lg mb-5">Tạo lịch chiếu: <span className="font-bold">{detail?.tenPhim}</span></h1>
                <img src={detail?.hinhAnh} alt={detail?.tenPhim} className="mx-auto w-40 mb-5" />

                <form onSubmit={handleSubmit}>

                    <div className="flex gap-5 mb-5">
                        <div className="w-1/3 text-end">
                            <p className="mb-2 leading-10">Chọn rạp chiếu:</p>
                        </div>
                        <div className="w-2/3 text-start">
                            <select
                                onChange={handleChangeHeThongRap}
                                className="block w-100 px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                                <option value="">Chọn hệ thống rạp</option>
                                {cinema?.map((item) => (
                                    <option key={item.maHeThongRap} value={item.maHeThongRap}>
                                        {item.tenHeThongRap}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-5 mb-5">
                        <div className="w-1/3 text-end">
                            <p className="mb-2 leading-10">Cụm rạp:</p>
                        </div>
                        <div className="w-2/3 text-start">
                            <select
                                name="maRap"
                                onChange={handleOnChange}
                                className="block w-100 px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                                <option value="">Chọn cụm rạp</option>
                                {cumRap?.map((item) => (
                                    <option key={item.maCumRap} value={item.maCumRap}>
                                        {item.tenCumRap}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-5 mb-5">
                        <div className="w-1/3 text-end ">
                            <p className="mb-2 leading-10">Chọn ngày chiếu:</p>
                        </div>
                        <div className="w-2/3 text-start">
                            <input
                                name="ngayChieuGioChieu"
                                onChange={handleOnChange}
                                type="date" className="block w-100 px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" />
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="w-1/3 text-end ">
                            <p className="mb-2 leading-10">Giá vé:</p>
                        </div>
                        <div className="w-2/3 text-start">
                            <input
                                name="giaVe"
                                onChange={handleOnChange}
                                type="number" className="block w-100 px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${loading ? 'bg-gray-400' : 'bg-amber-500 hover:bg-amber-600'} text-white  box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 mt-5 focus:outline-none cursor-pointer hover:transition hover:ease-in-out duration-200`}
                    >
                        {loading ? "Đang xử lý..." : "Thêm lịch chiếu"}
                    </button>
                    {error && (<div className="flex items-start sm:items-center p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft w-70 mx-auto my-5" role="alert">
                        <p className="font-medium me-1">{error}</p>
                    </div>)}
                </form>


            </div>
        </div >
    )
}
