import { configureStore } from "@reduxjs/toolkit"
import homeReducer from "../pages/HomeTemplate/Home/slice"
import bannerReducer from "../pages/HomeTemplate/Banner/slice"
import loginHomeReducer from "../pages/HomeTemplate/Login/slice"
import registerReducer from "../pages/HomeTemplate/Register/slice"
import seatReducer from "../pages/HomeTemplate/ListSeat/slice"
import detailMovieReducer from "../pages/HomeTemplate/Detail/slice"

import loginAdminReducer from "../pages/AdminTemplate/Auth/slice"
import addUserReducer from "../pages/AdminTemplate/User/slice"
import filmReducer from "../pages/AdminTemplate/Films/slice"
const store = configureStore({
    reducer: {
        homeReducer,
        detailMovieReducer,
        loginHomeReducer,
        registerReducer,
        bannerReducer,
        seatReducer,
        loginAdminReducer,
        addUserReducer,
        filmReducer,
    }
})

export default store;