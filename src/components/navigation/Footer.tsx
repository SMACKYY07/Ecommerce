import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 mt-10 sm:mt-16 py-6 sm:py-8 px-4 sm:px-0">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
                    <div>
                        <h3 className="text-white font-bold mb-2 sm:mb-4 text-sm sm:text-base">About Kitch ME</h3>
                        <p className="text-xs sm:text-sm">Premium products for the modern lifestyle. Shop with confidence.</p>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-2 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
                        <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                            <li><a href="#" className="hover:text-white transition">Home</a></li>
                            <li><a href="#" className="hover:text-white transition">Products</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-2 sm:mb-4 text-sm sm:text-base">Contact</h3>
                        <p className="text-xs sm:text-sm">Email: mohilsharma1414@gmail.com</p>
                        <p className="text-xs sm:text-sm">Phone: +91 7876245247</p>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center text-xs sm:text-sm">
                    <p>&copy; 2026 Kitch ME. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
