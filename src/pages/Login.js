import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset lỗi trước khi gửi yêu cầu
    
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error response from server:", errorData); // Log lỗi từ server
                throw new Error(errorData.error || "Đăng nhập thất bại");
            }
    
            const data = await response.json();
            const { token } = data;
    
            // Lưu token vào localStorage hoặc context
            localStorage.setItem("authToken", token);
            login(email); // Cập nhật trạng thái đăng nhập trong AuthContext
    
            navigate("/"); // Điều hướng về trang chủ
        } catch (err) {
            console.error("Error during login:", err.message); // Log lỗi chi tiết
            setError(err.message); // Hiển thị lỗi nếu có
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Đăng Nhập</h2>
                {error && (
                    <div className="mb-4 text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition"
                    >
                        Đăng Nhập
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Chưa có tài khoản?{" "}
                    <a href="/register" className="text-orange-500 hover:underline">
                        Đăng ký
                    </a>
                </p>
            </div>
        </div>
    );
}