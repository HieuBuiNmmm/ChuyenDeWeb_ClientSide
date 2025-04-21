// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { Edit2, Trash2 } from "lucide-react";
// import axios from "axios";

// export function FoodList() {
//     const ITEMS_PER_PAGE = 12;
//     const [visibleFoods, setVisibleFoods] = useState([]);
//     const [hasMore, setHasMore] = useState(true);
//     const [allFoods, setAllFoods] = useState([]);
//     const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
//     const [filters, setFilters] = useState({ Danh_Mục: "", Trạng_Thái: "", Cửa_Hàng: "" }); // Bộ lọc
//     const [filteredFoods, setFilteredFoods] = useState([]);
//     const [selectedFoodId, setSelectedFoodId] = useState(null);
//     const [showConfirm, setShowConfirm] = useState(false);
//     const [notification, setNotification] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchFoods = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/api/products");
//                 setAllFoods(response.data);
//                 setFilteredFoods(response.data);
//                 setVisibleFoods(response.data.slice(0, ITEMS_PER_PAGE));
//             } catch (error) {
//                 console.error("Lỗi khi tải danh sách sản phẩm:", error);
//             }
//         };

//         fetchFoods();
//     }, []);

//     useEffect(() => {
//         // Lọc danh sách món ăn dựa trên từ khóa tìm kiếm và các tiêu chí lọc
//         const filtered = allFoods.filter((food) => {
//             const matchesSearch = food.Tên.toLowerCase().includes(searchTerm.toLowerCase());
//             const matchesCategory = filters.Danh_Mục ? food.Danh_Mục === filters.Danh_Mục : true;
//             const matchesStatus = filters.Trạng_Thái ? food.Trạng_Thái === filters.Trạng_Thái : true;
//             const matchesStore = filters.Cửa_Hàng
//                 ? food.Cửa_Hàng.toLowerCase().includes(filters.Cửa_Hàng.toLowerCase())
//                 : true;

//             return matchesSearch && matchesCategory && matchesStatus && matchesStore;
//         });

//         setFilteredFoods(filtered);
//         setVisibleFoods(filtered.slice(0, ITEMS_PER_PAGE));
//         setHasMore(filtered.length > ITEMS_PER_PAGE);
//     }, [searchTerm, filters, allFoods]);

//     const fetchMoreData = () => {
//         const currentLength = visibleFoods.length;
//         const nextFoods = filteredFoods.slice(currentLength, currentLength + ITEMS_PER_PAGE);

//         if (nextFoods.length === 0) {
//             setHasMore(false);
//             return;
//         }

//         setTimeout(() => {
//             setVisibleFoods((prevFoods) => [...prevFoods, ...nextFoods]);
//         }, 500);
//     };

//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters({ ...filters, [name]: value });
//     };

//     const handleConfirmDelete = (id) => {
//         setSelectedFoodId(id);
//         setShowConfirm(true);
//     };

//     const handleCancelDelete = () => {
//         setSelectedFoodId(null);
//         setShowConfirm(false);
//     };

//     const handleDelete = async () => {
//         try {
//             await axios.delete(`http://localhost:5000/api/products/${selectedFoodId}`);
//             setNotification(`Sản phẩm với ID "${selectedFoodId}" đã được xóa thành công!`);
//             const updatedFoods = allFoods.filter((food) => food.ID !== selectedFoodId);
//             setAllFoods(updatedFoods);
//             setFilteredFoods(updatedFoods);
//             setVisibleFoods(updatedFoods.slice(0, visibleFoods.length));
//         } catch (error) {
//             console.error("Lỗi khi xóa sản phẩm:", error);
//             setNotification("Đã xảy ra lỗi khi xóa sản phẩm!");
//         } finally {
//             setShowConfirm(false);
//             setTimeout(() => setNotification(""), 5000);
//         }
//     };

//     return (
//         <div className="container mx-auto px-6 py-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Danh Sách Món Ăn</h2>

//             {/* Thanh tìm kiếm và lọc */}
//             <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <input
//                     type="text"
//                     placeholder="Tìm kiếm món ăn..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="col-span-1 md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//                 <select
//                     name="Danh_Mục"
//                     value={filters.Danh_Mục}
//                     onChange={handleFilterChange}
//                     className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 >
//                     <option value="">Tất cả danh mục</option>
//                     <option value="Đồ ăn nhanh">Đồ ăn nhanh</option>
//                     <option value="Đồ uống">Đồ uống</option>
//                     <option value="Đồ ngọt">Đồ ngọt</option>
//                     <option value="Món chính">Món chính</option>
//                     <option value="Ăn vặt">Ăn vặt</option>
//                     <option value="Đồ chay">Đồ chay</option>
//                     <option value="Combo">Combo</option>
//                 </select>
//                 <select
//                     name="Trạng_Thái"
//                     value={filters.Trạng_Thái}
//                     onChange={handleFilterChange}
//                     className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 >
//                     <option value="">Tất cả trạng thái</option>
//                     <option value="Còn hàng">Còn hàng</option>
//                     <option value="Hết hàng">Hết hàng</option>
//                 </select>
//                 <input
//                     type="text"
//                     name="Cửa_Hàng"
//                     placeholder="Lọc theo cửa hàng..."
//                     value={filters.Cửa_Hàng}
//                     onChange={handleFilterChange}
//                     className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//             </div>

