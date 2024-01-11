import {cart} from '../data/cart.js';

window.onload = () => {
    const total = cart.reduce((total, item) => total += item.priceCents / 100, 0).toFixed(2);
    document.querySelector(".total").innerText = `$${total}`

    cart.forEach(item => {
        
    })
}