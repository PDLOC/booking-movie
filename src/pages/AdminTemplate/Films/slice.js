import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../../services/api";

const initialState = {
    loading: false,
    data: null,
    filmDetail: null,
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

export const fetchFilmDetail = createAsyncThunk(
    "film/fetchFilmDetail",
    async (id, { rejectWithValue }) => {
        try {
            const result = await api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const actAddFilm = createAsyncThunk(
    "film/actAddFilm",
    async (film, { rejectWithValue }) => {
        try {
            const result = await api.post("QuanLyPhim/ThemPhimUploadHinh", film, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return result.data.content;
        } catch (error) {
            console.log("Lỗi từ sever:", error.response.data);
            return rejectWithValue(error.response.data.content || error.message);
        }
    },
);

export const actDeleteFilm = createAsyncThunk(
    "film/actDeleteFilm",
    async (id, { rejectWithValue }) => {
        try {
            const result = await api.delete(`QuanLyPhim/XoaPhim?MaPhim=${id}`);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error.response?.data?.content || "Có lỗi xảy ra khi xóa phim");
        }
    },
);

export const actUpdateFilm = createAsyncThunk(
    "film/actUpdateFilm",
    async (film, { rejectWithValue }) => {
        try {
            const result = await api.post("QuanLyPhim/CapNhatPhimUpload", film, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return result.data.content;
        } catch (error) {
            console.log("Lỗi từ sever:", error.response.data);
            return rejectWithValue(error.response.data.content || error.message);
        }
    },
);


const FilmSlice = createSlice({
    name: "FilmSlice",
    initialState,
    reducers: {
        searchFilm: (state, action) => {
            const removeAccents = (str) => {
                if (!str) return "";
                return str.toLowerCase()
                    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
                    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
                    .trim();
            };

            const searchTerm = removeAccents(action.payload);
            const keywords = searchTerm.split(/\s+/).filter(word => word.length > 0);
            const updateFilm = [...state.data?.items] || [];
            if (updateFilm) {
                state.data.items = updateFilm.filter(film => {
                    const normalizedTitle = removeAccents(film.tenPhim);
                    return keywords.every(keyword => normalizedTitle.includes(keyword));
                });
            }
        }
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

        builder.addCase(fetchFilmDetail.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchFilmDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.filmDetail = action.payload;
        });
        builder.addCase(fetchFilmDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // add phim
        builder.addCase(actAddFilm.pending, state => {
            state.loading = true;
            // state.data = null;
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

        // update phim
        builder.addCase(actUpdateFilm.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(actUpdateFilm.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(actUpdateFilm.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});
export const { searchFilm } = FilmSlice.actions;
export default FilmSlice.reducer;