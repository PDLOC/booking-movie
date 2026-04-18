import { useEffect, useState } from "react";
import { fetchSeat } from "./../ListSeat/slice"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

export default function Schedule({ schedule }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data } = useSelector((state) => state.loginHomeReducer);

    const [activeTab, setActiveTab] = useState(null);

    const heThongRapChieu = schedule?.heThongRapChieu || [];

    useEffect(() => {
        if (heThongRapChieu.length > 0) {
            setActiveTab(heThongRapChieu[0].maHeThongRap);
        }
    }, [schedule]);

    return (
        <div className="md:flex md:mx-auto">
            <ul className="flex-colum space-y-4 text-sm font-medium text-body md:me-4 mb-4 md:mb-0">
                {heThongRapChieu.map((rap) => (
                    <li key={rap.maHeThongRap} className="flex justify-center my-6">
                        <button
                            onClick={() => setActiveTab(rap.maHeThongRap)}
                            className={`w-[80%] flex justify-center ${activeTab === rap.maHeThongRap
                                ? "opacity-100"
                                : "opacity-50"
                                }`}
                        >
                            <img
                                src={rap.logo}
                                alt={rap.tenHeThongRap}
                                className="w-26 h-26 object-contain"
                            />
                        </button>
                    </li>
                ))}
            </ul>

            <div className="w-full my-auto mb-10 ml-10">
                {heThongRapChieu.map((rap) =>
                    activeTab === rap.maHeThongRap ? (
                        <div
                            key={rap.maHeThongRap}
                            className="p-6 bg-gray-700 rounded-xl"
                        >
                            <h3 className="text-xl font-bold mb-6 text-yellow-300 border-b border-gray-500 pb-2">
                                {rap.tenHeThongRap}
                            </h3>
                            {rap.cumRapChieu.map((cumRap) => (
                                <div key={cumRap.maCumRap} className="mb-6">
                                    <p className="text-white font-semibold mb-3 text-base">
                                        {cumRap.tenCumRap}
                                    </p>

                                    <div className="grid grid-cols-6 gap-4">
                                        {cumRap.lichChieuPhim.map((lich) => (
                                            <Link
                                                key={lich.maLichChieu}
                                                to={`/ticket/${lich.maLichChieu}`}
                                                onClick={(e) => {
                                                    if (!data) {
                                                        e.preventDefault();
                                                        navigate("/login");
                                                    } else {
                                                        dispatch(fetchSeat(lich.maLichChieu));
                                                    }
                                                }}
                                                className="text-white border border-white rounded-lg px-4 py-2 hover:border-yellow-400 hover:text-yellow-400 transition duration-200 cursor-pointer"
                                            >
                                                {new Date(
                                                    lich.ngayChieuGioChieu
                                                ).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
}