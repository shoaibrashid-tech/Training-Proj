import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { strings } from "../constants/strings";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import SearchFilter from "../components/utiliy-comp/Filters_Generic/SearchFilter";
import DropDownFilter from "../components/utiliy-comp/Filters_Generic/DropDownFilter";
import RangeFilter from "../components/utiliy-comp/Filters_Generic/RangeFilter";
import { CiFilter } from "react-icons/ci";
import { getProducts, getCategories } from "../services/ProductService";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "antd";

function Home() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = 48;

  const min = 10;
  const max = 1000;

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [range, setRange] = useState([min, max]);

  const buildParams = () => {
    const params = { offset: (page - 1) * limit, limit: limit };
    if (filter) params.title = filter;
    if (range && (range[0] > min || range[1] < max)) {
      params.price_min = range[0];
      params.price_max = range[1];
    }
    if (selectedCategory) params.categoryId = selectedCategory;
    return params;
  };

  const { data: categories = [] } = useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
      const data = await getCategories();
      return Array.isArray(data) ? data : [];
    },
    });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", page, filter, range, selectedCategory],
    queryFn: async () => {
      const data = await getProducts(buildParams());
      return Array.isArray(data) ? data : [];
    },
  });

  const changePage = (page) => {
    setSearchParams({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (value) => setFilter(value);
  const handleRangeChange = (value) => setRange(value);
  const handleCategoryChange = (key) => setSelectedCategory(key);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="w-full py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h1 className="text-4xl font-bold text-black">
                {t(strings.discover)}
              </h1>
              <p className="text-gray-600 text-md mt-1">
                {t(strings.explore_desc)}
              </p>
            </div>
          </div>
        </div>

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
              label={t(strings.price)}
              min={min}
              max={max}
              range={range}
              setRangeHandle={handleRangeChange}
            />
          </div>
          <div className="w-full md:w-2/4">
            <SearchFilter
              setStateToEdit={handleSearch}
              searchText={t(strings.search)}
            />
          </div>
        </div>

        {!isLoading ? (
          <div>
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {t(strings.no_products)}
                </h2>
                <p className="text-gray-500 mt-2">
                  {t(strings.try_adjusting)}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            
            <div className="flex justify-center py-10">
              <Pagination
                align="center"
                current={page}
                pageSize={48}
                total={1000}
                onChange={changePage}
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-screen flex justify-center items-center">
            <Loading />
          </div>
        )}
      </div>

      <button
        onClick={() => setShowMobileFilters(true)}
        className="md:hidden fixed bottom-6 left-6 bg-blue-500 text-black w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl z-50"
      >
        <CiFilter />
      </button>

      {showMobileFilters && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end bg-black/40">
          <div className="w-full bg-white rounded-t-2xl p-6 animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{t(strings.filters)}</h2>
              <button onClick={() => setShowMobileFilters(false)} className="text-xl font-bold">✕</button>
            </div>
            <div className="flex flex-col gap-6">
              <DropDownFilter
                items={categories}
                selectedKey={selectedCategory}
                setSelectedKey={handleCategoryChange}
              />
              <RangeFilter
                label={t(strings.price)}
                min={min}
                max={max}
                range={range}
                setRangeHandle={handleRangeChange}
              />
              <SearchFilter
                setStateToEdit={handleSearch}
                searchText={t(strings.search)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;