import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../../../services/api";

const initialState = {
    loading: false,
    data: null,
    error: null,
}

export const fetchCumRap = createAsyncThunk(
    "cumRap/fetchCumRap",
    async (maHeThongRap, { rejectWithValue }) => {
        try {
            const result = await api.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const cumRapSlice = createSlice({
    name: "cumRapSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCumRap.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(fetchCumRap.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(fetchCumRap.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default cumRapSlice.reducer;