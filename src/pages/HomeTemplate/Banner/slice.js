import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api"

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const fetchBanner = createAsyncThunk(
    "banner/fetchBanner",
    async (__, { rejectWithValue }) => {
        try {
            const result = await api.get("QuanLyPhim/LayDanhSachBanner");
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    });

const bannerSlice = createSlice({
    name: "bannerSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchBanner.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });

        builder.addCase(fetchBanner.fulfilled, (state, action) => {
            state.loading = null;
            state.data = action.payload;
            state.error = null;
        });

        builder.addCase(fetchBanner.rejected, (state, action) => {
            state.loading = null;
            state.data = null;
            state.error = action.payload;
        });
    }
});

export default bannerSlice.reducer;

