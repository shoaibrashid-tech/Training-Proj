import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import SearchFilter from "../components/utiliy-comp/Filters_Generic/SearchFilter";
import DropDownFilter from "../components/utiliy-comp/Filters_Generic/DropDownFilter";
import RangeFilter from "../components/utiliy-comp/Filters_Generic/RangeFilter";
//import MainPageHeroSection from "../components/MainPageHeroSection";
import { CiFilter } from "react-icons/ci";
import { getProducts } from "../services/ProductService";

function Home() {

  const min = 10;
  const max = 30000;

  const [categories, setCategories] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

    <div className="flex justify-center">

    <div className="w-full max-w-7xl mx-auto px-4">

      <div className="w-full py-8">
        

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">

            <div>
              <h1 className="text-4xl font-bold text-black">
                Discover Products
              </h1>
              <p className="text-gray-600 text-md mt-1">
                Explore our curated collection of quality items.. We take pride in our Quality...
              </p>
            </div>

            

          </div>


      </div>

      {/* Filters */}
      
        <div className="hidden md:flex flex-col md:flex-row gap-4 py-6">

        <div className="w-full md:w-1/4">
          <DropDownFilter
            items={categories}
            selectedKey={selectedCategory}
            setSelectedKey={handleCategoryChange}
          />
        </div>

        <div className="w-full md:w-1/4">
          <RangeFilter
            label="Price"
            min={min}
            max={max}
            range={range}
            setRangeHandle={handleRangeChange}
          />
        </div>

        <div className="w-full md:w-2/4">
          <SearchFilter
            setStateToEdit={handleSearch}
            searchText="Search"
          />
        </div>

      </div>

      {/* Products */}
      {!isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <Loading />
        </div>
      )}

    </div>
    {/* Mobile Filter Button */}
    <button
      onClick={() => setShowMobileFilters(true)}
      className="md:hidden fixed bottom-6 left-6 bg-blue-500 text-black w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl z-50"
    >
      <CiFilter />
    </button>
    {/* Mobile Filter Drawer */}
{showMobileFilters && (
  <div className="md:hidden fixed inset-0 z-50 flex items-end bg-black/40">

    <div className="w-full bg-white rounded-t-2xl p-6 animate-slideUp">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Filters</h2>

        <button
          onClick={() => setShowMobileFilters(false)}
          className="text-xl font-bold"
        >
          ✕
        </button>
      </div>

      {/* Filters */}
        <div className="flex flex-col gap-6">

          <DropDownFilter
            items={categories}
            selectedKey={selectedCategory}
            setSelectedKey={handleCategoryChange}
          />

          <RangeFilter
            label="Price"
            min={min}
            max={max}
            range={range}
            setRangeHandle={handleRangeChange}
          />

          <SearchFilter
            setStateToEdit={handleSearch}
            searchText="Search"
          />

        </div>

      </div>
    </div>
  )}
  </div>
  );
}

export default Home;