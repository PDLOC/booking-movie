import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api"

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async ({ page, pageSize }, { rejectWithValue }) => {
        try {
            const result = await api.get(`QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const actAddUser = createAsyncThunk(
    "user/actAddUser",
    async (user, { rejectWithValue }) => {
        try {
            const result = await api.post("QuanLyNguoiDung/ThemNguoiDung", user);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const actUpdateUser = createAsyncThunk(
    "user/actUpdateUser",
    async (user, { rejectWithValue }) => {
        try {
            const result = await api.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", user);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const actDeleteUser = createAsyncThunk(
    "user/actDeleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const result = await api.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${id}`);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

const addUserSlice = createSlice({
    name: "addUserSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // Create User
        builder.addCase(actAddUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(actAddUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(actAddUser.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });

        // Update User
        builder.addCase(actUpdateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(actUpdateUser.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(actUpdateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Delete User
        builder.addCase(actDeleteUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(actDeleteUser.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(actDeleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Fetch User
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
    },
});

export default addUserSlice.reducer;