export function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo và thông tin */}
                    <div className="mb-4 md:mb-0">
                        <img src="/logo.png" alt="Logo" className="h-10 mb-2" />
                        <p className="text-sm text-gray-400">
                            © 2025 ShopeeFood. All rights reserved.
                        </p>
                    </div>

                    {/* Liên kết */}
                    <div className="flex gap-6">
                        <a
                            href="/about"
                            className="text-sm text-gray-400 hover:text-white transition"
                        >
                            Về chúng tôi
                        </a>
                        <a
                            href="/contact"
                            className="text-sm text-gray-400 hover:text-white transition"
                        >
                            Liên hệ
                        </a>
                        <a
                            href="/privacy"
                            className="text-sm text-gray-400 hover:text-white transition"
                        >
                            Chính sách bảo mật
                        </a>
                    </div>

                    {/* Mạng xã hội */}
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition"
                        >
                            <i className="fab fa-facebook-f"></i> Facebook
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition"
                        >
                            <i className="fab fa-twitter"></i> Twitter
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition"
                        >
                            <i className="fab fa-instagram"></i> Instagram
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}