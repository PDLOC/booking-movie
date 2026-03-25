import { useEffect } from "react"
import { fetchData } from "./slice"
import { useSelector, useDispatch } from "react-redux"
import Banner from "./../Banner"
import Movie from "./../_components/Movie"
export default function Home() {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.homeReducer);
    useEffect(() => {
        dispatch(fetchData());
    }, []);

    /**
     * Call từ reducer
     */

    const renderListMovie = () => {
        if (data) {
            return <Movie key={data.maPhim} movie={data} />
        }
    }

    if (loading) return <p>Loading...</p>

    return (
        <>
            <Banner />
            <div className="container w-4/5 mx-auto mt-5">
                {renderListMovie()}
            </div>
        </>
    )
}
