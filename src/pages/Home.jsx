import React from 'react';
import { ProductList } from '../components';
import KitchenHero from '../components/KitchenHero';

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col">
      <div className="shrink-0">
        <KitchenHero />
      </div>
      <div className="flex-1 overflow-y-auto w-full">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <ProductList />
        </div>
      </div>
    </main>
  );
}
