import state, { addToCart, updateCartQuantity, clearCart, toggleCartView} from './model';
import { renderProducts, renderCart, renderCartButton } from './view';

const addEventListeners = ( state ) => {
    document.addEventListener('click', (e) => {
        
        if (e.target.classList.contains('add-to-cart')) {
            addToCart(e.target.dataset.id);
            renderCart(state);
            renderCartButton(state);
        
        } else if (e.target.id === 'cart-button' || e.target.id === 'hide-cart') {
            toggleCartView();
            renderCart(state);
            renderCartButton(state);

        } else if (e.target.id === 'checkout-button') {
            clearCart();
            renderCart(state);
            renderCartButton(state);
        }
    });

    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('cart-quantity')) {
            updateCartQuantity(e.target.dataset.id, parseInt(e.target.value));
            renderCart(state);
            renderCartButton(state);
        }
    });
};

renderProducts(state);
renderCartButton(state);
addEventListeners(state);