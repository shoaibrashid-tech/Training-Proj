async function GetPoducts(){
    const product = await fetch('https://fakestoreapi.com/products');
    
    return product.json();
}

response = GetPoducts().then(
    response => {
        console.log("Fetched Data:")
        console.log(response)
        const arr = [];
        localStorage.setItem("Product", JSON.stringify(response));
    }
).catch(
    error => {console.error(error);}
);


function retreiveProduct(){
    const product = localStorage.getItem("Product");
    return JSON.parse(product);
}
console.log("Stored Data:")
console.log(retreiveProduct());