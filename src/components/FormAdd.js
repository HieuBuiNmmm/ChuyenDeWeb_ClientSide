import React, { useState } from "react";
import axios from "axios";

export function FormAdd() {
    const [formData, setFormData] = useState({
        ID: "",
        Ảnh: "",
        Tên: "",
        Cửa_Hàng: "",
        Trạng_Thái: "Còn hàng", // Mặc định là "Còn hàng"
        Danh_Mục: "",
        Giá: "",
        Mô_tả: "",
    });

    const [notification, setNotification] = useState(""); // Thông báo trạng thái

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Nếu người dùng chọn danh mục, tự động tạo ID
        if (name === "Danh_Mục" && value) {
            try {
                // Gọi API để lấy ID mới từ backend
                const response = await axios.get(`http://localhost:5000/api/products/new-id?category=${value}`);
                setFormData((prev) => ({ ...prev, ID: response.data.newId }));
            } catch (error) {
                console.error("Lỗi khi tạo ID sản phẩm:", error);
                setNotification("Không thể tạo ID sản phẩm. Vui lòng thử lại!");
                setTimeout(() => setNotification(""), 5000); // Tự động ẩn thông báo sau 5 giây
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, Ảnh: file.name }); // Lưu tên của file vào formData
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu đầy đủ
        if (
            !formData.ID ||
            !formData.Tên ||
            !formData.Cửa_Hàng ||
            !formData.Danh_Mục ||
            !formData.Giá ||
            !formData.Mô_tả
        ) {
            setNotification("Vui lòng điền đầy đủ thông tin!");
            setTimeout(() => setNotification(""), 5000);
            return;
        }

        try {
            let uploadedFileName = "";

            // 1. Upload ảnh trước
            const imageFile = document.querySelector('input[name="Ảnh"]').files[0];
            if (imageFile) {
                const validTypes = ["image/jpeg", "image/png", "image/jpg"];
                if (!validTypes.includes(imageFile.type)) {
                    setNotification("Chỉ chấp nhận file ảnh định dạng JPG, JPEG, PNG!");
                    setTimeout(() => setNotification(""), 5000);
                    return;
                }
                if (imageFile.size > 5 * 1024 * 1024) { // 5MB
                    setNotification("Kích thước file ảnh không được vượt quá 5MB!");
                    setTimeout(() => setNotification(""), 5000);
                    return;
                }

                const imageFormData = new FormData();
                imageFormData.append("image", imageFile);

                const uploadResponse = await axios.post("http://localhost:5000/api/upload-image", imageFormData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                uploadedFileName = uploadResponse.data.filename; // Chỉ lấy tên file từ response
            }

            // 2. Gửi dữ liệu sản phẩm sau khi upload ảnh xong
            const response = await axios.post("http://localhost:5000/api/products", {
                ...formData,
                Ảnh: uploadedFileName, // Gửi tên file thay vì đường dẫn
                Giá: parseInt(formData.Giá, 10),
            });

            console.log("Phản hồi từ server:", response.data);
            setNotification("Sản phẩm đã được thêm thành công!");
            setTimeout(() => setNotification(""), 5000);

            // Reset form
            setFormData({
                ID: "",
                Ảnh: "",
                Tên: "",
                Cửa_Hàng: "",
                Trạng_Thái: "Còn hàng",
                Danh_Mục: "",
                Giá: "",
                Mô_tả: "",
            });

            // Reset input file
            document.querySelector('input[name="Ảnh"]').value = "";
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error);
            setNotification("Đã xảy ra lỗi khi thêm sản phẩm!");
            setTimeout(() => setNotification(""), 5000);
        }
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Thêm Sản Phẩm Mới</h2>

            {/* Hiển thị thông báo */}
            {notification && (
                <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
                    {notification}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">ID Sản Phẩm</label>
                    <input
                        type="text"
                        name="ID"
                        value={formData.ID}
                        className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        readOnly
                        required
                    />
                </div>
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
                        <option value="">Chọn danh mục</option>
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
                {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Ảnh (URL)</label>
                    <input
                        type="text"
                        name="Ảnh"
                        value={formData.Ảnh}
                        onChange={handleInputChange}
                        placeholder="URL ảnh sản phẩm"
                        className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        required
                    />
                </div> */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ảnh (Chọn file)</label>
                    <input
                        type="file"
                        name="Ảnh"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition"
                >
                    Thêm Sản Phẩm
                </button>
            </form>
        </div>
    );
}
