import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Search, User } from "lucide-react";
import { useAuth } from "./AuthContext"; // Import AuthContext

const categories = [
    { name: "Danh Sách Món Ăn", path: "/foods" },
    { name: "Thêm Món Ăn", path: "/add-food" },
    { name: "Cập Nhật Món Ăn", path: "/update-food" },
    { name: "Xóa Món Ăn", path: "/delete-food" }
];

export function Navbar() {
    // const [locationDropdown, setLocationDropdown] = useState(false);
    // const [languageDropdown, setLanguageDropdown] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Refs để theo dõi dropdown
    const locationRef = useRef(null);
    const languageRef = useRef(null);
    const userRef = useRef(null);

    // Đóng dropdown khi nhấp ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                locationRef.current && !locationRef.current.contains(event.target)
            ) {
                // setLocationDropdown(false);
            }
            if (
                languageRef.current && !languageRef.current.contains(event.target)
            ) {
                // setLanguageDropdown(false);
            }
            if (
                userRef.current && !userRef.current.contains(event.target)
            ) {
                setUserDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setUserDropdown(false);
        navigate("/login");
    };

    return (
        <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-white border-b border-gray-200">
            {/* Logo + Location + Categories */}
            <div className="flex items-center gap-8">
                {/* Logo */}
                <Link to="/">
                    <img src="/logo.png" alt="FoodEaz" className="h-10" />
                </Link>

                {/* Location dropdown */}
                {/* <div
                    ref={locationRef}
                    className="relative flex items-center gap-2 text-sm font-medium text-gray-700 border px-4 py-2 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all"
                    onClick={() => setLocationDropdown(!locationDropdown)}
                >
                    TP. HCM
                    <ChevronDown size={16} />
                    {locationDropdown && (
                        <div className="absolute z-20 top-full left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                            {["Hà Nội", "Đà Nẵng", "TP. HCM"].map((loc) => (
                                <div
                                    key={loc}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                                >
                                    {loc}
                                </div>
                            ))}
                        </div>
                    )}
                </div> */}

                {/* Categories */}
                <div className="flex items-center gap-6 ml-[65px]">
                    {categories.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `text-sm font-medium px-3 py-2 rounded-lg transition-all ${isActive
                                    ? "text-orange-600 bg-orange-100 border border-orange-500"
                                    : "text-gray-700 hover:text-orange-500 hover:bg-gray-100"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Search + Auth + Language */}
            <div className="flex items-center gap-6 mr-[175px]">
                {/* Search icon */}
                <button
                    className="text-xl text-gray-600 hover:text-orange-500 transition-all"
                    title="Tìm kiếm"
                >
                    <Search size={16} />
                </button>

                {/* Auth: User or Login */}
                {user ? (
                    <div ref={userRef} className="relative">
                        <button
                            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all"
                            onClick={() => setUserDropdown(!userDropdown)}
                        >
                            <User size={16} />
                            <ChevronDown size={16} />
                        </button>
                        {userDropdown && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-30">
                                <Link
                                    to="/user-profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setUserDropdown(false)}
                                >
                                    Xem Hồ Sơ
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Đăng Xuất
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg font-medium hover:bg-orange-100 transition-all"
                        onClick={() => navigate("/login")}
                    >
                        Đăng nhập
                    </button>
                )}

                {/* Language dropdown */}
                {/* <div
                    ref={languageRef}
                    className="relative flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-orange-500 transition-all"
                    onClick={() => setLanguageDropdown(!languageDropdown)}
                >
                    VN
                    <ChevronDown size={16} />
                    {languageDropdown && (
                        <div className="absolute z-20 top-full right-0 mt-4 w-48 bg-white border rounded-lg shadow-lg">
                            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                                Tiếng Việt
                            </div>
                            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                                English
                            </div>
                        </div>
                    )}
                </div> */}
            </div>
        </nav>
    );
}