document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function addToCart(id, name, price) {
        const product = { id, name, price, quantity: 1 };
        const index = cart.findIndex(item => item.id === id);
        if (index === -1) {
            cart.push(product);
        } else {
            cart[index].quantity++;
        }
        updateCartCount();
        updateCart();
        saveCart();
        redirectToCart();
    }

    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalCount;
    }

    function updateCart() {
        const cartTableBody = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        let totalPrice = 0;

        if (cartTableBody) {
            cartTableBody.innerHTML = '';
            cart.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.price} тг</td>
                    <td>${item.quantity}</td>
                    <td>${item.price * item.quantity} тг</td>
                    <td><button class="delete-btn" onclick="removeFromCart(${item.id})"></button></td>
                `;
                cartTableBody.appendChild(row);
                totalPrice += item.price * item.quantity;
            });

            totalPriceElement.textContent = totalPrice;
        }
    }

    function removeFromCart(id) {
        const index = cart.findIndex(item => item.id === id);
        if (index !== -1) {
            cart.splice(index, 1);
            updateCartCount();
            updateCart();
            saveCart();
        }
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function redirectToCart() {
        window.location.href = 'kor.html';
    }

    window.addToCart = addToCart;
    window.updateCart = updateCart;

    if (document.getElementById('cart-items')) {
        updateCart();
    }
});
