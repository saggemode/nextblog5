import { Rating } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { data } from "../../data/data";
import { categories } from "../../data/data";

const Food = () => {
  //   console.log(data);
  const [foods, setFoods] = useState(data);

  //   Filter Type burgers/pizza/etc
  const filterType = (category) => {
    setFoods(
      data.filter((item) => {
        return item.category === category;
      })
    );
  };

  //   Filter by price
  const filterPrice = (price) => {
    setFoods(
      data.filter((item) => {
        return item.price === price;
      })
    );
  };

  return (
    <div className="max-w-[1640px] m-auto px-4 py-12">
      {/* <h1 className='text-orange-600 font-bold text-4xl text-center'>
        Top Rated Menu Items
      </h1> */}

      {/* Filter Row */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Fliter Type */}
        <div>
          <p className="font-bold text-gray-700">Filter Type</p>
          <div className="flex justfiy-between flex-wrap">
            <button
              onClick={() => setFoods(data)}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              All
            </button>
            <button
              onClick={() => filterType("burger")}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              Burgers
            </button>
            <button
              onClick={() => filterType("pizza")}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              Pizza
            </button>
            <button
              onClick={() => filterType("salad")}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              Salads
            </button>
            <button
              onClick={() => filterType("chicken")}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              Chicken
            </button>
          </div>
        </div>

        {/* Filter Price */}
        <div>
          <p className="font-bold text-gray-700">Filter Price</p>
          <div className="flex justify-between max-w-[390px] w-full">
            <button
              onClick={() => filterPrice("10")}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              10
            </button>
            <button
              onClick={() => filterPrice("50")}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              50
            </button>
            <button
              onClick={() => filterPrice("100")}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              100
            </button>
            <button
              onClick={() => filterPrice("150")}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              150
            </button>
          </div>
        </div>
      </div>

      {/* Display foods */}
      {/* <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'> */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4  pt-4">
        {foods.map((item, index) => (
          <div
            key={index}
            className="border shadow-lg rounded-lg hover:scale-105 duration-300"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={"350px"}
              height={"200px"}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="flex justify-between px-2 py-4">
              <p className="font-bold relative">{item.name}</p>
              <p className="mb-2 absolute pt-5">brand</p>
              <p>
                <span className="bg-orange-500 text-white p-1 rounded-full">
                  {item.price}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        <div className="shadow-lg rounded-lg">
          {/* <a href="#">
                    <img src="./src/images/medicine1.jpg" class="w-full rounded-tl-lg rounded-tr-lg" alt="">
                    </a> */}
          <Image
            src={
              "https://images.unsplash.com/photo-1594221708779-94832f4320d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpY2tlbiUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
            }
            alt={"name"}
            width={"350px"}
            height={"200px"}
            className="w-full rounded-tl-lg rounded-tr-lg"
          />
          <div className="p-5">
            <h3 className="text-gray-600">
              <a href="#">Mix Medicine</a>
            </h3>
            <div className="flex flex-row my-3">
              <p className="mb-2">brand</p>
            </div>
            <div className="flex flex-row my-3">
              <Rating value={"product.rating"} readOnly></Rating>
            </div>
            <div className="flex flex-row justify-between my-3">
              <p className="text-gray-600 py-2 rounded-full shadow-md px-2">
                ₦19,000
              </p>
              <a
                href="#"
                className="bg-gradient-to-r from-green-500 to-green-700 rounded-full py-2 px-4 text-gray-50 text-sm"
              >
                Add to cart
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-[1640px] m-auto px-4 py-12'>
      <h1 className='text-orange-600 font-bold text-4xl text-center'>
        Top Rated Menu Items
      </h1>
      {/* Categories */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6 py-6'>
        {categories.map((item, index) => (
          <div
            key={index}
            className='bg-gray-100 rounded-lg p-4 flex justify-between items-center'
          >
            <h2 className='font-bold sm:text-xl'>{item.name}</h2>
            <img src={item.image} alt={item.name} className='w-20' />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Food;
