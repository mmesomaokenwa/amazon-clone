export const cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [];
}

export function addToCart(productInfo, id, quantity) {
    let matchingItem;

    cart.forEach(item => {
        if (item.id === id) {
            matchingItem = item;
        }
    })

    if (matchingItem) {
        matchingItem.quantity += quantity;             
    } else {
        cart.push(productInfo);
    }
}

export function updateCartQuantity() {
    let totalQuantity = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity;
    })

    document.querySelector(".cart-quantity").innerText = totalQuantity;
}

export function displayAddedMessage(addedMessage, addedMessageTimeout, id) {
    addedMessage.style.opacity = '1';

    setTimeout(()=>{
        if (addedMessageTimeout[id]) {
          clearTimeout(addedMessageTimeout[id]);      
        }

        addedMessageTimeout[id] = setTimeout(() => {
            addedMessage.style.opacity = '0';
        }, 2000);
    })
}