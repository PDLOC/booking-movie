import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Movie({ movie }) {

    const data = movie || [];
    const phimDangChieu = data?.filter(item => item.dangChieu);
    const phimSapChieu = data?.filter(item => item.sapChieu);

    const renderMovie = (listMovie) => {
        return (
            <Slider {...settings}>
                {listMovie?.map((item) => (
                    <div key={item.maPhim} className="px-2">
                        <div className="text-center">
                            <img
                                className="w-[80%] mx-auto aspect-2/3 object-cover rounded-lg hover:scale-105 transition duration-300"
                                src={item.hinhAnh}
                                alt={item.biDanh}
                            />
                            <h5
                                title={item.tenPhim}
                                className="mt-3 mb-4 text-sm font-semibold line-clamp-2 h-5">
                                {item.tenPhim}
                            </h5>
                            <div className="mb-5 grid lg:grid-cols-2 md:grid-cols-1 gap-4">
                                <Link
                                    to={`/detail/${item.maPhim}`}
                                    className="bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-800 duration-300"
                                >
                                    Xem chi tiết
                                </Link>
                                <Link
                                    to={`/detail/${item.maPhim}`}
                                    className="bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-800 duration-300"
                                >
                                    🎟 Mua vé
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        )
    };

    const settings = {
        dots: false,
        infinite: data.length > 4,
        speed: 500,
        slidesToShow: Math.min(4, data.length),
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    return (
        <div>
            <div className="slider-container w-full my-5">
                <h1 className="relative text-4xl uppercase text-center my-10 font-bold after:content-[''] after:block after:w-50 after:h-1 after:bg-amber-400 after:mx-auto after:mt-3">
                    Phim đang chiếu
                </h1>
                {renderMovie(phimDangChieu)}
            </div>
            <div className="slider-container w-full my-5">
                <h1 className="relative text-4xl uppercase text-center my-10 font-bold after:content-[''] after:block after:w-50 after:h-1 after:bg-amber-400 after:mx-auto after:mt-3">
                    Phim sắp chiếu
                </h1>
                {renderMovie(phimSapChieu)}
            </div>
        </div>
    );
}