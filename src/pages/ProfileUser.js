// import React, { useState } from "react";

// export function ProfileUser() {
//     const [user, setUser] = useState({
//         name: "Nguyễn Văn A",
//         email: "nguyenvana@example.com",
//         phone: "0123456789",
//         address: "123 Đường ABC, Quận 1, TP. HCM",
//     });

//     const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
//     const [formData, setFormData] = useState(user); // Dữ liệu form

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSave = () => {
//         setUser(formData); // Cập nhật thông tin người dùng
//         setIsEditing(false); // Thoát chế độ chỉnh sửa
//     };

//     return (
//         <div className="container mx-auto px-6 py-8 min-h-[736px]">
//             {/* Banner */}
//             <div className="Banner mb-6">
//                 <img
//                     src="/images/user-banner/Banner-User-Default.jpg"
//                     alt="User Banner"
//                     className="w-full h-64 object-cover rounded-lg shadow-md"
//                 />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông Tin Cá Nhân</h2>
//             <div className="bg-white rounded-lg shadow-md p-6">
//                 {isEditing ? (
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Họ và Tên</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleInputChange}
//                                 className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                                 className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Số Điện Thoại</label>
//                             <input
//                                 type="text"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleInputChange}
//                                 className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Địa Chỉ</label>
//                             <input
//                                 type="text"
//                                 name="address"
//                                 value={formData.address}
//                                 onChange={handleInputChange}
//                                 className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
//                             />
//                         </div>
//                         <button
//                             onClick={handleSave}
//                             className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
//                         >
//                             Lưu Thay Đổi
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="space-y-4">
//                         <p>
//                             <span className="font-medium text-gray-700">Họ và Tên:</span> {user.name}
//                         </p>
//                         <p>
//                             <span className="font-medium text-gray-700">Email:</span> {user.email}
//                         </p>
//                         <p>
//                             <span className="font-medium text-gray-700">Số Điện Thoại:</span> {user.phone}
//                         </p>
//                         <p>
//                             <span className="font-medium text-gray-700">Địa Chỉ:</span> {user.address}
//                         </p>
//                         <button
//                             onClick={() => setIsEditing(true)}
//                             className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
//                         >
//                             Chỉnh Sửa
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext"; // Import AuthContext để lấy thông tin user
import axios from "axios";

export function ProfileUser() {
    const { user } = useAuth(); // Lấy thông tin user từ AuthContext
    const [userData, setUserData] = useState(null); // Dữ liệu người dùng từ backend
    const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
    const [formData, setFormData] = useState(null); // Dữ liệu form
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState(""); // Lỗi nếu có
    const API_URL = "https://chuyendeweb-serverside.onrender.com";

    // Lấy thông tin người dùng từ backend
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const authToken = localStorage.getItem("authToken");
                const response = await axios.get(`${API_URL}/api/users/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setUserData(response.data);
                setFormData(response.data); // Đồng bộ dữ liệu form
                setLoading(false);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Không thể tải thông tin người dùng.");
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    // Xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Lưu thông tin người dùng sau khi chỉnh sửa
    const handleSave = async () => {
        try {
            const authToken = localStorage.getItem("authToken");
            await axios.put(`${API_URL}/api/users/${user.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setUserData(formData); // Cập nhật dữ liệu hiển thị
            setIsEditing(false); // Thoát chế độ chỉnh sửa
            alert("Cập nhật thông tin thành công!");
        } catch (err) {
            console.error("Error updating user data:", err);
            alert("Không thể cập nhật thông tin.");
        }
    };

    if (loading) {
        return <div className="text-center mt-8">Đang tải thông tin người dùng...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-6 py-8 min-h-[736px]">
            {/* Banner */}
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
                            <label className="block text-sm font-medium text-gray-700">Họ và Tên</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Số Điện Thoại</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Địa Chỉ</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
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
                            <span className="font-medium text-gray-700">Email:</span> {userData.email}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Số Điện Thoại:</span> {userData.phone}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Địa Chỉ:</span> {userData.address}
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