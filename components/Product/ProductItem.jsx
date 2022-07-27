import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";



const ProductItem = ({ product, addToCartHandler }) => {
  return (
    <div className="hover:scale-105 transition transform flex space-y-2 flex-col">
      <div className="shadow-lg rounded-lg aspect-video relative">
        <Link href={`/product/${product.slug}`}>
          <a>
            <Image
              src={product.image}
              alt={product.name}
              width={"350px"}
              height={"200px"}
              className="w-full rounded-tl-lg rounded-tr-lg"
            />
          </a>
        </Link>
        <div className="p-5">
          <h3 className="text-gray-600">
            <Link href={`/product/${product.slug}`}>
              <a>
                <h2 className="text-lg">{product.name}</h2>
              </a>
            </Link>
          </h3>
          <div className="flex flex-row my-3">
            <p className="mb-2">brand</p>
          </div>
          <div className="flex flex-row my-3">
            <Rating value={product.rating} readOnly></Rating>
          </div>
          <div className="flex flex-row justify-between my-3">
            <p className="text-gray-600 py-2 rounded-full shadow-md px-2">
              ₦{product.price}
            </p>

            <button
              className="bg-gradient-to-r from-green-500 to-green-700 rounded-full py-2 px-4 text-gray-50 text-sm"
              type="button"
              onClick={() => addToCartHandler(product)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProductItem;



// const ProductItem = ({ product }) => {
//   return (
//     <div
//       className="p-4 hover:scale-105 hover:border-black transition transform flex space-y-2 flex-col border border-black/30"
//       key={product.id}
//     >
//       <h3 className="text-xl font-semibold truncate">{product.name}</h3>
//       <p className="truncate">{product.description}</p>
//       <div className="aspect-video relative">
//         <Image
//           src={product.image}
//           alt={product.name}
//           layout="fill"
//           objectFit="cover"
//         />
//       </div>
//       <p>
//         <span className="text-gray-600">${product.price}</span>
//       </p>
//       <div className="lg:space-x-2 lg:space-y-0 space-x-0 space-y-2 flex-col flex lg:flex-row w-full">
//         <button className="py-0.5 h-full text-lg w-full bg-black hover:text-black hover:bg-white border-black border text-white rounded">
//           Buy now
//         </button>
//         <button className="py-0.5 h-full text-lg w-full bg-black hover:text-black hover:bg-white border-black border text-white rounded">
//           Add to cart
//         </button>
//       </div>
//     </div>
//   );
// };
