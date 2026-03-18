const products = [
  { "id": 1, "name": "Product 1", "price": 10.99, "tag": "electronics" },
  { "id": 2, "name": "Product 2", "price": 12.49, "tag": "home" },
  { "id": 3, "name": "Product 3", "price": 8.75, "tag": "beauty" },
  { "id": 4, "name": "Product 4", "price": 15.00, "tag": "sports" },
  { "id": 5, "name": "Product 5", "price": 22.30, "tag": "toys" },
  { "id": 6, "name": "Product 6", "price": 18.99, "tag": "electronics" },
  { "id": 7, "name": "Product 7", "price": 9.50, "tag": "home" },
  { "id": 8, "name": "Product 8", "price": 14.20, "tag": "beauty" },
  { "id": 9, "name": "Product 9", "price": 19.99, "tag": "sports" },
  { "id": 10, "name": "Product 10", "price": 7.99, "tag": "toys" },
  { "id": 11, "name": "Product 11", "price": 11.49, "tag": "electronics" },
  { "id": 12, "name": "Product 12", "price": 16.89, "tag": "home" },
  { "id": 13, "name": "Product 13", "price": 13.75, "tag": "beauty" },
  { "id": 14, "name": "Product 14", "price": 21.00, "tag": "sports" },
  { "id": 15, "name": "Product 15", "price": 5.99, "tag": "toys" },
  { "id": 16, "name": "Product 16", "price": 24.50, "tag": "electronics" },
  { "id": 17, "name": "Product 17", "price": 17.30, "tag": "home" },
  { "id": 18, "name": "Product 18", "price": 6.75, "tag": "beauty" },
  { "id": 19, "name": "Product 19", "price": 29.99, "tag": "sports" },
  { "id": 20, "name": "Product 20", "price": 4.99, "tag": "toys" },
  { "id": 21, "name": "Product 21", "price": 10.00, "tag": "electronics" },
  { "id": 22, "name": "Product 22", "price": 18.45, "tag": "home" },
  { "id": 23, "name": "Product 23", "price": 9.99, "tag": "beauty" },
  { "id": 24, "name": "Product 24", "price": 14.60, "tag": "sports" },
  { "id": 25, "name": "Product 25", "price": 20.00, "tag": "toys" },
  { "id": 26, "name": "Product 26", "price": 23.75, "tag": "electronics" },
  { "id": 27, "name": "Product 27", "price": 12.00, "tag": "home" },
  { "id": 28, "name": "Product 28", "price": 8.40, "tag": "beauty" },
  { "id": 29, "name": "Product 29", "price": 27.99, "tag": "sports" },
  { "id": 30, "name": "Product 30", "price": 6.25, "tag": "toys" },
  { "id": 31, "name": "Product 31", "price": 19.49, "tag": "electronics" },
  { "id": 32, "name": "Product 32", "price": 15.75, "tag": "home" },
  { "id": 33, "name": "Product 33", "price": 7.80, "tag": "beauty" },
  { "id": 34, "name": "Product 34", "price": 26.10, "tag": "sports" },
  { "id": 35, "name": "Product 35", "price": 5.50, "tag": "toys" },
  { "id": 36, "name": "Product 36", "price": 13.25, "tag": "electronics" },
  { "id": 37, "name": "Product 37", "price": 21.49, "tag": "home" },
  { "id": 38, "name": "Product 38", "price": 11.30, "tag": "beauty" },
  { "id": 39, "name": "Product 39", "price": 28.75, "tag": "sports" },
  { "id": 40, "name": "Product 40", "price": 9.20, "tag": "toys" },
  { "id": 41, "name": "Product 41", "price": 16.00, "tag": "electronics" },
  { "id": 42, "name": "Product 42", "price": 14.99, "tag": "home" },
  { "id": 43, "name": "Product 43", "price": 6.60, "tag": "beauty" },
  { "id": 44, "name": "Product 44", "price": 30.00, "tag": "sports" },
  { "id": 45, "name": "Product 45", "price": 3.99, "tag": "toys" },
  { "id": 46, "name": "Product 46", "price": 22.99, "tag": "electronics" },
  { "id": 47, "name": "Product 47", "price": 18.00, "tag": "home" },
  { "id": 48, "name": "Product 48", "price": 12.75, "tag": "beauty" },
  { "id": 49, "name": "Product 49", "price": 25.50, "tag": "sports" },
  { "id": 50, "name": "Product 50", "price": 7.49, "tag": "toys" }
];


// Task 1
function filterProducts(arr){
    return function(catagory){
        return arr.filter(element => element["tag"] === catagory);
    }
}

console.log(filterProducts(products)("home"));

// Task 2
function sumProduct(arr){
    return arr.reduce((acc, product)=>{return acc+product.price}, 0);
}
console.log(sumProduct(products));

// Task 3
function uniqueTags(arr){
    result = []
    arr.forEach((product)=>{
        if (!result.includes(product.tag)){
            result.push(product.tag);
        }
    });
    return result;
}

console.log(uniqueTags(products));
