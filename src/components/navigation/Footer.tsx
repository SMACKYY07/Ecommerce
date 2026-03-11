import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 mt-16 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-white font-bold mb-4">About ShopHub</h3>
                        <p className="text-sm">Premium products for the modern lifestyle. Shop with confidence.</p>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition">Home</a></li>
                            <li><a href="#" className="hover:text-white transition">Products</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Contact</h3>
                        <p className="text-sm">Email: support@shophub.com</p>
                        <p className="text-sm">Phone: +1 (555) 123-4567</p>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-8 text-center text-sm">
                    <p>&copy; 2026 ShopHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
