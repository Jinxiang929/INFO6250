const state = {
    products: [
        { id: "jorts", name: "Jorts", price: 0.99, image: "http://placehold.co/70x70?text=Jorts" },
        { id: "jean", name: "Jean", price: 3.14, image: "http://placehold.co/70x70?text=Jean" },
        { id: "nyancat", name: "Nyancat", price: 2.73, image: "http://placehold.co/70x70?text=Nyancat" }
    ],
    cart: {},
    isCartVisible: false
};

export const addToCart = (productId) => {
    const product = state.products.find(product => product.id === productId);
    if (product) {
        if (state.cart[productId]) {
            state.cart[productId].quantity += 1;  
        } else {
            state.cart[productId] = {...product, quantity: 1}; 
        }
    }
}

export const updateCartQuantity = ( productId, quantity ) => {
    if(quantity <= 0) {
        delete state.cart[productId];
    } else if (state.cart[productId]) {
        state.cart[productId].quantity = quantity;
    }
};

export const clearCart = () => {
    state.cart = {};
    state.isCartVisible = false;
}

export const toggleCartView = () => {
    state.isCartVisible = !state.isCartVisible;
};

export default state;
