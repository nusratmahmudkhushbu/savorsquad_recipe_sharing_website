import React from "react";
import { useAuth } from "../contexts/AuthContext";
import RecipeForm from "../components/RecipeForm";
import { Link } from "react-router-dom";


const CreateRecipe = () => {
  const { userObj } = useAuth();


  return (
    <div>
      {!userObj.isVerified ? (
        <div className="p-4 my-6 border border-yellow-500 bg-yellow-100 text-yellow-800 rounded max-w-screen-lg mx-auto">
          <p className="mb-2">Your account is not verified. Please verify your email to proceed.</p>
          <Link 
            to="/verify-email" 
            className="mt-6 inline-block rounded bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring"
          >
            Go to Verification
          </Link>
        </div>
      ) : (
        <RecipeForm />
      )}
    </div>
  );
};

export default CreateRecipe;
