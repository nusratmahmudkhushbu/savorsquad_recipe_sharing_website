import React from "react";
import { Link } from "react-router-dom";

function CategoryItem({ name, href, backgroundColor, color }) {
  const style = {
    backgroundColor: backgroundColor,
    color: color,
    borderColor: color,
  };

  return (
    <div className="m-2">
      <Link to={href} className="rounded-full">
        <div
          className="capitalize px-6 py-2 text-center font-serif rounded-3xl transition-all duration-300 ease-in-out hover:scale-102 hover:font-semibold hover:text-white hover:shadow-lg"
          style={style}
        >
          {name}
        </div>
      </Link>
    </div>
  );
}

function CategoryList() {
  return (
    <div className="flex flex-wrap items-center gap-2 justify-center">
      <CategoryItem
        name="Entrees"
        href="/category/Entrees"
        backgroundColor="#f0f5c4"
        color="#59871f"
      />
      <CategoryItem
        name="Breakfast"
        href="/category/Breakfast"
        backgroundColor="#efedfa"
        color="#3c3a8f"
      />
      <CategoryItem
        name="Lunch"
        href="/category/Lunch"
        backgroundColor="#e5f7f3"
        color="#1f8787"
      />
      <CategoryItem
        name="Desserts"
        href="/category/Desserts"
        backgroundColor="#e8f5fa"
        color="#397a9e"
      />
      <CategoryItem
        name="Sides"
        href="/category/Sides"
        backgroundColor="#feefc9"
        color="#d16400"
      />
      <CategoryItem
        name="Drinks"
        href="/category/Drinks"
        backgroundColor="#ffeae3"
        color="#f0493e"
      />
    </div>
  );
}

const CategoryWrapper = () => {
  return (
    <div>
      <CategoryList />
    </div>
  );
};

export default CategoryWrapper;