import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext"; // Import AuthContext

export function Home() {
    const { user } = useAuth(); // Lấy trạng thái đăng nhập từ AuthContext

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-orange-500 mb-4">Chào mừng đến với FoodEaz!</h1>
            <p className="text-lg text-gray-700 mb-8">
                Khám phá các món ăn ngon và dịch vụ giao hàng nhanh chóng.
            </p>
            <div className="flex gap-4">
                <Link
                    to="/foods"
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition"
                >
                    Danh Sách Món Ăn
                </Link>
                {!user && ( // Chỉ hiển thị nút Đăng Nhập nếu chưa đăng nhập
                    <Link
                        to="/login"
                        className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg text-lg font-medium hover:bg-orange-100 transition"
                    >
                        Đăng Nhập
                    </Link>
                )}
            </div>
        </div>
    );
}