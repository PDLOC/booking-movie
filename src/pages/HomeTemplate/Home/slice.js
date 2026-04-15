import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "./../../../services/api"

const initialState = {
    loading: false,
    data: null,
    error: null,
};
// fetching data: middleware
export const fetchData = createAsyncThunk(
    "homeMovie/fetchData",
    // rejectWithValue dùng để call error xong axios
    async (__, { rejectWithValue }) => {
        try {
            const result = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01")
            return result.data.content;
        } catch (err) {
            return rejectWithValue(err);
        }
    });

const homeSlice = createSlice({
    name: "homeSlice",
    initialState,
    reducers: {

    },
    // bắt 3 trạng thái: pending, success, reject
    extraReducers: (builder) => {
        // trạng thái pending
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });
        //trạng thái thành công
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        // trạng thái lỗi
        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
    },
});


export default homeSlice.reducer;