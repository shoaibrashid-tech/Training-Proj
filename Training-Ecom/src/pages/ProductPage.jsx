import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import SearchFilter from '../components/utiliy-comp/Filters_Generic/SearchFilter'
import DropDownFilter from '../components/utiliy-comp/Filters_Generic/DropDownFilter'
import RangeFilter from '../components/utiliy-comp/Filters_Generic/RangeFilter'
import { useDebounce } from '../Utils/useDebounce'

function ProductPage() {
  
  const [products, setProduct] = useState([]);
  const [filter, setfilter] = useState('');
  //const [selectedKeys, setSelectedKeys] = useState([]);
  const [catagories, setCatagories] = useState([]);
  const [selectedCatagories, setSelectedCatagories] = useState([]);
  const min = 10;
  const max = 30000;
  const [range, setRange] = useState([min, max]);
  const [catFlag, setCatFlag] = useState(false);
  const [loading, setLoading] = useState(true);
  /*const searchExtraFilters = [
    {
      text: 'Catagory',
      component: Catagory,
      componentSpecifics: {
            items : items,
            setSelectedKeysHandler: setSelectedKeys,
      },
    }

  ]*/

    async function fetchProducts(newFilter, newRange, newCategories) {
  let base = "https://api.escuelajs.co/api/v1/products";

  const params = new URLSearchParams();

  if (newFilter) {
    params.append("title", newFilter);
  }

  if (newRange && (newRange[0] > min || newRange[1] < max)) {
    params.append("price_min", newRange[0]);
    params.append("price_max", newRange[1]);
  }

  if (newCategories && newCategories.length > 0) {
    params.append("categoryId", newCategories.join(","));
  }

  const link = `${base}?${params.toString()}`;

  setLoading(true);
  const response = await fetch(link);
  const data = await response.json();

  setProduct(data);
  setLoading(false);
}
  async function GetPoducts() {
    let base = "https://api.escuelajs.co/api/v1/products";

    const params = new URLSearchParams();
    
    // search filter
    if (debouncedFilter) {
      params.append("title", debouncedFilter);
    }

    // price range filter
    if (debouncedRange && (debouncedRange[0]>min || debouncedRange[1]<max)) {
      params.append("price_min", debouncedRange[0]);
      params.append("price_max", debouncedRange[1]);
    }

    // category filter
    if (selectedCatagories && selectedCatagories.length > 0) {
    //console.log(selectedCatagories);
      params.append("categoryId", "320");
    }

    const link = `${base}?${params.toString()}`;
    const response = await fetch(link);
    setLoading(true);
    const products = await response.json();
    console.log(catagories);
    return products;


  }
  function retreiveProduct(){
      const product = localStorage.getItem("Product");
      if(!product) return false;
      return JSON.parse(product);
  }


  const debouncedFilter = useDebounce(filter, 1000);
  const debouncedRange = useDebounce(range, 500);
  const debouncedCatagories = useDebounce(selectedCatagories, 500);
  
  const handleSearch = (value) => {
    setfilter(value);
    fetchProducts(value, range, selectedCatagories);
    };
    const handleRangeChange = (value) => {
    setRange(value);
    fetchProducts(filter, value, selectedCatagories);
    };
    const handleCategoryChange = (keys) => {
    setSelectedCatagories(keys);
    fetchProducts(filter, range, keys);
    };

  useEffect(()=>{
    //let data = retreiveProduct();
      GetPoducts().then(
          response => {
              console.log("Fetched Data:")
              console.log(response)
              const arr = [];
              setProduct(response)
              localStorage.setItem("Product", JSON.stringify(response));
              if(!catFlag){
                setCatFlag(true);
              }
              setLoading(false);
          }
      ).catch(
          error => {console.error(error);}
      );
    
  }, [])
  useEffect(() => {
    if (products.length) {

      const uniqueCategories = [
        ...new Map(
          products.map(p => [p.category.id, p.category])
        ).values()
      ];

      const categoryItems = uniqueCategories.map((cat, index) => ({
        key: cat.id,
        label: cat.name
      }));

      setCatagories(categoryItems);
      
    }
  }, [catFlag]);
  return (

    <div>
      <div className='flex justify-center m-8'>
        <h1 className=' text-5xl font-bold'>Product Page</h1>
      </div>
      
      <div className='w-full h-20 px-25 flex sm: justify-between items-center'>
        <div className='w-1/4 flex-initial px-2'>
           <DropDownFilter
            items={catagories}
            selectedKeys={selectedCatagories}
            setSelectedKeys={handleCategoryChange}
            />
        </div>
        <div className='flex-initial w-1/4 px-2'>
           <RangeFilter
            label="Price"
            min={min}
            max={max}
            range={range}
            setRangeHandle={handleRangeChange}
            />
        </div>
        <div className=' w-2/4 flex-initial px-2'>
          <SearchFilter
            setStateToEdit={handleSearch}
            searchText="Search"
            />  
        </div>
        
      </div>
      {/*
      <div className='w-full h-20 px-30'>
        <SearchBar bindingState={filter} 
        onChangeHandler={handleFilterSerch_OnChange} 
        OnEnterHandler={handleFilterSerch_OnEnter}
        searchText={"Search"}
        extraFilters={searchExtraFilters}
        />
      </div>
      */}
      {!loading ? <>
      <div className='flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
          {
            /**.filter((product) => (
              product.title.toLowerCase().includes(filter)
            )) */
            products.map((product, index) => (
              <div key={index} className="" > 
                <ProductCard product={product} />
              </div>
            ))
          }
        </div>
      </div>
      </> : 
      <div className='w-full h-screen flex justify-center items-center p-1/2'>
          <Loading />
      </div>
        
      }
    </div>
    
    
  )
}

export default ProductPage
