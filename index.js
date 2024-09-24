  const productContainer = document.getElementById('productContainer');
  const categoryFilter = document.getElementById('categoryFilter');
  const sortSelector = document.getElementById('sortSelector');
  const sortMethod = document.getElementById('sortMethod');
  
  let isAscSort = true;
  sortMethod.innerText = 'A-Z ↑';
  

  const products = [
    { name: 'Laptop', category: 'Electronics', price: 899 },
    { name: 'Smartphone', category: 'Electronics', price: 299 },
    { name: 'T-shirt', category: 'Clothing', price: 25 },
    { name: 'Mercedes', category: 'Cars', price: 52000 },
    { name: 'Jeans', category: 'Clothing', price: 60 },
    { name: 'porsche', category: 'Cars', price: 99000 },
    { name: 'Book: JavaScript Basics', category: 'Books', price: 15 },
    { name: 'Headphones', category: 'Electronics', price: 99 },
    { name: 'Fiat', category: 'Cars', price: 22000 },
    { name: 'Sweater', category: 'Clothing', price: 40 },
    { name: 'Book: Learn Python', category: 'Books', price: 20 },
  ];
  
  let displayedProducts = products;

  function displayProducts(filteredList) {
    productContainer.innerHTML = ''; 
    filteredList.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
  
      const productName = document.createElement('h2');
      productName.classList.add('product-name');
      productName.textContent = product.name;
  
      const productPrice = document.createElement('p');
      productPrice.classList.add('product-price');
      productPrice.textContent = `$${product.price}`;
  
      const productCategory = document.createElement('p');
      productCategory.classList.add('product-category');
      productCategory.textContent = `${product.category}`;
  
      productCard.appendChild(productName);
      productCard.appendChild(productPrice);
      productCard.appendChild(productCategory);
      productContainer.appendChild(productCard);
    });
  }
  
  function sort(selection) {
    let sortedList = displayedProducts;
    switch (selection) {
      case 'price':
        sortedList = sortedList.sort((a, b) => isAscSort ? a.price - b.price : b.price - a.price);
        break;
      case 'category':
        sortedList = sortedList.sort((a, b) => isAscSort ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category));
        break;
      case 'name':
        sortedList = sortedList.sort((a, b) => isAscSort ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    displayedProducts = sortedList;
    return sortedList;
  }

  

  categoryFilter.addEventListener('change', () => {
    const selectedCategory = categoryFilter.value;

    if (selectedCategory === 'All'){
      displayedProducts = products ;
      displayProducts(products);
    }
    else {
      displayedProducts = products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());
      displayProducts(displayedProducts);
    }
  });
  

  sortSelector.addEventListener('change', () => {
    const selectedSort = sortSelector.value.toLowerCase();
  
    if (selectedSort === 'none') {
      displayProducts(displayedProducts);
    } else if (selectedSort === 'price') {
      displayProducts(sort('price'));
    } else if (selectedSort === 'category') {
      displayProducts(sort('category'));
    } else if (selectedSort === 'name') {
      displayProducts(sort('name'));
    } else {
      displayProducts(displayedProducts);
    }
  });
  

  
  sortMethod.addEventListener('click', () => {
    isAscSort = !isAscSort;
    sortMethod.innerText = isAscSort? 'A-Z ↑' : 'Z-A ↓' ;    
    displayProducts(displayedProducts.reverse())

  })
  

  displayProducts(products);
  