import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function FormUpdate() {
    const { id } = useParams(); // Lấy ID từ URL (nếu có)
    const [productId, setProductId] = useState(id || ""); // ID sản phẩm cần cập nhật
    const [formData, setFormData] = useState(null); // Dữ liệu form để chỉnh sửa
    const [notification, setNotification] = useState(""); // Thông báo trạng thái

    useEffect(() => {
        if (id) {
            // Nếu có ID từ URL, tự động tìm kiếm sản phẩm
            fetchProductById(id);
        }
    }, [id]);

    const fetchProductById = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
            setFormData(response.data);
        } catch (error) {
            console.error("Lỗi khi tải thông tin sản phẩm:", error);
            setNotification("Không tìm thấy sản phẩm với ID này!");
            setTimeout(() => setNotification(""), 5000); // Tự động ẩn thông báo sau 5 giây
        }
    };

    const handleSearch = async () => {
        if (!productId) {
            setNotification("Vui lòng nhập ID sản phẩm!");
            setTimeout(() => setNotification(""), 5000); // Tự động ẩn thông báo sau 5 giây
            return;
        }
        await fetchProductById(productId);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!formData) {
            setNotification("Không có dữ liệu để cập nhật!");
            setTimeout(() => setNotification(""), 5000); // Tự động ẩn thông báo sau 5 giây
            return;
        }

        console.log("Dữ liệu gửi lên API:", formData); // Log dữ liệu để kiểm tra

        try {
            // Gửi yêu cầu PUT để cập nhật sản phẩm
            const response = await axios.put(`http://localhost:5000/api/products/${productId}`, {
                ...formData,
                Giá: parseInt(formData.Giá, 10), // Chuyển giá thành số nguyên
            });
            console.log("Phản hồi từ API:", response.data); // Log phản hồi từ API
            setNotification("Sản phẩm đã được cập nhật thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            setNotification("Đã xảy ra lỗi khi cập nhật sản phẩm. Vui lòng thử lại!");
        } finally {
            setTimeout(() => setNotification(""), 5000); // Tự động ẩn thông báo sau 5 giây
        }
    };

    return (
        <div className="container mx-auto px-6 py-8 min-h-[736px]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Cập Nhật Sản Phẩm</h2>

            {/* Hiển thị thông báo */}
            {notification && (
                <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
                    {notification}
                </div>
            )}

            {/* Tìm kiếm sản phẩm */}
            {!id && (
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Nhập ID Sản Phẩm</label>
                    <div className="flex gap-4 mt-2">
                        <input
                            type="text"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="flex-1 px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Nhập ID sản phẩm"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
                        >
                            Tìm Kiếm
                        </button>
                    </div>
                </div>
            )}

            {/* Form cập nhật sản phẩm */}
            {formData && (
                <form onSubmit={handleUpdate} className="bg-white rounded-lg shadow-md p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tên Sản Phẩm</label>
                        <input
                            type="text"
                            name="Tên"
                            value={formData.Tên}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mô Tả</label>
                        <textarea
                            name="Mô_tả"
                            value={formData.Mô_tả}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Giá (VNĐ)</label>
                        <input
                            type="number"
                            name="Giá"
                            value={formData.Giá}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Danh Mục</label>
                        <select
                            name="Danh_Mục"
                            value={formData.Danh_Mục}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            required
                        >
                            <option value="FAST">Đồ ăn nhanh</option>
                            <option value="BEVE">Đồ uống</option>
                            <option value="DESS">Đồ ngọt</option>
                            <option value="MAIN">Món chính</option>
                            <option value="SNAK">Ăn vặt</option>
                            <option value="VEGE">Đồ chay</option>
                            <option value="COBO">Combo</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cửa Hàng</label>
                        <input
                            type="text"
                            name="Cửa_Hàng"
                            value={formData.Cửa_Hàng}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ảnh (URL)</label>
                        <input
                            type="text"
                            name="Ảnh"
                            value={formData.Ảnh}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition"
                    >
                        Cập Nhật Sản Phẩm
                    </button>
                </form>
            )}
        </div>
    );
}