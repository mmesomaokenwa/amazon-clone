import {cart} from '../data/cart.js';
import {updateCartQuantity, addToCart, displayAddedMessage} from '../data/cart.js';
import {products} from '../data/products.js';

window.onload = () => {
    const productsGrid = document.querySelector(".products-grid");
    
    products.forEach(product => {
        productsGrid.innerHTML += `
        <div class="product-container" data-id="${product.id}" data-price="${(product.priceCents / 100).toFixed(2)}" data-product-image="${product.image}">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary">
          Add to Cart
        </button>
      </div>`
    })

    const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

    const addedMessageTimeout = {};

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const product = button.parentElement;
            const productName = product.querySelector(".product-name").innerText;
            const productImage = product.getAttribute('data-product-image');
            const quantity = parseInt(product.querySelector("select").value);
            const priceInCents = parseInt(product.getAttribute('data-price') * 100);
            const id = product.getAttribute("data-id");
            
            const productInfo = {
                id: id,
                name: productName,
                image: productImage,
                quantity: quantity,
                priceCents: priceInCents
            }

            addToCart(productInfo, id, quantity);

            updateCartQuantity();

            localStorage.setItem('cart', JSON.stringify(cart));

            const addedMessage = product.querySelector('.added-to-cart');

            displayAddedMessage(addedMessage, addedMessageTimeout, id);
        });
    })
}