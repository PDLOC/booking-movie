import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailMovie } from "./slice"
import { format, set } from "date-fns"
import Schedule from "../Schedule";

export default function Detail() {
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;
    const { loading, data } = useSelector(state => state.detailMovieReducer);
    const { detail, schedule } = data || {};

    console.log(schedule);

    const [showTrailer, setShowTrailer] = useState(false);
    const getEmbedUrl = (url) => {
        if (!url) return "";
        return url.replace("watch?v=", "embed/");
    }

    useEffect(() => {
        dispatch(fetchDetailMovie(id));
    }, []);


    if (loading) return <p>Loading...</p>

    return (
        <div className="container mx-auto">
            <div className=" flex mt-10">
                <div className="w-2/5">
                    <img className="w-1/2 ml-auto aspect-2/3 object-cover" src={detail?.hinhAnh} alt={detail?.biDanh} />
                </div>
                <div className="w-3/5 ml-8">
                    <h2 className="text-3xl mb-8 font-bold text-yellow-300 uppercase">{detail?.tenPhim}</h2>
                    <div className="my-auto">
                        <p className="text-justify pr-60 mb-4"><span className="font-bold">Mô tả:</span> {detail?.moTa}</p>
                        <p><span className="font-bold mb-4">Ngày chiếu: </span>{detail?.ngayKhoiChieu && format(new Date(detail?.ngayKhoiChieu), "dd/MM/yyyy")}</p>
                        <p><span className="font-bold">Đánh giá:</span> {detail?.danhGia}/10</p>
                        <div className="mt-4 mb-15">
                            <a
                                onClick={() => setShowTrailer(true)}
                                className="bg-blue-500 text-white font-bold text-center mr-3 px-4 py-2 rounded hover:bg-blue-700 hover:transition-all hover:ease-in duration-300 cursor-pointer">
                                Xem trailer
                            </a>

                            <a className="bg-amber-500 text-white font-bold text-center px-4 py-2 rounded hover:bg-amber-700 hover:transition-all hover:ease-in duration-300 cursor-pointer">
                                <i className="fa-solid fa-ticket rotate-150" /> Đặt vé
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto mt-10">
                <Schedule schedule={schedule} />
            </div>
            {showTrailer && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="relative w-[80%] h-[80%] bg-black rounded">
                        <button
                            onClick={() => setShowTrailer(false)}
                            className="absolute top-2 right-2 py-2 px-3 rounded-base bg-gray-800 opacity-20 text-white text-2xl cursor-pointer hover:opacity-60 transition-all ease-in-out duration-200"
                        >
                            ✕
                        </button>

                        <iframe
                            className="w-full h-full"
                            src={getEmbedUrl(detail?.trailer)}
                            title="Trailer"
                            allowFullScreen
                        />
                    </div>

                </div>
            )}
        </div>
    )
}
