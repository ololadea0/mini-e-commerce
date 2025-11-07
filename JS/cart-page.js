document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.getElementById("cart-container");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0)
  {
    cartContainer.innerHTML = `<p class="lead">Your cart is empty</p>`;
    return;
  }


  let tableHTML = `
    <table class="table table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price (₦)</th>
          <th>Quantity</th>
          <th>Total (₦)</th>

        </tr>
      </thead>
      <tbody> 
      
  `;

  let grandTotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    grandTotal += itemTotal;

    tableHTML += `
         
          <tr>
        
            <td><img src="img/${item.image}" width="80" height="80" style="object-fit: cover;" /></td>
            <td>${item.name}</td>
            <td>${item.price.toLocaleString()}</td>
            <td class="text-center">
            <div class="d-flex justify-content-center align-items-center gap-2">
              <button class="btn btn-sm btn-light border" onclick="decreaseQty(${item.id})">
                <i class="bi bi-dash"></i>
              </button>
              <span class="fw-bold">${item.quantity}</span>
              <button class="btn btn-sm btn-light border" onclick="increaseQty(${item.id})">
                <i class="bi bi-plus"></i>
              </button>
            </div>
            </td>
            <td>${itemTotal.toLocaleString()}</td>
            
          </tr>  
    `;
  });

  tableHTML += `
     </tbody>
    </table>
        
      <div >

        <button id="clear-cart" class="btn btn-dark ">
          <i class="bi bi-trash3-fill"></i> Clear Cart
        </button>

        <div style="display: flex; float: right;">
          
          <div class="fw-bold fs-5 mx-3 text-center f-end">
            <p>Total: ₦${grandTotal.toLocaleString()}</p>
          </div>
          
          <button id="checkout" class="btn btn-success">
              <i class="bi bi-credit-card"></i> Proceed to pay ${grandTotal.toLocaleString()}
          </button>
        </div>
      </div>
    
  `;

  cartContainer.innerHTML = tableHTML;

  document.querySelector('#checkout').addEventListener('click', function () {
    if (cart.length === 0)
    {
      alert("Your cart is empty.");
      return;
    }
    window.location.href = 'checkout.html';
  });

  document.querySelector("#clear-cart").addEventListener("click", function () {
    if (confirm("Are you sure you want to clear your cart?"))
    {

      localStorage.removeItem("cart");
      updateCartCount(); // refresh the cart icon count
      location.reload(); // reload the page to reflect empty cart
    }
  });

});

function increaseQty(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find(p => p.id === productId);
  if (item)
  {
    item.quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
}

function decreaseQty(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find(p => p.id === productId);
  if (item && item.quantity > 1)
  {
    item.quantity -= 1;
  } else
  {
    // If quantity is 1 and they click "-", remove the item entirely
    cart = cart.filter(p => p.id !== productId);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function displayError(errorMessage) {

  const errorContainer = document.getElementById('error-container');

  errorContainer.style.display = 'block';

  errorContainer.innerHTML = errorMessage;

  setTimeout(function () {
    errorContainer.style.display = 'none';
  }, 20000);
}