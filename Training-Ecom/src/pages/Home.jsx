import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import SearchFilter from "../components/utiliy-comp/Filters_Generic/SearchFilter";
import DropDownFilter from "../components/utiliy-comp/Filters_Generic/DropDownFilter";
import RangeFilter from "../components/utiliy-comp/Filters_Generic/RangeFilter";
import MainPageHeroSection from "../components/MainPageHeroSection";
import { getProducts } from "../services/ProductService";

function Home() {

  const min = 10;
  const max = 30000;

  const [categories, setCategories] = useState([]);

  const [filter, setFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [range, setRange] = useState([min, max]);

  const buildParams = () => {

    const params = {
      offset: 0,
      limit: 50,
    };

    if (filter) {
      params.title = filter;
    }

    if (range && (range[0] > min || range[1] < max)) {
      params.price_min = range[0];
      params.price_max = range[1];
    }

    if (selectedCategory) {
      params.categoryId = selectedCategory;
    }

    return params;
  };

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", filter, range, selectedCategory],
    queryFn: async () => {

      const data = await getProducts(buildParams());
      if(categories.length === 0){
        const uniqueCategories = [
          ...new Map(
            data.map(p => [p.category.id, p.category])
          ).values()
        ];

        const categoryItems = uniqueCategories.map(cat => ({
          key: cat.id,
          label: cat.name
        }));

        setCategories(categoryItems);
      }
      

      return data;
    }
  });

  const handleSearch = (value) => {
    setFilter(value);
  };

  const handleRangeChange = (value) => {
    setRange(value);
  };

  const handleCategoryChange = (key) => {
    setSelectedCategory(key);
  };

  return (

    <div>

      {/* Filters */}
      <div className="w-full h-20 px-25 flex justify-between items-center">

        <div className="w-1/4 px-2">
          <DropDownFilter
            items={categories}
            selectedKey={selectedCategory}
            setSelectedKey={handleCategoryChange}
          />
        </div>

        <div className="w-1/4 px-2">
          <RangeFilter
            label="Price"
            min={min}
            max={max}
            range={range}
            setRangeHandle={handleRangeChange}
          />
        </div>

        <div className="w-2/4 px-2">
          <SearchFilter
            setStateToEdit={handleSearch}
            searchText="Search"
          />
        </div>

      </div>

      {/* Products */}

      {!isLoading ? (

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">

            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>
        </div>

      ) : (

        <div className="w-full h-screen flex justify-center items-center">
          <Loading />
        </div>

      )}

    </div>
  );
}

export default Home;