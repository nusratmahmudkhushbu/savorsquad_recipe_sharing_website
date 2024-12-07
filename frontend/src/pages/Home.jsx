import Header from "../components/Header";
import Hero from "../components/Hero";
import CategoryWrapper from "./CategoryWrapper";
import FeaturedCard from "../components/FeaturedCard";
import LatestRecipes from "../components/LatestRecipes";
import Footer from "../components/Footer";
import { MdOutlineSearch } from "react-icons/md";

// https://i.pinimg.com/564x/1c/e9/36/1ce936c0e8e66cd1b75ab0c540ce9a2f.jpg

const Home = () => {
  return (
    <div>
      {/* <Header /> */}
      <div className="max-w-6xl mx-auto">
        <Hero />

        <div className="flex justify-center">
          <form
            action="/search"
            className="bg-white px-4 py-3 rounded-full relative flex items-center gap-2 mb-8 w-[900px]"
          >
            <MdOutlineSearch className="w-5 h-5 mr-2 text-neutral-300" />
            <input
              className="outline-none w-full placeholder:text-[#344f3766]"
              name="query"
              type="search"
              placeholder="Search for a recipe"
              id="search"
              required=""
            />
          </form>
        </div>

        <CategoryWrapper />

        <FeaturedCard />
        <LatestRecipes />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
