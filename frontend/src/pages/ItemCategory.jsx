import { useSearchParams } from "react-router-dom";

function Item({ name, href, backgroundColor, color }) {
  const style = {
    backgroundColor: backgroundColor,
    color: color,
    borderColor: color,
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const handleItemSearch = (e) => {
    e.preventDefault();

    setSearchParams({
      category: href,
    });
  };

  return (
    <div className="m-2">
      <button onClick={handleItemSearch} className="rounded-lg">
        <div
          className="capitalize px-6 py-3 text-center font-serif rounded-xl transition-all duration-300 ease-in-out hover:scale-102 hover:font-semibold hover:text-white hover:shadow-lg"
          style={style}
        >
          {name}
        </div>
      </button>
    </div>
  );
}

function CategoryItem() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Item
        name="Dairy"
        href="Dairy"
        backgroundColor="#E5F4FF" // Light sky blue
        color="#0056B3" // Bold blue
      />
      <Item
        name="Fish and Meat"
        href="fish_and_meat"
        backgroundColor="#FFE5E5" // Light pink
        color="#B30000" // Bold red
      />
      <Item
        name="Spices"
        href="Spices"
        backgroundColor="#FFF5D7" // Light yellow
        color="#D48800" // Bold amber
      />
      <Item
        name="Vegetables"
        href="Vegetables"
        backgroundColor="#E5FFD5" // Light green
        color="#397D02" // Bold green
      />
      <Item
        name="Baking"
        href="Baking"
        backgroundColor="#FFEFD2" // Light peach
        color="#B36200" // Bold orange
      />
      <Item
        name="Condiments"
        href="Condiments"
        backgroundColor="#FFD9D9" // Light coral
        color="#D80000" // Bold crimson
      />
      <Item
        name="Fruits"
        href="Fruits"
        backgroundColor="#FFF3C5" // Light gold
        color="#8B5700" // Bold sienna
      />
    </div>
  );
}

const ItemCategory = () => {
  return (
    <div>
      <CategoryItem />
    </div>
  );
};

export default ItemCategory;