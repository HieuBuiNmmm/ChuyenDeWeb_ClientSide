import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(""); // Reset lỗi trước khi gửi yêu cầu

        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/register", {
                email,
                password,
                role: "admin", // Thêm thuộc tính role
                created_at: new Date().toISOString(), // Thêm thuộc tính created_at
            });

            // Nếu đăng ký thành công, điều hướng đến trang đăng nhập
            alert("Đăng ký thành công!");
            navigate("/login");
        } catch (err) {
            console.error("Error during registration:", err.response?.data?.error || err.message);
            setError(err.response?.data?.error || "Đăng ký thất bại"); // Hiển thị lỗi từ server
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Đăng Ký</h2>
                {error && (
                    <div className="mb-4 text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={handleRegister}>
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
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition"
                    >
                        Đăng Ký
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Đã có tài khoản?{" "}
                    <a href="/login" className="text-orange-500 hover:underline">
                        Đăng nhập
                    </a>
                </p>
            </div>
        </div>
    );
}