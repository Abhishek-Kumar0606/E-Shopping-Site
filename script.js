// Shopping Cart Logic

let cart = [];
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartList = document.getElementById('cartList');
const cartItems = document.getElementById('cartItems');
const totalPriceElem = document.getElementById('totalPrice');
const clearCartBtn = document.getElementById('clearCart');

const products = document.querySelectorAll('.add-to-cart');

// Add to cart
products.forEach(product => {
    product.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        const productName = this.getAttribute('data-name');
        const productPrice = parseFloat(this.getAttribute('data-price'));

        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }
        updateCart();
    });
});

// Update cart UI
function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price} x ${item.quantity}`;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            removeFromCart(item.id);
        });

        li.appendChild(removeBtn);
        cartList.appendChild(li);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElem.textContent = `Total: ₹${totalPrice.toFixed(2)}`;
    cartItems.classList.remove('hidden');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Clear cart
clearCartBtn.addEventListener('click', () => {
    cart = [];
    updateCart();
    cartItems.classList.add('hidden');
});

// Toggle cart visibility
cartBtn.addEventListener('click', () => {
    cartItems.classList.toggle('hidden');
});
