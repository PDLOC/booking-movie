import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../../services/api"

const userAdmin = localStorage.getItem("USER_ADMIN");
const data = userAdmin ? JSON.parse(userAdmin) : null;

const initialState = {
    loading: false,
    data,
    error: null,
};

export const actLoginHome = createAsyncThunk(
    "login",
    async (user, { rejectWithValue }) => {
        try {
            const result = await api.post("QuanLyNguoiDung/DangNhap", user);
            localStorage.setItem("USER_ADMIN", JSON.stringify(result.data.content));
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const loginHomeSlice = createSlice({
    name: "loginHomeSlice",
    initialState,
    reducers: {
        setLoginHomeData: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actLoginHome.pending, (state) => {
            state.loading = true;
            state.data = null,
                state.error = null;
        });
        builder.addCase(actLoginHome.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(actLoginHome.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
    }
})
export const { setLoginHomeData } = loginHomeSlice.actions;
export default loginHomeSlice.reducer;