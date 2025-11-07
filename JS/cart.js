function addToCart(productId) {



    const productInCart = cart.find(item => item.id === productId);

    if (productInCart)
    {
        // If it exists, just increase the quantity
        productInCart.quantity += 1;
    } else
    {
        // Find product details from products array
        const product = products.find(p => p.id === productId);
        if (product)
        {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));


    const sucessContainerr = document.getElementById('sucess-container');
    sucessContainerr.style.display = 'block';


    let successMessage = 'Item Added to cart successfully'
    sucessContainerr.innerHTML = successMessage;

    setTimeout(function () {
        sucessContainerr.style.display = 'none';
    }, 2500);


    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement)
    {
        cartCountElement.textContent = `(${totalItems})`;
    }


}
document.addEventListener("DOMContentLoaded", updateCartCount);