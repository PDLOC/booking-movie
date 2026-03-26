import React from 'react'


export default function Register() {
    return (
        <form className="max-w-sm mx-auto mb-10 text-white" >
            <h1 className="relative text-4xl uppercase text-center my-5 font-bold after:content-[''] after:block after:w-50 after:h-1 after:bg-amber-400 after:mx-auto after:mt-3">
                Đăng ký
            </h1>
            {/* {error && (<div className="flex items-start sm:items-center p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
            <p className="font-medium me-1">{error.response.data.content}</p>
        </div>)} */}
            <div className="mb-5">
                <label htmlFor="" className="block mb-2.5 text-sm font-medium ">Tài khoản</label>
                <input name="taiKhoan"
                    type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập tài khoản" />

            </div>
            <div className="mb-5">
                <label htmlFor="" className="block mb-2.5 text-sm font-medium ">Mật khẩu</label>
                <input name="matKhau"
                    type="password" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Nhập mật khẩu" />
            </div>
            <div className="mb-5">
                <label htmlFor="" className="block mb-2.5 text-sm font-medium ">Email</label>
                <input name="email"
                    type="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập email" />
            </div>
            <div className="mb-5">
                <label htmlFor="" className="block mb-2.5 text-sm font-medium ">Số điện thoại</label>
                <input name="soDt"
                    type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập số điện thoại" />
            </div>

            <div className="mb-5">
                <label htmlFor="" className="block mb-2.5 text-sm font-medium">Họ tên</label>
                <input name="hoTen"
                    type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Vui lòng nhập họ tên" />
            </div>
            <button
                type="submit"
                className="text-white bg-none box-border border border-gray-100 hover:border-amber-400 hover:text-amber-400 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none hover:transition hover:ease-in-out duration-200"
            >
                Đăng ký
            </button>
        </form>
    )
}

