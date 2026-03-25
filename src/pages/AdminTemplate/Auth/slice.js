import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../../services/api"

const userAdmin = localStorage.getItem("USER_ADMIN");
const data = userAdmin ? JSON.parse(userAdmin) : null;

const initialState = {
    loading: false,
    data,
    error: null,
};

export const actLogin = createAsyncThunk(
    "auth",
    async (user, { rejectWithValue }) => {
        try {
            const result = await api.post("QuanLyNguoiDung/DangNhap", user);

            /**
             * kiểm tra loại người dùng
             *  - Nếu khách hàng => prevent
             *  - Nếu quản trị => allow login
             */
            const role = result.data.content.maLoaiNguoiDung;
            if (role === "KhachHang") {
                return rejectWithValue({
                    response: {
                        data: {
                            content: "Bạn không có quyền truy cập vào trang này",
                        },
                    },
                });
            }
            // Lưu trạng thái Login xuống Local Storage
            localStorage.setItem("USER_ADMIN", JSON.stringify(result.data.content));

            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const loginSlice = createSlice({
    name: "loginSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(actLogin.pending, (state) => {
            state.loading = true;
            state.data = null,
                state.error = null;
        });
        builder.addCase(actLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(actLogin.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
    }
})

export default loginSlice.reducer;