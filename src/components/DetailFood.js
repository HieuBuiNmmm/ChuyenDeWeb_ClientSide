import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export function DetailFood() {
    const { id } = useParams(); // Lấy ID từ URL
    const [food, setFood] = useState(null); // State để lưu thông tin món ăn
    const [similarFoods, setSimilarFoods] = useState([]); // State để lưu sản phẩm tương tự
    const [loading, setLoading] = useState(true); // State để hiển thị trạng thái tải dữ liệu

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                // Gọi API để lấy thông tin món ăn
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setFood(response.data);

                // Gọi API để lấy danh sách sản phẩm tương tự
                const similarResponse = await axios.get(`http://localhost:5000/api/products`);
                const filteredFoods = similarResponse.data.filter(
                    (item) => item.Danh_Mục === response.data.Danh_Mục && item.ID !== response.data.ID
                );
                setSimilarFoods(filteredFoods);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu món ăn:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-8">
                <h2 className="text-2xl font-bold text-gray-800">Đang tải...</h2>
            </div>
        );
    }

    if (!food) {
        return (
            <div className="container mx-auto px-6 py-8">
                <h2 className="text-2xl font-bold text-gray-800">Món ăn không tồn tại</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <img
                    src={food.Ảnh ? `${process.env.PUBLIC_URL}/images/food-images/${food.Ảnh}` : "https://via.placeholder.com/150"}
                    alt={food.Tên}
                    className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-800">{food.Tên}</h2>
                    <p className="text-gray-600 mt-4">{food.Mô_tả}</p>
                    <p className="text-sm text-gray-500 mt-2">Cửa hàng: {food.Cửa_Hàng}</p>
                    <p className="text-sm text-gray-500 mt-2">Danh mục: {food.Danh_Mục}</p>
                    <p className="text-sm text-gray-500 mt-2">Trạng thái: {food.Trạng_Thái}</p>
                    <p className="text-orange-500 font-bold text-2xl mt-4">
                        {food.Giá.toLocaleString("vi-VN")}₫
                    </p>
                    <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>

            {/* Sản phẩm tương tự */}
            {similarFoods.length > 0 && (
                <div className="mt-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Sản phẩm tương tự</h3>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={16}
                        navigation={true}
                        modules={[Navigation]}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="mySwiper"
                    >
                        {similarFoods.map((item) => (
                            <SwiperSlide key={item.ID}>
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <img
                                        src={item.Ảnh ? `${process.env.PUBLIC_URL}/images/food-images/${item.Ảnh}` : "https://via.placeholder.com/150"}
                                        alt={item.Tên}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                    <h4 className="text-lg font-bold text-gray-800 mt-4">{item.Tên}</h4>
                                    <p className="text-orange-500 font-bold mt-2">
                                        {item.Giá.toLocaleString("vi-VN")}₫
                                    </p>
                                    <button
                                        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                                        onClick={() => (window.location.href = `/foods/${item.ID}`)}
                                    >
                                        Xem chi tiết
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
}