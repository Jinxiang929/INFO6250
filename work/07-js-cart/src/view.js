const appEl = document.querySelector('#app');

const renderProducts = ( state ) => {
    const productsContainer = document.querySelector(".products");
    if (!productsContainer) return;

    const html = state.products.map(product => `
        <li class="product">
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name} - $${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </li>
    `).join("");

    productsContainer.innerHTML = html;
};


const renderCart = ( state ) => {
    let cartContainer = document.querySelector(".cart");

    if (!cartContainer) {
        const newCartContainer = `
            <div class="cart"></div>
        `;
        appEl.innerHTML += newCartContainer; 
        cartContainer = document.querySelector(".cart"); 
    }

    if (!state.isCartVisible) {
        cartContainer.innerHTML = "";
        return;
    }
    
    let cartItemsHtml = '';
    for (const id in state.cart) {
        const item = state.cart[id];

        if (item.quantity === 0) continue;

        const total = (item.price * item.quantity).toFixed(2);
        cartItemsHtml += `
            <li class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <label for="quantity-${id}">Quantity:</label>
                <input type="number" class="cart-quantity" data-id="${id}" value="${item.quantity}" min="0">
                <p>Total: $${total}</p>
            </li>
        `;
    }

    if (cartItemsHtml === '') {
        cartContainer.innerHTML = `
            <p>Nothing in the cart</p>
            <button id="hide-cart">Hide Cart</button>
        `;
    } else {
        let totalCartPrice = 0;
        for (const id in state.cart) {
            const item = state.cart[id];
            if (item.quantity > 0) {
                totalCartPrice += item.price * item.quantity;
            }
        }
        totalCartPrice = totalCartPrice.toFixed(2);

        cartContainer.innerHTML = `
            ${cartItemsHtml}
            <p>Total: $${totalCartPrice}</p>
            <button id="checkout-button">Checkout</button>
            <button id="hide-cart">Hide Cart</button>
        `;
    }
};

const renderCartButton = ( state ) => {
    let cartButton = document.querySelector("#cart-button");
    if (!cartButton) {
        cartButton = document.createElement("button");
        cartButton.id = "cart-button";
        appEl.prepend(cartButton);
    }

    let totalItems = 0;
    for (const id in state.cart) {
        const item = state.cart[id];
        totalItems += item.quantity; 
    }
    cartButton.textContent = state.isCartVisible ? "" : `View Cart (${totalItems})`;
    
    if (state.isCartVisible) {
        cartButton.classList.add('hidden'); 
    } else {
        cartButton.classList.remove('hidden'); 
    }
};

export { renderProducts, renderCart, renderCartButton };
