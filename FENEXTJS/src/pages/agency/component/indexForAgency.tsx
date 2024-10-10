"use client";
import React, { useEffect, useState } from 'react';
import { useMyCart } from '@/context/CartContext.jsx';
import styles from '@/pages/agency/component/index.module.css';
import cookie from "react-cookies";
import { FaClipboardList,FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
import path from 'path';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface HomeForCustomerProps {
  products: Product[];
}

const HomeForCustomer: React.FC<HomeForCustomerProps> = ({ products }) => {
  const { setDispatch } = useMyCart() || { dispatch: () => {} };
  const [currentIndex, setCurrentIndex] = useState(0);

  const order = (p: Product) => {
    let cart = cookie.load('cart') || null;
    if (cart === null) {
      cart = {};
    }
    if (p.id in cart) {
      cart[p.id]['quantity']++;
    } else {
      cart[p.id] = {
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: 1,
        img: p.image,
      };
    }
    cookie.save('cart', cart, { path: '/' });
    console.log("Cart saved to cookie:", cart);

    if (cart !== null) {
      let totalQuantity = 0;
      for (let c of Object.values(cart)) totalQuantity += (c as any).quantity;

      setDispatch({
        type: 'update',
        payload: totalQuantity,
      });
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(products.length / 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(products.length / 2)) % Math.ceil(products.length / 2));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); 
    return () => clearInterval(interval);
  }, [products.length]);

  return (
    <>
      <div className="container mx-auto p-4">
        {/* Carousel */}
        <div id="productCarousel" className="relative mb-8">
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {Array.isArray(products) && products.length > 0 ? (
                products.reduce((acc, product, index) => {
                  if (index % 2 === 0) {
                    acc.push(
                      <div key={index} className="min-w-full flex">
                        <div className={`${styles['carousel-slide']} w-1/2 p-2 relative`}>
                          <img
                            src={product.image}
                            className="w-full h-64 object-cover rounded-lg"
                            alt={product.name}
                          />
                          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
                            <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                          </div>
                        </div>
                        {products[index + 1] && (
                          <div className={`${styles['carousel-slide']} w-1/2 p-2 relative`}>
                            <img
                              src={products[index + 1].image}
                              className="w-full h-64 object-cover rounded-lg"
                              alt={products[index + 1].name}
                            />
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
                              <p className="text-lg font-semibold">${products[index + 1].price.toFixed(2)}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return acc;
                }, [])
              ) : (
                <p>No products available.</p>
              )}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className={`${styles['carousel-button']} absolute top-1/2 -left-6 transform -translate-y-1/2`}
          >
            <FaArrowLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className={`${styles['carousel-button']} absolute top-1/2 -right-6 transform -translate-y-1/2`}
          >
            <FaArrowRight size={24} />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className={`${styles['custom-height']} bg-white rounded-lg shadow-lg overflow-hidden`}>
                <img
                  src={product.image}
                  className={`${styles['custom-height2']} w-full h-48 object-cover rounded-t-lg`}
                  alt={product.name}
                />
                <div className="p-4">
                  <h5 className="text-xl font-semibold mb-2">{product.name}</h5>
                  <p className="text-gray-700 mb-2">Price: ${product.price}</p>
                  <a
                    href={`/product/${product.id}`}
                    className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                  >
                    View Details
                  </a>
                  <button
                    onClick={() => order(product)}
                    className="ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
                  >
                    <FaClipboardList className="mr-1" />
                    Order
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeForCustomer;
