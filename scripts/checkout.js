import {cart} from '../data/cart.js';

window.onload = () => {
    // get cart from local storage
    // cart = JSON.parse(localStorage.getItem('cart'));
    
    updatePaymentSummary();

    cart.forEach(item => {
        document.querySelector('.order-summary').innerHTML += `
            <div class="cart-item-container" data-id="${item.id}">
            <div class="delivery-date">
            Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${item.image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${item.name}
                </div>
                <div class="product-price">
                $${(item.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                    Update
                </span>
                <span class="delete-quantity-link link-primary" data-id="${item.id}">
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                <div class="delivery-option">
                <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${item.id}">
                <div>
                    <div class="delivery-option-date">
                    Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                    FREE Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${item.id}">
                <div>
                    <div class="delivery-option-date">
                    Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                    $4.99 - Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${item.id}">
                <div>
                    <div class="delivery-option-date">
                    Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                    $9.99 - Shipping
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        `
    })

    const updateQuantityLinks = document.querySelectorAll('.update-quantity-link');

    const deleteQuantityLinks = document.querySelectorAll('.delete-quantity-link');

    updateQuantityLinks.forEach(link => {
        link.addEventListener('click', () => {
            // updateCart();
            updatePaymentSummary();
        })
    })

    deleteQuantityLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const index = cart.findIndex(item => item.id === link.dataset.id);
            cart.splice(index, 1);
            const cartItemContainers = document.querySelectorAll('.cart-item-container');
            cartItemContainers.forEach(container => {
                if (container.dataset.id === link.dataset.id) {
                    container.remove();
                }
            })
            updatePaymentSummary();

            localStorage.setItem('cart', JSON.stringify(cart))
        })
    })

    function updatePaymentSummary() {
        const [totalAmount, shippingFee, totalBeforeTax, estimatedTax, totalAfterTax] = document.querySelectorAll('.payment-summary-money');
        const total = cart.reduce((total, item) => total += (item.priceCents * item.quantity), 0);
        const totalQuantity = cart.reduce((total, item) => total += item.quantity, 0);
        totalAmount.innerText = `$${(total / 100).toFixed(2)}`

        shippingFee.innerText = `$${4.99}`;

        totalBeforeTax.innerText = `$${((total + 499) / 100).toFixed(2)}`;

        estimatedTax.innerText = `$${((total + 499) * 0.1 / 100).toFixed(2)}`;

        totalAfterTax.innerText = `$${((total + 499) * 1.1 / 100).toFixed(2)}`;

        document.querySelector('.payment-summary-quantity').innerText = `Items (${totalQuantity}):`;

        document.querySelector('.return-to-home-link').innerText = `${totalQuantity} items`;
    }
}