import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../../../services/api";

const initialState = {
    loading: false,
    data: null,
    error: null,
}

export const fetchCinema = createAsyncThunk(
    "showTime/fetchCinema",
    async (id, { rejectWithValue }) => {
        try {
            const [resultCinema, resultDetail, resultCumRap] = await Promise.all([
                api.get("QuanLyRap/LayThongTinHeThongRap"),
                api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`),
            ]);
            const result = {
                cinema: resultCinema.data.content,
                detail: resultDetail.data.content,
            }

            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const actAddShowTime = createAsyncThunk(
    "showTime/actAddShowTime",
    async (showTime, { rejectWithValue }) => {
        try {
            const result = await api.post("QuanLyDatVe/TaoLichChieu", showTime);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error.response.data.content);
        }
    }
);

const showTimeSlice = createSlice({
    name: "showTime",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCinema.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCinema.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchCinema.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });


        // Add Showtime
        builder.addCase(actAddShowTime.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(actAddShowTime.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(actAddShowTime.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default showTimeSlice.reducer;