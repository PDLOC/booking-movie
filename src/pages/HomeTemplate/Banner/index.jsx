import { useEffect } from "react"
import { fetchBanner } from "./slice"
import { useSelector, useDispatch } from "react-redux"
import { initCarousels } from "flowbite";


export default function Banner() {
    const dispatch = useDispatch();
    const { loading, data } = useSelector((state) => state.bannerReducer);
    useEffect(() => {
        dispatch(fetchBanner());
    }, []);

    useEffect(() => {
        if (data) {
            initCarousels();
        }
    }, [data]);

    if (loading) return <p>Loading...</p>

    return (
        <div id="default-carousel" className="relative sm:max-w-screen mx-0 lg:mx-40" data-carousel="slide">
            <div className="relative w-full min-h-130 overflow-hidden rounded-base">
                {data?.map((banner, index) => {
                    return (<div key={banner.maBanner} className="duration-700 ease-in-out" data-carousel-item={index === 0 ? "active" : ""}>
                        <img src={banner.hinhAnh} className="absolute w-full h-full object-fit" />
                    </div>);
                })}
            </div>
            <div className="absolute z-30 flex bottom-5 left-1/2 -translate-x-1/2 space-x-3">
                {data?.map((__, index) => {
                    return (<button key={index} type="button" className="w-3 h-3 rounded-base" data-carousel-slide-to={index} />);
                })}
            </div>
            <button type="button" className="absolute top-0 inset-s-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-5 h-5 text-white rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7" /></svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" className="absolute top-0 inset-e-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-5 h-5 text-white rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7" /></svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
}
