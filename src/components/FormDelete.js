import React, { useState } from "react";
import axios from "axios"; // Import axios để gọi API

export function FormDelete() {
    const [productId, setProductId] = useState(""); // ID sản phẩm cần xóa
    const [notification, setNotification] = useState(""); // Thông báo trạng thái
    const [showConfirm, setShowConfirm] = useState(false); // Hiển thị bảng xác nhận

    const handleDelete = async () => {
        try {
            // Gọi API để xóa sản phẩm
            await axios.delete(`http://localhost:5000/api/products/${productId}`);
            setNotification(`Sản phẩm với ID "${productId}" đã được xóa thành công!`);
            setProductId(""); // Reset ID sau khi xóa
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
            if (error.response && error.response.status === 404) {
                setNotification("Không tìm thấy sản phẩm với ID này!");
            } else {
                setNotification("Đã xảy ra lỗi khi xóa sản phẩm. Vui lòng thử lại!");
            }
        } finally {
            setShowConfirm(false); // Đóng bảng xác nhận
            setTimeout(() => setNotification(""), 5000); // Tự động ẩn thông báo sau 5 giây
        }
    };

    const handleConfirmDelete = () => {
        setShowConfirm(true); // Hiển thị bảng xác nhận
    };

    const handleCancelDelete = () => {
        setShowConfirm(false); // Đóng bảng xác nhận
    };

    return (
        <div className="container mx-auto px-6 py-8 min-h-[736px]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Xóa Sản Phẩm</h2>

            {/* Hiển thị thông báo */}
            {notification && (
                <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
                    {notification}
                </div>
            )}

            {/* Nhập ID sản phẩm */}
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
                        onClick={handleConfirmDelete}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Xóa
                    </button>
                </div>
            </div>

            {/* Bảng xác nhận */}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Xác nhận xóa</h3>
                        <p className="text-gray-600 mb-6">
                            Bạn có chắc chắn muốn xóa sản phẩm với ID <strong>{productId}</strong> không?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleCancelDelete}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}