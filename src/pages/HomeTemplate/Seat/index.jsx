import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeat } from "../ListSeat/slice";

export default function Seat({ maLichChieu }) {
    const { loading, data, error } = useSelector(state => state.seatReducer);
    const dispatch = useDispatch();

    const [danhSachGhe, setDanhSachGhe] = useState([]);
    const [gheDangChon, setGheDangChon] = useState([]);

    // 🔥 Lấy danh sách ghế
    useEffect(() => {
        fetch(`https://movieapi.cyberlearn.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
            .then(res => res.json())
            .then(data => {
                setDanhSachGhe(data.content.danhSachGhe);
            });
    }, [maLichChieu]);

    // 🎯 Chọn ghế
    const handleChonGhe = (ghe) => {
        if (ghe.daDat) return;

        const index = gheDangChon.findIndex(g => g.maGhe === ghe.maGhe);

        if (index !== -1) {
            const newList = [...gheDangChon];
            newList.splice(index, 1);
            setGheDangChon(newList);
        } else {
            setGheDangChon([...gheDangChon, ghe]);
        }
    };

    // 💰 Tổng tiền
    const tongTien = gheDangChon.reduce((total, ghe) => total + ghe.giaVe, 0);

    // 🚀 Đặt vé
    const handleDatVe = () => {
        const data = {
            maLichChieu,
            danhSachVe: gheDangChon.map(ghe => ({
                maGhe: ghe.maGhe,
                giaVe: ghe.giaVe
            }))
        };

        fetch("https://movieapi.cyberlearn.vn/api/QuanLyDatVe/DatVe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer YOUR_TOKEN"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                alert("Đặt vé thành công!");
                setGheDangChon([]);
            });
    };

    return (
        <div className="flex gap-5">
            <div className="w-3/4">
                <div className="bg-white screen text-black text-center py-2 mb-2 rounded fill-gray-200 drop-shadow-2xl drop-shadow-gray-300"></div>
                <p className="text-center opacity-50">MÀN HÌNH</p>

                {/* Danh sách ghế */}
                <div className="grid grid-cols-16 gap-2 justify-center">
                    {danhSachGhe.map((ghe) => {
                        const isSelected = gheDangChon.some(g => g.maGhe === ghe.maGhe);

                        return (
                            <button
                                key={ghe.maGhe}
                                onClick={() => handleChonGhe(ghe)}
                                className={`w-8 h-8 text-xs rounded transition
                                    ${ghe.daDat ? "bg-gray-500 cursor-not-allowed" : ""}
                                    ${isSelected ? "bg-yellow-400 text-black" : "bg-green-500"}
                                `}
                            >
                                {ghe.tenGhe}
                            </button>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex gap-6 mt-6">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-500 rounded"></div>
                        Ghế trống
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-yellow-400 rounded"></div>
                        Đang chọn
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gray-500 rounded"></div>
                        Đã đặt
                    </div>
                </div>
            </div>

            {/* 💳 RIGHT: THÔNG TIN ĐẶT VÉ */}
            <div className="w-1/4 bg-[#1e293b] p-5 rounded shadow sticky top-5 h-fit">

                <h2 className="text-xl font-bold mb-4">Thông tin vé</h2>

                <div className="mb-3">
                    <p className="text-gray-400">Mã lịch chiếu:</p>
                    <p>{maLichChieu}</p>
                </div>

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
                    className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-500 py-2 rounded"
                >
                    Đặt vé
                </button>
            </div>
        </div>
    );
}