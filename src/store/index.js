import { configureStore } from "@reduxjs/toolkit"
import homeReducer from "../pages/HomeTemplate/Home/slice"
import detailMovieReducer from "../pages/HomeTemplate/Detail/slice"
import loginReducer from "../pages/AdminTemplate/Auth/slice"
import bannerReducer from "../pages/HomeTemplate/Banner/slice"
import seatReducer from "../pages/HomeTemplate/ListSeat/slice"

const store = configureStore({
    reducer: {
        homeReducer,
        detailMovieReducer,
        loginReducer,
        bannerReducer,
        seatReducer,
    }
})

export default store;