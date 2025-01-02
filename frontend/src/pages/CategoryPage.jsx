import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
import { useParams } from "react-router-dom";
import CategoryWrapper from "./CategoryWrapper";
import axios from "axios";
import { apiStart } from "../../api";
import Postcard from "../components/Postcard";
import FryingpanSpinner from "../components/FryingpanSpinner";

const CategoryPage = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiStart}/api/recipe/category/${category}`
        );
        setItems(response.data);
      } catch (error) {
        setError(error.message || "Error loading category");
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, [category]);

  return (
    <div>
      {/* <Header /> */}
      <div className="px-6 lg:px-12 py-20">
        <h1 className="text-center text-3xl py-10 font-semibold text-secondary sm:text-6xl sm:leading-relaxed capitalize">
          {category}
        </h1>
        <div className="flex justify-center w-full">
          <CategoryWrapper />
        </div>
        {error && <p>{error}</p>}
        {loading ? (
          <FryingpanSpinner extraClassName="h-16 mt-12" />
        ) : (
          <ul className="mt-20 grid grid-cols-1 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-4 xl:grid-cols-4 xl:w-[1100px] gap-x-4 gap-y-8 mx-auto">
            {items.map((item) => {
              //console.log(item);
              return (
                <Postcard
                  key={item._id}
                  recipeID={item._id}
                  imageUrl={item.photo}
                  likesCount={item.recipeLikeCount}
                  caption={item.name}
                  preptime={item.prepTime}
                  category={item.category}
                  servings={item.servings}
                  cooktime={item.cookTime}
                  difficulty={item.difficulty}
                  instructions={item.instructions}
                  comments={item.comments}
                  tags={item.tags}
                  ingredients={item.ingredients}
                  createdBy={item.createdBy}
                  likeArray={item.likedUsers}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
