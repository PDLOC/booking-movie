import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "./../../../services/api";

const initialState = {
    loading: false,
    data: null,
    error: null,
}

export const fetchFilms = createAsyncThunk(
    "film/fetchFilms",
    async ({ page, pageSize }, { rejectWithValue }) => {
        try {
            const result = await api.get(`QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const actAddFilm = createAsyncThunk(
    "film/addFilm",
    async (film, { rejectWithValue }) => {
        try {
            const result = await api.post("QuanLyPhim/ThemPhimUploadHinh", film);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);


const FilmSlice = createSlice({
    name: "FilmSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchFilms.pending, state => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(fetchFilms.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(fetchFilms.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });

        // add phim
        builder.addCase(actAddFilm.pending, state => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(actAddFilm.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(actAddFilm.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default FilmSlice.reducer;