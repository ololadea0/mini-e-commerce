document.addEventListener("DOMContentLoaded", function() {
    const productDetails = document.getElementById("product-details");

    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));

    // Find the product in the array
    const product = products.find(p => p.id === productId);

    if (!product) {
        productDetails.innerHTML = `<p class="text-danger">Product not found.</p>`;
        return;
    }

    // Show product details
    productDetails.innerHTML = `
    <div class=" container col-sm-9">
      <div class="">
        <img src="img/${product.image}" class="img-fluid rounded shadow-sm" alt="${product.name}" />
      </div>
      <div class="">
        <h2>${product.name}</h2>
        <h5>₦${product.price.toLocaleString()}</h5>
        <p>${product.description}</p>

        <button class="btn btn-dark" onclick="addToCart(${product.id})">Add to Cart</button>
        <h4 class="mt-4">About Product</h4>
                <p>
        ${product.description2}
        </p>
        
        
      </div>
    </div>
  `;
});