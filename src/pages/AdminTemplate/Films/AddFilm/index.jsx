import { useState, useRef } from "react"
import { actAddFilm } from '../slice';
import { Switch } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function AddFilm() {
    const dispatch = useDispatch();
    const negative = useNavigate();
    const { loading, error } = useSelector(state => state.filmReducer);
    const [imgSrc, setImgSrc] = useState("");
    const fileInputRef = useRef(null);
    const [film, setFilm] = useState({
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

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        setFilm((prevFilm) => ({
            ...prevFilm,
            [name]: value,
        }));
    };

    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result);
            };
            setFilm((prevFilm) => ({
                ...prevFilm,
                hinhAnh: file,
            }));
        }
    };

    const handleRemoveImg = () => {
        setImgSrc("");
        setFilm((prevFilm) => ({
            ...prevFilm,
            hinhAnh: null,
        }));
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


    const handleAddFilm = (e) => {
        e.preventDefault();
        if (!film.hinhAnh) {
            console.log("Vui lòng chọn hình ảnh cho phim");
            return;
        }
        let formData = new FormData();
        formData.append("tenPhim", film.tenPhim);
        formData.append("trailer", film.trailer);
        formData.append("moTa", film.moTa);
        formData.append("ngayKhoiChieu", format(new Date(film.ngayKhoiChieu), "dd/MM/yyyy"));
        formData.append("maNhom", film.maNhom);
        formData.append("hot", String(film.hot));
        formData.append("sapChieu", String(film.sapChieu));
        formData.append("dangChieu", String(film.dangChieu));
        formData.append("danhGia", String(film.danhGia));
        formData.append("biDanh", createSlug(film.tenPhim));
        formData.append("File", film.hinhAnh, film.hinhAnh.name);

        dispatch(actAddFilm(formData))
            .unwrap()
            .then(() => {
                negative("/admin/list-films");
                console.log("Thêm mới thành công");

            })
            .catch(
                (err) => {
                    console.log(err);
                }
            );

        console.log(film);

    };


    return (
        <div className="ms-10">
            <h1 className="text-lg pb-3 uppercase font-bold">Thêm phim</h1>
            <form className="max-w-sm mt-5" onSubmit={handleAddFilm}>
                {error && (<div className="flex items-start sm:items-center p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                    <p className="font-medium me-1">{error}</p>
                </div>)}
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Tên phim</label>
                    <input onChange={handleOnChange} name="tenPhim"
                        type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" />

                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Trailer</label>
                    <input onChange={handleOnChange} name="trailer"
                        type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Mô tả</label>
                    <input onChange={handleOnChange} name="moTa"
                        type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Ngày chiếu</label>
                    <input onChange={handleOnChange} name="ngayKhoiChieu"
                        type="date" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Đang Chiếu</label>
                    <Switch
                        onChange={(checked) => handleOnChange({ target: { name: "dangChieu", value: checked } })}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Sắp chiếu</label>
                    <Switch
                        onChange={(checked) => handleOnChange({ target: { name: "sapChieu", value: checked } })}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">HOT</label>
                    <Switch
                        onChange={(checked) => handleOnChange({ target: { name: "hot", value: checked } })}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2.5 text-sm font-medium text-heading">Số sao</label>
                    <input onChange={handleOnChange} name="danhGia" min={1} max={10}
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
                    type="submit"
                    className="text-white bg-amber-500 box-border border border-transparent hover:bg-amber-600 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 mt-5 focus:outline-none cursor-pointer hover:transition hover:ease-in-out duration-200"
                >
                    Thêm phim
                </button>
            </form>
        </div>

    )
}
