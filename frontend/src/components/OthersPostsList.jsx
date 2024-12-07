import React from "react";
import PostCard from "./Postcard";

export default function OthersPostsList({ posts }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-2">Added Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.map((post) => {
          if (post?.comments?.length > 0) console.log(post);
          //console.log(post);
          return (
            <PostCard
              key={post._id}
              recipeID={post._id}
              imageUrl={post.photo}
              likesCount={post.recipeLikeCount}
              caption={post.name}
              preptime={post.prepTime}
              category={post.category}
              servings={post.servings}
              cooktime={post.cookTime}
              difficulty={post.difficulty}
              instructions={post.instructions}
              comments={post.comments}
              tags={post.tags}
              ingredients={post.ingredients}
              createdBy={post.createdBy}
              likeArray={post.likedUsers}
            />
          );
        })}
      </div>
    </div>
  );
}
