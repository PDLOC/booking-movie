import { actUpdateFilm, fetchFilmDetail } from "./../slice"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Switch } from "antd"
import { format } from "date-fns";

export default function UpdateFilm() {
    const { id } = useParams();
    const { filmDetail, loading, error } = useSelector(state => state.filmReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imgSrc, setImgSrc] = useState("");
    const fileInputRef = useRef(null);
    const [film, setFilm] = useState({
        maPhim: 0,
        tenPhim: "",
        trailer: "",
        moTa: "",
        ngayKhoiChieu: "",
        maNhom: "GP01",
        hot: false,
        sapChieu: false,
        dangChieu: false,
        hinhAnh: null,
        danhGia: 1,
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchFilmDetail(id));
        }
    }, [id]);

    useEffect(() => {
        if (filmDetail) {
            setFilm({
                ...filmDetail,
                // Định dạng ngày về YYYY-MM-DD để hiển thị lên input type="date"
                ngayKhoiChieu: filmDetail.ngayKhoiChieu
                    ? format(new Date(filmDetail.ngayKhoiChieu), "yyyy-MM-dd")
                    : "",
            });
            setImgSrc(filmDetail.hinhAnh);
        }
    }, [filmDetail]);


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFilm({
            ...film,
            [name]: value,
        });
    }

    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result);
            };
            setFilm({
                ...film,
                hinhAnh: file,
            });
        }
    }

    const handleRemoveImg = () => {
        setImgSrc("");
        setFilm({
            ...film,
            hinhAnh: null,
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const createSlug = (str) => {
        return str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const handleUpdateFilm = (e) => {
        e.preventDefault();
        let formData = new FormData();

        formData.append("maPhim", id);
        formData.append("tenPhim", film.tenPhim);
        formData.append("trailer", film.trailer);
        formData.append("moTa", film.moTa);
        const formattedDate = film.ngayKhoiChieu ? format(new Date(film.ngayKhoiChieu), "dd/MM/yyyy") : "";
        formData.append("ngayKhoiChieu", formattedDate);
        formData.append("maNhom", film.maNhom);
        formData.append("hot", String(film.hot));
        formData.append("sapChieu", String(film.sapChieu));
        formData.append("dangChieu", String(film.dangChieu));
        formData.append("danhGia", String(film.danhGia));
        formData.append("biDanh", createSlug(film.tenPhim));
        if (film.hinhAnh instanceof File) {
            // fromData hinhAnh cập nhật là File
            formData.append("File", film.hinhAnh, film.hinhAnh.name);
        }
        dispatch(actUpdateFilm(formData))
            .unwrap()
            .then(() => {
                alert("Cập nhật thành công!");
                navigate("/admin/list-films");
            })
            .catch((err) => {
                console.error("Lỗi cập nhật:", err);
            });
    }

    return (
        <div className="ms-10">
            <h1 className="text-lg pb-3 uppercase font-bold">Cập nhật phim</h1>
            <form className="max-w-sm mt-5" onSubmit={handleUpdateFilm}>
                {error && (<div className="flex items-start sm:items-center p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                    <p className="font-medium me-1">{error}</p>
                </div>)}
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Tên phim</label>
                    <input onChange={handleOnChange} name="tenPhim" value={film.tenPhim}
                        type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" />

                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Trailer</label>
                    <input onChange={handleOnChange} name="trailer" value={film.trailer}
                        type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Mô tả</label>
                    <input onChange={handleOnChange} name="moTa" value={film.moTa}
                        type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Ngày chiếu</label>
                    <input onChange={handleOnChange} name="ngayKhoiChieu" value={film.ngayKhoiChieu}
                        type="date" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Đang Chiếu</label>
                    <Switch
                        checked={film.dangChieu}
                        onChange={(checked) => handleOnChange({ target: { name: "dangChieu", value: checked } })}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Sắp chiếu</label>
                    <Switch
                        checked={film.sapChieu}
                        onChange={(checked) => handleOnChange({ target: { name: "sapChieu", value: checked } })}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">HOT</label>
                    <Switch
                        checked={film.hot}
                        onChange={(checked) => handleOnChange({ target: { name: "hot", value: checked } })}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Số sao</label>
                    <input onChange={handleOnChange} name="danhGia" min={1} max={10} value={film.danhGia}
                        type="number" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="" />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Hình ảnh</label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        name="hinhAnh"
                        onChange={handleChangeFile}
                        accept="image/png, image/jpeg, image/jpg , image/gif"
                    />
                    {imgSrc && (
                        <div className="relative mt-2 w-full">
                            <img className="w-full h-full object-cover rounded-base shadow-sm border border-default" src={imgSrc} alt="Preview" />
                            <button
                                type="button"
                                onClick={handleRemoveImg}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors shadow-md"
                            >
                                <i className="fa-solid fa-xmark text-xs"></i>
                            </button>
                        </div>
                    )}
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className={`${loading ? 'bg-gray-400' : 'bg-amber-500 hover:bg-amber-600'} text-white box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 mt-5 focus:outline-none cursor-pointer hover:transition hover:ease-in-out duration-200`}
                >
                    {loading ? "Đang xử lý..." : "Cập nhật phim"}
                </button>
            </form>
        </div>
    )
}
