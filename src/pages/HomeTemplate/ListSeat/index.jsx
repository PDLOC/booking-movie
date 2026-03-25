import Seat from "./../Seat"
import { useParams } from "react-router-dom"
export default function ListSeat() {

    const { id } = useParams();

    return (
        <div className="min-h-screen w-2/3 mx-auto text-white p-5">
            <h1 className="relative text-4xl uppercase text-center my-5 font-bold after:content-[''] after:block after:w-50 after:h-1 after:bg-amber-400 after:mx-auto after:mt-3">
                Đặt vé
            </h1>
            <Seat maLichChieu={id} />
        </div>
    )
}