//             {/* Hiển thị thông báo */}
//             {notification && (
//                 <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
//                     {notification}
//                 </div>
//             )}

//             <InfiniteScroll
//                 dataLength={visibleFoods.length}
//                 next={fetchMoreData}
//                 hasMore={hasMore}
//                 loader={<h4 className="text-center text-gray-500">Đang tải...</h4>}
//                 endMessage={
//                     <p className="text-center text-gray-500 mt-4">
//                         Bạn đã xem hết tất cả món ăn!
//                     </p>
//                 }
//             >
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {visibleFoods.map((food) => (
//                         <div
//                             key={food.ID}
//                             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition relative"
//                         >
//                             <Link to={`/foods/${food.ID}`}>
//                                 <img
//                                     src={food.Ảnh ? `${process.env.PUBLIC_URL}/images/food-images/${food.Ảnh}` : "https://via.placeholder.com/150"}
//                                     alt={food.Tên || "Ảnh món ăn"}
//                                     className="w-full h-40 object-cover"
//                                 />
//                             </Link>
//                             <div className="p-4">
//                                 <h3 className="text-lg font-semibold text-gray-800">{food.Tên}</h3>
//                                 <p className="text-sm text-gray-600 mt-2">{food.Mô_tả}</p>
//                                 <p className="text-sm text-gray-500 mt-2">Cửa hàng: {food.Cửa_Hàng}</p>
//                                 <p className="text-orange-500 font-bold mt-4">
//                                     {food.Giá.toLocaleString("vi-VN")}₫
//                                 </p>
//                             </div>
//                             <div className="absolute bottom-2 right-2 flex gap-2">
//                                 <button
//                                     onClick={() => navigate(`/update-food/${food.ID}`)}
//                                     className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
//                                     title="Cập Nhật"
//                                 >
//                                     <Edit2 size={16} />
//                                 </button>
//                                 <button
//                                     onClick={() => handleConfirmDelete(food.ID)}
//                                     className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
//                                     title="Xóa"
//                                 >
//                                     <Trash2 size={16} />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </InfiniteScroll>

//             {showConfirm && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg">
//                         <h3 className="text-lg font-bold text-gray-800 mb-4">Xác nhận xóa</h3>
//                         <p className="text-gray-600 mb-6">
//                             Bạn có chắc chắn muốn xóa sản phẩm với ID <strong>{selectedFoodId}</strong> không?
//                         </p>
//                         <div className="flex justify-end gap-4">
//                             <button
//                                 onClick={handleCancelDelete}
//                                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
//                             >
//                                 Hủy
//                             </button>
//                             <button
//                                 onClick={handleDelete}
//                                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//                             >
//                                 Xóa
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Edit2, Trash2 } from "lucide-react";
import axios from "axios";

export function FoodList() {
    const ITEMS_PER_PAGE = 12;
    const [visibleFoods, setVisibleFoods] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [allFoods, setAllFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
    const [filters, setFilters] = useState({ Danh_Mục: "", Trạng_Thái: "", Cửa_Hàng: "" }); // Bộ lọc
    const [sortOrder, setSortOrder] = useState(""); // Thứ tự sắp xếp
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [storeOptions, setStoreOptions] = useState([]); // Danh sách cửa hàng
    const [selectedFoodId, setSelectedFoodId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [notification, setNotification] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products");
                setAllFoods(response.data);
                setFilteredFoods(response.data);
                setVisibleFoods(response.data.slice(0, ITEMS_PER_PAGE));

                // Lấy danh sách cửa hàng và loại bỏ trùng lặp
                const stores = [...new Set(response.data.map((food) => food.Cửa_Hàng))];
                setStoreOptions(stores);
            } catch (error) {
                console.error("Lỗi khi tải danh sách sản phẩm:", error);
            }
        };

        fetchFoods();
    }, []);

    useEffect(() => {
        // Lọc và sắp xếp danh sách món ăn
        let filtered = allFoods.filter((food) => {
            const matchesSearch = food.Tên.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filters.Danh_Mục ? food.Danh_Mục === filters.Danh_Mục : true;
            const matchesStatus = filters.Trạng_Thái ? food.Trạng_Thái === filters.Trạng_Thái : true;
            const matchesStore = filters.Cửa_Hàng ? food.Cửa_Hàng === filters.Cửa_Hàng : true;

            return matchesSearch && matchesCategory && matchesStatus && matchesStore;
        });

        // Sắp xếp theo giá
        if (sortOrder === "asc") {
            filtered = filtered.sort((a, b) => a.Giá - b.Giá);
        } else if (sortOrder === "desc") {
            filtered = filtered.sort((a, b) => b.Giá - a.Giá);
        }

        setFilteredFoods(filtered);
        setVisibleFoods(filtered.slice(0, ITEMS_PER_PAGE));
        setHasMore(filtered.length > ITEMS_PER_PAGE);
    }, [searchTerm, filters, sortOrder, allFoods]);

    const fetchMoreData = () => {
        const currentLength = visibleFoods.length;
        const nextFoods = filteredFoods.slice(currentLength, currentLength + ITEMS_PER_PAGE);

        if (nextFoods.length === 0) {
            setHasMore(false);
            return;
        }

        setTimeout(() => {
            setVisibleFoods((prevFoods) => [...prevFoods, ...nextFoods]);
        }, 500);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleConfirmDelete = (id) => {
        setSelectedFoodId(id);
        setShowConfirm(true);
    };

    const handleCancelDelete = () => {
        setSelectedFoodId(null);
        setShowConfirm(false);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${selectedFoodId}`);
            setNotification(`Sản phẩm với ID "${selectedFoodId}" đã được xóa thành công!`);
            const updatedFoods = allFoods.filter((food) => food.ID !== selectedFoodId);
            setAllFoods(updatedFoods);
            setFilteredFoods(updatedFoods);
            setVisibleFoods(updatedFoods.slice(0, visibleFoods.length));
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
            setNotification("Đã xảy ra lỗi khi xóa sản phẩm!");
        } finally {
            setShowConfirm(false);
            setTimeout(() => setNotification(""), 5000);
        }
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Danh Sách Món Ăn</h2>

            {/* Thanh tìm kiếm, lọc và sắp xếp */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm món ăn..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="col-span-1 md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <select
                    name="Danh_Mục"
                    value={filters.Danh_Mục}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="">Tất cả danh mục</option>
                    <option value="Đồ ăn nhanh">Đồ ăn nhanh</option>
                    <option value="Đồ uống">Đồ uống</option>
                    <option value="Đồ ngọt">Đồ ngọt</option>
                    <option value="Món chính">Món chính</option>
                    <option value="Ăn vặt">Ăn vặt</option>
                    <option value="Đồ chay">Đồ chay</option>
                    <option value="Combo">Combo</option>
                </select>
                <select
                    name="Trạng_Thái"
                    value={filters.Trạng_Thái}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="">Tất cả trạng thái</option>
                    <option value="Còn hàng">Còn hàng</option>
                    <option value="Hết hàng">Hết hàng</option>
                </select>
                <select
                    name="Cửa_Hàng"
                    value={filters.Cửa_Hàng}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="">Tất cả cửa hàng</option>
                    {storeOptions.map((store) => (
                        <option key={store} value={store}>
                            {store}
                        </option>
                    ))}
                </select>
                <select
                    name="SortOrder"
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="">Sắp xếp theo giá</option>
                    <option value="asc">Giá tăng dần</option>
                    <option value="desc">Giá giảm dần</option>
                </select>
            </div>

            {/* Hiển thị thông báo */}
            {notification && (
                <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
                    {notification}
                </div>
            )}

            <InfiniteScroll
                dataLength={visibleFoods.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4 className="text-center text-gray-500">Đang tải...</h4>}
                endMessage={
                    <p className="text-center text-gray-500 mt-4">
                        Bạn đã xem hết tất cả món ăn!
                    </p>
                }
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {visibleFoods.map((food) => (
                        <div
                            key={food.ID}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition relative"
                        >
                            <Link to={`/foods/${food.ID}`}>
                                <img
                                    src={food.Ảnh ? `${process.env.PUBLIC_URL}/images/food-images/${food.Ảnh}` : "https://via.placeholder.com/150"}
                                    alt={food.Tên || "Ảnh món ăn"}
                                    className="w-full h-40 object-cover"
                                />
                            </Link>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800">{food.Tên}</h3>
                                <p className="text-sm text-gray-600 mt-2">{food.Mô_tả}</p>
                                <p className="text-sm text-gray-500 mt-2">Cửa hàng: {food.Cửa_Hàng}</p>
                                <p className="text-orange-500 font-bold mt-4">
                                    {food.Giá.toLocaleString("vi-VN")}₫
                                </p>
                            </div>
                            <div className="absolute bottom-2 right-2 flex gap-2">
                                <button
                                    onClick={() => navigate(`/update-food/${food.ID}`)}
                                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                                    title="Cập Nhật"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleConfirmDelete(food.ID)}
                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                                    title="Xóa"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>

            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Xác nhận xóa</h3>
                        <p className="text-gray-600 mb-6">
                            Bạn có chắc chắn muốn xóa sản phẩm với ID <strong>{selectedFoodId}</strong> không?
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