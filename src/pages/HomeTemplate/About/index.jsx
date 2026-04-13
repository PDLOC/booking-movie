import React from 'react'
import 'animate.css';
export default function About() {
    const services = [
        { title: "Rạp Chiếu Phim", desc: "Hệ thống âm thanh Dolby Atmos và màn hình đạt chuẩn quốc tế.", icon: "🎬" },
        { title: "Nhà Hát", desc: "Nơi tổ chức các sự kiện nghệ thuật và biểu diễn đặc sắc.", icon: "🎭" },
        { title: "Bowling & Billiards", desc: "Khu vực giải trí sôi động cho nhóm bạn và gia đình.", icon: "🎳" },
        { title: "Kidzone", desc: "Không gian vui chơi an toàn và sáng tạo dành cho trẻ em.", icon: "🎠" },
        { title: "Gym & Fitness", desc: "Phòng tập hiện đại giúp nâng cao sức khỏe mỗi ngày.", icon: "💪" },
        { title: "C'Beer & Restaurant", desc: "Thưởng thức ẩm thực đa dạng và phố bia năng động.", icon: "🍺" },
    ];
    return (
        <div className=" text-white min-h-screen">
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-purple-900/80 to-black/60 z-10"></div>
                <div className="relative z-20 text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-tighter text-amber-400 mb-4  animate__animated animate__pulse animate__infinite animate__slow">
                        Booking Movie
                    </h1>
                    <p className="text-xl md:text-2xl font-light italic text-gray-200">
                        "Rạp chiếu phim trên toàn quốc"
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-16 px-6">
                <div className="text-center mb-20">
                    <h2 className="relative text-3xl md:text-4xl font-bold uppercase mb-8 inline-block after:content-[''] after:block after:w-20 after:h-1 after:bg-amber-400 after:mx-auto after:mt-4">
                        Hệ thống cụm rạp trên toàn quốc
                    </h2>
                    <p className="max-w-4xl mx-auto text-lg leading-relaxed text-body">
                        Cinestar là một trong những hệ thống rạp chiếu phim được yêu thích nhất tại Việt Nam,
                        không chỉ dừng lại ở điện ảnh, chúng tôi mang đến một hệ sinh thái giải trí toàn diện.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    <div className="group p-8 rounded-base bg-neutral-secondary-soft border border-default hover:border-amber-400 transition-all duration-300 hover:-translate-y-2 shadow-lg">
                        <div className="text-4xl mb-6"></div>
                        <h3 className="text-xl font-bold text-amber-400 mb-3 uppercase">Hồ Chí Minh</h3>
                        <p className="text-body text-sm leading-relaxed">
                            Hệ thống âm thanh Dolby Atmos và màn hình đạt chuẩn quốc tế.
                        </p>
                    </div>
                    <div className="group p-8 rounded-base bg-neutral-secondary-soft border border-default hover:border-amber-400 transition-all duration-300 hover:-translate-y-2 shadow-lg">
                        <div className="text-4xl mb-6"></div>
                        <h3 className="text-xl font-bold text-amber-400 mb-3 uppercase">Hà Nội</h3>
                        <p className="text-body text-sm leading-relaxed">
                            Hệ thống âm thanh Dolby Atmos và màn hình đạt chuẩn quốc tế.
                        </p>
                    </div>
                    <div className="group p-8 rounded-base bg-neutral-secondary-soft border border-default hover:border-amber-400 transition-all duration-300 hover:-translate-y-2 shadow-lg">
                        <div className="text-4xl mb-6"></div>
                        <h3 className="text-xl font-bold text-amber-400 mb-3 uppercase">Đà Nẵng</h3>
                        <p className="text-body text-sm leading-relaxed">
                            Hệ thống âm thanh Dolby Atmos và màn hình đạt chuẩn quốc tế.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-600 py-12 text-center">
                <h3 className="text-neutral-primary text-2xl font-bold mb-6 uppercase">Bạn đã sẵn sàng trải nghiệm?</h3>
                <a href='/' className="bg-neutral-primary text-black font-bold py-3 px-10 rounded-full hover:bg-amber-300">
                    XEM LỊCH CHIẾU NGAY
                </a>
            </div>
        </div>
    )
}
