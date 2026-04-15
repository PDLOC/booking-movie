import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import { Pagination } from 'antd';
import { fetchFilms, actDeleteFilm, searchFilm } from "./slice"
import { useNavigate } from "react-router-dom"

export default function Film() {
    const { data, loading, error } = useSelector(state => state.filmReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const { items, totalCount } = data || {};

    const handleAddFilm = () => {
        navigate("/admin/add-film");
    }


    useEffect(() => {
        dispatch(fetchFilms({ page: currentPage, pageSize }));
    }, [currentPage]);

    const handleDelete = (id, e) => {
        e.preventDefault();
        dispatch(actDeleteFilm(id))
            .unwrap()
            .then(() => {
                dispatch(fetchFilms({ page: currentPage, pageSize }));
                console.log("Xóa thành công");
            })
            .catch(
                (err) => {
                    console.log(err);
                }
            );
    }

    const handleUpdateFilm = (id) => {
        navigate(`/admin/update-film/${id}`);
    }


    const handleShowTime = (id) => {
        navigate(`/admin/showtime/${id}`);
    }

    const handleSearch = (e) => {
        const { name, value } = e.target;
        if (value.trim()) {
            dispatch(searchFilm(value));
        } else {
            dispatch(fetchFilms({ page: currentPage, pageSize }));
        }
    }


    const renderListFilms = () => {
        return items?.map((item) => {
            return (
                <tr key={item?.maPhim} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">

                    <td className="w-4 p-4">
                        <div className="flex items-center">
                            <input id="table-checkbox-25" type="checkbox" defaultValue className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" />
                        </div>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                        {item?.maPhim}
                    </th>
                    <td className="px-6 py-4">
                        <img src={item?.hinhAnh} alt={item?.biDanh} />

                    </td>
                    <td className="px-6 py-4">
                        {item?.tenPhim}
                    </td>
                    <td className="px-6 py-4">
                        {item?.moTa}
                    </td>

                    <td className="px-6 py-4 flex">
                        <button
                            onClick={() => handleUpdateFilm(item?.maPhim)}
                            type="button" className="bg-amber-500 box-border border border-transparent hover:bg-amber-600 focus:ring-1 focus:ring-amber-600 shadow-xs font-medium rounded-base text-sm px-3 py-2 cursor-pointer focus:outline-none hover:transition hover:ease-in-out duration-300">
                            <i className="fa-solid fa-pen-to-square text-white" />
                        </button>
                        <div className="ml-2">
                            <button
                                onClick={(e) => handleDelete(item?.maPhim, e)}
                                type="button" className="bg-red-500 box-border border border-transparent hover:bg-red-600 focus:ring-1 focus:ring-red-600 shadow-xs font-medium rounded-base text-sm px-3 py-2 cursor-pointer focus:outline-none hover:transition hover:ease-in-out duration-300">
                                <i className="fa-solid fa-trash text-white" />
                            </button>
                        </div>
                        <div className="ml-2">
                            <button
                                onClick={() => handleShowTime(item?.maPhim)}
                                type="button" className="bg-blue-500 box-border border border-transparent hover:bg-blue-600 focus:ring-1 focus:ring-red-600 shadow-xs font-medium rounded-base text-sm px-3 py-2 cursor-pointer focus:outline-none hover:transition hover:ease-in-out duration-300">
                                <i class="fa-solid fa-calendar text-white"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div>
            <div className="flex">
                <h1 className="text-lg pb-3 uppercase font-bold">Quản lý phim</h1>
                <div className="ml-auto flex">
                    <div>
                        <button
                            onClick={handleAddFilm}
                            type="button" className="text-white cursor-pointer bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs rounded-base text-sm px-3 py-2 focus:outline-none mb-4">
                            <i className="fa-solid fa-user-plus text-white" />
                        </button>
                    </div>

                </div>
            </div>
            <div className="relative bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                <div className="p-4 flex items-center justify-between space-x-4">
                    <label htmlFor="input-group-1" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                        </div>
                        <input onChange={handleSearch}
                            type="text" id="input-group-1" className="block w-full max-w-96 ps-9 pe-3 py-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Tìm kiếm" />
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-body">
                    <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-t border-default-medium">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="table-checkbox-20" type="checkbox" defaultValue className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" />
                                    <label htmlFor="table-checkbox-20" className="sr-only">Table checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Mã phim
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Hình ảnh
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Tên phim
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Mô tả
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderListFilms()}
                    </tbody>
                </table>
                <div className="py-4 flex justify-center border-t border-default-medium">
                    <Pagination
                        align="center"
                        current={currentPage}
                        total={totalCount || 0}
                        pageSize={pageSize}
                        onChange={(page) => {
                            setCurrentPage(page);
                        }}
                        showSizeChanger={false}
                    />
                </div>
            </div>
        </div>
    )
}
