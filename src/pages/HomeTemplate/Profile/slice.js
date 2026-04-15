import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../../services/api";

const initialState = {
    loading: false,
    data: null,
    error: null,
}

export const fetchDetail = createAsyncThunk(
    "profile/fetchDetail",
    async (user, { rejectWithValue }) => {
        try {
            const result = await api.post("QuanLyNguoiDung/ThongTinTaiKhoan", user);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const actUpdateProfile = createAsyncThunk(
    "profile/updateProfile",
    async (user, { rejectWithValue }) => {
        try {
            const result = await api.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", user);
            return result.data.content;

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);



const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchDetail.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(fetchDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(fetchDetail.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });

        builder.addCase(actUpdateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(actUpdateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(actUpdateProfile.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });

    }
});


export default profileSlice.reducer;