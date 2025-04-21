import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Import AuthContext để lấy thông tin user

export function FormOrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { user } = useAuth(); // Lấy thông tin user từ AuthContext
    // const API_URL = "https://chuyendeweb-serverside.onrender.com";
    const API_URL = "http://localhost:5000"; // Địa chỉ API của bạn

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) {
                setError("Bạn cần đăng nhập để xem lịch sử đơn hàng.");
                setLoading(false);
                return;
            }

            try {
                const authToken = localStorage.getItem("authToken");
                const response = await axios.get(`${API_URL}/api/orders`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                    params: {
                        user_id: user.user_id, // Gửi user_id để lọc đơn hàng
                    },
                });
                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Không thể tải lịch sử đơn hàng.");
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) {
        return <div className="text-center mt-8">Đang tải lịch sử đơn hàng...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Lịch sử đơn hàng</h2>
            {orders.length === 0 ? (
                <p className="text-gray-600">Bạn chưa có đơn hàng nào.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Mã đơn hàng</th>
                            <th className="border border-gray-300 px-4 py-2">Món ăn</th>
                            <th className="border border-gray-300 px-4 py-2">Số lượng</th>
                            <th className="border border-gray-300 px-4 py-2">Tổng giá</th>
                            <th className="border border-gray-300 px-4 py-2">Thời gian</th>
                            <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.order_id}>
                                <td className="border border-gray-300 px-4 py-2">{order.order_id}</td>
                                <td className="border border-gray-300 px-4 py-2">{order.food_id}</td>
                                <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {order.total_price.toLocaleString("vi-VN")}₫
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {new Date(order.order_time).toLocaleString("vi-VN")}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}