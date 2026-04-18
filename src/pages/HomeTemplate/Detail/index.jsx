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
