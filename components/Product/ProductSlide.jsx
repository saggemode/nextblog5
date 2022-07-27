/* eslint-disable @next/next/no-img-element */
import React from "react";

const ProductHeadline = ({ product, addToCartHandler }) => {
  return (
    <div className="max-w-[1640px] mx-auto p-4 py-12 flex space-y-2 flex-col">
      <div className="rounded-xl relative">
        <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
          <p className="font-bold text-2xl px-2 pt-4">{product.name}</p>
          <p className="px-2">{product.brand}</p>
          <button
            className="border-white bg-white text-black mx-2 absolute bottom-4"
            onClick={() => addToCartHandler(product)}
          >
            Order Now
          </button>
        </div>
       
        <img
          className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl"
          src={product.image}
          alt={product.name}
        />
      </div>

     
    </div>
  );
};

export default ProductHeadline;
