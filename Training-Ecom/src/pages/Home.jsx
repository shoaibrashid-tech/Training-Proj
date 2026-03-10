import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import SearchFilter from "../components/utiliy-comp/Filters_Generic/SearchFilter";
import DropDownFilter from "../components/utiliy-comp/Filters_Generic/DropDownFilter";
import RangeFilter from "../components/utiliy-comp/Filters_Generic/RangeFilter";
import MainPageHeroSection from "../components/MainPageHeroSection";

function Home() {

  const min = 10;
  const max = 30000;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filter, setFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [range, setRange] = useState([min, max]);

  const [loading, setLoading] = useState(true);

  async function fetchProducts(newFilter, newRange, category) {

    const base = "https://api.escuelajs.co/api/v1/products";

    const params = new URLSearchParams();
    params.append("offset", 0);
    params.append("limit", 50);

    if (newFilter) {
      params.append("title", newFilter);
    }

    if (newRange && (newRange[0] > min || newRange[1] < max)) {
      params.append("price_min", newRange[0]);
      params.append("price_max", newRange[1]);
    }

    if (category) {
      params.append("categoryId", category);
    }

    const link = `${base}?${params.toString()}`;

    try {
      setLoading(true);

      const response = await fetch(link);
      const data = await response.json();

      setProducts(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function getProducts() {

    const link = "https://api.escuelajs.co/api/v1/products?offset=0&limit=50";

    try {
      setLoading(true);

      const response = await fetch(link);
      const data = await response.json();

      setProducts(data);

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

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (value) => {
    setFilter(value);
    fetchProducts(value, range, selectedCategory);
  };

  const handleRangeChange = (value) => {
    setRange(value);
    fetchProducts(filter, value, selectedCategory);
  };

  const handleCategoryChange = (key) => {
    setSelectedCategory(key);
    fetchProducts(filter, range, key);
  };

  useEffect(() => {
    getProducts();
  }, []);

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

      {!loading ? (

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