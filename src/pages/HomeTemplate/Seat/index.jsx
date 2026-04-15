import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeat, bookingTicket } from "../ListSeat/slice";

export default function Seat({ maLichChieu }) {
    const { loading, data } = useSelector(state => state.seatReducer);
    const dispatch = useDispatch();
    const [danhSachGhe, setDanhSachGhe] = useState([]);
    const [gheDangChon, setGheDangChon] = useState([]);

    useEffect(() => {
        dispatch(fetchSeat(maLichChieu));
    }, []);

    useEffect(() => {
        if (data) {
            setDanhSachGhe(data.danhSachGhe);
        }
    }, [data]);

    const handleChonGhe = (ghe) => {
        const index = gheDangChon.findIndex((g) => g.maGhe === ghe.maGhe);
        if (index === -1) {
            setGheDangChon([...gheDangChon, ghe]);
        } else {
            setGheDangChon(gheDangChon.filter((g) => g.maGhe !== ghe.maGhe));
        }

    };

    const handleDatVe = () => {
        const ticket = {
            maLichChieu: maLichChieu,
            danhSachVe: gheDangChon.map(ghe => ({
                maGhe: ghe.maGhe,
                giaVe: ghe.giaVe
            }))
        };

        dispatch(bookingTicket(ticket))
            .unwrap()
            .then(result => {
                alert("Đặt vé thành công!");
                dispatch(fetchSeat(maLichChieu));
                setGheDangChon([]);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });

        for (const ghe of gheDangChon) {
            const gheIndex = danhSachGhe.findIndex((g) => g.maGhe === ghe.maGhe);
            const row = gheIndex % 16;

            if (row === 1) {
                const gheNgoaiCung = danhSachGhe[gheIndex - 1];
                if (gheNgoaiCung && !gheNgoaiCung.daDat && !gheDangChon.some(g => g.maGhe === gheNgoaiCung.maGhe)) {
                    alert(`Không được để trống ghế ngoài cùng ${gheNgoaiCung.tenGhe} khi đã chọn ghế ${ghe.tenGhe}.`);
                    return;
                }
            }

            if (row === 14) {
                const gheNgoaiCung = danhSachGhe[gheIndex + 1];
                if (gheNgoaiCung && !gheNgoaiCung.gheIndex && !gheDangChon.some(g => g.maGhe === gheNgoaiCung.maGhe)) {
                    alert(`Không được để trống ghế ngoài cùng ${gheNgoaiCung.tenGhe} khi đã chọn ghế ${ghe.tenGhe}.`);
                    return;
                }
            }
        }
    };

    const tongTien = gheDangChon.reduce((acc, ghe) => acc + ghe.giaVe, 0);

    if (loading) return <div className="text-white text-center">Đang tải phòng vé...</div>;

    return (
        <div className="flex gap-5">
            <div className="w-3/4">
                <div className="bg-white screen text-black text-center py-2 mb-2 rounded fill-gray-200 drop-shadow-2xl drop-shadow-gray-300"></div>
                <p className="text-center opacity-50">MÀN HÌNH</p>
                <div className="grid grid-cols-16 gap-2 justify-center">
                    {danhSachGhe.map((ghe) => {
                        const isSelected = gheDangChon.some(g => g.maGhe === ghe.maGhe);
                        const isVip = ghe.loaiGhe === "Vip";

                        return (
                            <button
                                key={ghe.maGhe}
                                disabled={ghe.daDat}
                                onClick={() => handleChonGhe(ghe)}
                                className={`w-8 h-8 text-xs rounded transition font-semibold
                                    ${ghe.daDat ? "bg-red-600 cursor-not-allowed text-white" :
                                        isSelected ? "bg-yellow-400 text-gray-950k" :
                                            isVip ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-950"}
                                `}
                            >
                                {ghe.tenGhe}
                            </button>
                        );
                    })}
                </div>

                <div className="flex gap-6 mt-6">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gray-100 rounded"></div>
                        Ghế trống
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-orange-500 rounded"></div>
                        Ghế VIP
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-yellow-400 rounded"></div>
                        Đang chọn
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-red-600 rounded"></div>
                        Đã đặt
                    </div>
                </div>
            </div>

            <div className="w-1/4 bg-[#1e293b] p-5 rounded shadow sticky top-5 h-fit">

                <h2 className="text-xl font-bold mb-4">Thông tin vé</h2>

                {data && data.thongTinPhim && (
                    <div className="mb-4 space-y-1">
                        <h3 className="text-2xl text-green-500 font-bold uppercase">{data.thongTinPhim.tenPhim}</h3>
                        <p className="text-white"><span className="text-gray-400">Rạp:</span> {data.thongTinPhim.tenCumRap} - {data.thongTinPhim.tenRap}</p>
                        <p className="text-white"><span className="text-gray-400">Ngày chiếu:</span> {data.thongTinPhim.ngayChieu}</p>
                        <p className="text-white"><span className="text-gray-400">Giờ chiếu:</span> <span className="text-amber-400 font-bold">{data.thongTinPhim.gioChieu}</span></p>
                    </div>
                )}

                <div className="mb-3">
                    <p className="text-gray-400">Ghế đã chọn:</p>
                    <p className="text-yellow-400">
                        {gheDangChon.map(g => g.tenGhe).join(", ") || "Chưa chọn"}
                    </p>
                </div>

                <div className="mb-5">
                    <p className="text-gray-400">Tổng tiền:</p>
                    <p className="text-green-400 text-lg font-bold">
                        {tongTien.toLocaleString()} VNĐ
                    </p>
                </div>

                <button
                    onClick={handleDatVe}
                    disabled={gheDangChon.length === 0}
                    className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-500 py-2 rounded cursor-pointer"
                >
                    Đặt vé
                </button>
            </div>
        </div >
    );
}