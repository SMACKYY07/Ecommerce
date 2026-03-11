import { ShoppingBag } from 'lucide-react'
import React from 'react'

export default function Header() {
    return (
        < header className="bg-white shadow-md sticky top-0 z-40" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-linear-to-r from-blue-600 to-blue-700 rounded-xl">
                        <ShoppingBag size={28} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-linear-to-r from-yellow-600 to-black bg-clip-text text-transparent">
                            ShopHub
                        </h1>
                        <p className="text-sm text-gray-600">Premium Products Store</p>
                    </div>
                </div>
            </div>
        </header >
    )
}
