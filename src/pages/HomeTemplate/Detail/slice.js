import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "./../../../services/api"

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const fetchDetailMovie = createAsyncThunk(
    "detailMovie/fetchDetailMovie",
    async (id, { rejectWithValue }) => {
        try {
            // lấy thông tin chi tiết của phim
            // const resultDetail = await api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);

            // lấy thông tin lịch chiếu phim
            // const resultSchedule = await api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);

            // gọi 1 lần cả 2 API 
            const [resultDetail, resultSchedule] = await Promise.all([
                api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`),
                api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
            ]);
            // gộp 2 result để return
            const result = {
                detail: resultDetail.data.content,
                schedule: resultSchedule.data.content
            }

            return result;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const detailSlice = createSlice({
    name: "detailSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchDetailMovie.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(fetchDetailMovie.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(fetchDetailMovie.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
    },

});

export default detailSlice.reducer;