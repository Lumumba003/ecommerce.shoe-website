import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    deliveryFee: 15,
    freeDeliveryFrom: 200,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            const newProduct = action.payload.product;

            // Ensure the product object is valid
            if (!newProduct?.id || !newProduct?.price) {
                console.warn("Invalid product added:", newProduct);
                return;
            }

            const cartItem = state.items.find(
                (item) => item.product.id === newProduct.id
            );

            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                state.items.push({ product: newProduct, quantity: 1 });
            }
        },
        changeQuantity: (state, action) => {
            const { productId, amount } = action.payload;
            const cartItem = state.items.find(item => item.product.id === productId);

            if (cartItem) {
                cartItem.quantity += amount;
            }

            if (cartItem?.quantity <= 0) {
                state.items = state.items.filter(item => item.product.id !== productId);
            }
        },
    },
});

// Selector for subtotal with validation
export const selectSubtotal = (state) =>
    state.cart.items.reduce((sum, item) => {
        if (item?.product?.price) {
            return sum + item.product.price * item.quantity;
        } else {
            console.warn("Item missing price or product:", item);
            return sum;
        }
    }, 0);

// Selector for the number of items in the cart
export const selectNumberOfItems = (state) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0);

export const { addCartItem, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;

 