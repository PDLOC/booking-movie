import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

const initialState = {
    loading: false,
    data: null,
    error: null,
}

export const actRegister = createAsyncThunk(
    "register",
    async (user, { rejectWithValue }) => {
        try {
            const result = await api.post("QuanLyNguoiDung/DangKy", user);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const registerSlice = createSlice({
    name: "registerSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(actRegister.pending, state => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(actRegister.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(actRegister.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
    }
});



export default registerSlice.reducer;