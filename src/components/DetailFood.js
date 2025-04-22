import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useAuth } from "./AuthContext"; // Import AuthContext

export function DetailFood() {
    const { user } = useAuth();
    const { id } = useParams(); // Lấy ID từ URL
    const [food, setFood] = useState(null); // State để lưu thông tin món ăn
    const [quantity, setQuantity] = useState(1);
    const [similarFoods, setSimilarFoods] = useState([]); // State để lưu sản phẩm tương tự
    const [loading, setLoading] = useState(true); // State để hiển thị trạng thái tải dữ liệu
    const API_URL = "https://chuyendeweb-serverside.onrender.com";
    // const API_URL = "http://localhost:5000"; // Địa chỉ API của bạn

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                // Gọi API để lấy thông tin món ăn
                const response = await axios.get(`${API_URL}/api/products/${id}`);
                setFood(response.data);

                // Gọi API để lấy danh sách sản phẩm tương tự
                const similarResponse = await axios.get(`${API_URL}/api/products`);
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
    }, [API_URL, id]);

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

    const handleAddToCart = async () => {
        if (!user) {
            alert("Vui lòng đăng nhập để thêm vào giỏ hàng!");
            return;
        }

        const order = {
            order_id: `ORDER${Date.now()}`, // Tạo mã order dựa trên timestamp
            user_id: user.id, // Lấy user_id từ AuthContext
            food_id: id,
            quantity: quantity,
            total_price: food.Giá * quantity,
            order_time: new Date().toISOString(),
            status: "Đang xử lý",
        };

        // alert(`Thông tin đơn hàng:\n${JSON.stringify(order, null, 2)}`);

        try {
            const response = await axios.post(`${API_URL}/api/orders`, order);
            console.log("Order đã được tạo:", response.data);
            alert("Đã thêm vào giỏ hàng thành công!");
        } catch (error) {
            console.error("Lỗi khi tạo order:", error);
            alert("Đã xảy ra lỗi khi thêm vào giỏ hàng!");
        }
    };

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

                    {/* Chọn số lượng và Thêm vào giỏ hàng */}
                    {food.Trạng_Thái !== "Không khả dụng" && food.Trạng_Thái !== "Hết hàng" ? (
                        <>
                            <div className="mt-6 flex items-center gap-4">
                                <label htmlFor="quantity" className="text-gray-700 font-medium">
                                    Số lượng:
                                </label>
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>

                            <button
                                className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
                                onClick={handleAddToCart}
                            >
                                Đặt hàng
                            </button>
                        </>
                    ) : (
                        <p className="mt-6 text-red-500 font-medium">Sản phẩm hiện không khả dụng hoặc đã hết hàng.</p>
                    )}
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