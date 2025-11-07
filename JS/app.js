document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById("product-list");

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4 mt-5";

        card.innerHTML = `
      <div class="card h-100 shadow-sm ">
       <a href="product-details.html?id=${product.id}" class="text-decoration-none text-dark">
          
        <img src="img/${product.image}" class="card-img-top" alt="${product.name}" width="40px" height="300px" />
        <div class="card-body">
         <h5 class="">${product.name}</h5>
          <p>${product.description}</p></a>
          
          <p class="card-text">₦${product.price.toLocaleString()}</p>
          <button class="btn btn-dark d-flex align-items-center justify-content-space-between" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;

        productList.appendChild(card);
    });
});