import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
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
            // const result = await axios({
            //     method: "GET",
            //     url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
            //     headers: {
            //         TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MiIsIkhldEhhblN0cmluZyI6IjE4LzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTY4OTYwMDAwMCIsIm5iZiI6MTc2MTMyNTIwMCwiZXhwIjoxNzg5ODM3MjAwfQ.wzN71RMWnzxytkHIOECJCmKqVyDD-AylZWuEairOdiM"
            //     }
            // });
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