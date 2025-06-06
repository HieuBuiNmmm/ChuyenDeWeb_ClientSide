// File: ProfileUser.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export function ProfileUser() {
    const [user, setUser] = useState(null); // Dữ liệu user
    const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
    const [formData, setFormData] = useState({}); // Dữ liệu form
    const API_URL = "https://chuyendeweb-serverside.onrender.com";
    // const API_URL = "http://localhost:5000"; // Địa chỉ API của bạn

    // Lấy token từ localStorage
    const token = localStorage.getItem("authToken");

    // Lấy thông tin user từ API khi component được render
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Thêm token vào header
                    },
                });
                setUser(response.data);
                setFormData(response.data); // Gán dữ liệu user vào form
            } catch (error) {
                console.error("Lỗi khi lấy thông tin user:", error);
            }
        };

        fetchUser();
    }, [token]);

    // Xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Lưu thông tin user
    const handleSave = async () => {
        try {
            const response = await axios.put(`${API_URL}/api/user/profile`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header
                },
            });
            setUser(response.data); // Cập nhật thông tin user
            setIsEditing(false); // Thoát chế độ chỉnh sửa
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin user:", error);
        }
    };

    if (!user) {
        return <div>Đang tải thông tin...</div>; // Hiển thị khi dữ liệu chưa tải xong
    }

    return (
        <div className="container mx-auto px-6 py-8 min-h-[736px]">
            <div className="Banner mb-6">
                <img
                    src="/images/user-banner/Banner-User-Default.jpg"
                    alt="User Banner"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông Tin Cá Nhân</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
                {isEditing ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">ID</label>
                            <input
                                type="text"
                                name="id"
                                value={formData.id || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                disabled // Không cho phép chỉnh sửa ID
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <input
                                type="text"
                                name="role"
                                value={formData.role || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ngày Tạo</label>
                            <input
                                type="text"
                                name="created_at"
                                value={new Date(parseInt(formData.created_at?.$date?.$numberLong || 0)).toLocaleString()}
                                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                disabled // Không cho phép chỉnh sửa ngày tạo
                            />
                        </div>
                        <button
                            onClick={handleSave}
                            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
                        >
                            Lưu Thay Đổi
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p>
                            <span className="font-medium text-gray-700">ID:</span> {user.id}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Email:</span> {user.email}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Role:</span> {user.role}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Ngày Tạo:</span>{" "}
                            {new Date(parseInt(user.created_at?.$date?.$numberLong || 0)).toLocaleString()}
                        </p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
                        >
                            Chỉnh Sửa
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}