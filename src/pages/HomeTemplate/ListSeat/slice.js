import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api"

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const fetchSeat = createAsyncThunk(
    "ListSeat/fetchSeat",
    async (id, { rejectWithValue }) => {
        try {
            const result = await api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`);
            return result.data.content;

        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

const SeatSlice = createSlice({
    name: "SeatSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchSeat.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(fetchSeat.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(fetchSeat.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
    }
});

export default SeatSlice.reducer;

