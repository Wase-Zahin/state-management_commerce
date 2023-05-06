import type { Module } from "vuex";

export interface CartProduct {
    id: number,
    category: string,
    description: string,
    image: string,
    price: number,
    rating: {
        rate: number,
        count: number,
    },
    title: string,
    counter: number,
}

export interface CartState {
    cart: CartProduct[]
}

export const cart: Module<CartState, any> = {
    namespaced: true,
    state: {
        cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    },
    mutations: {
        addToCart(state: CartState, addedProduct: CartProduct) {
            const existingProduct = state.cart.find(product => product.id === addedProduct.id);
            if (existingProduct) {
                existingProduct.counter += 1;
            } else {
                state.cart.push({
                    ...addedProduct,
                    counter: 1,
                });
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeFromCart(state: CartState, productId: number) {
            const index = state.cart.findIndex(product => product.id === productId);
            if (index !== -1) {
                state.cart.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        increment(state: CartState, id: number) {
            state.cart.find((product) => {
                if (product.id === id) {
                    product.counter += 1;
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        decrement(state: CartState, id: number) {
            state.cart.find((product) => {
                if (product.counter > 0 && product.id === id) {
                    product.counter -= 1;
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        clearCart(state: CartState) {
            state.cart = [];
            localStorage.removeItem('cart');
        },
    },
    actions: {
        addToCart: async ({ commit }, id: number) => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();
                commit('addToCart', data);
            } catch (error) {
                console.log(error);
            }
        },
        removeFromCart: ({ commit }, productId: number) => {
            commit('removeFromCart', productId);
        },
        clearCart: ({ commit }) => {
            commit('clearCart');
        },
        increment: ({ commit }, id: number) => {
            commit('increment', id);
        },
        decrement: ({ commit }, id: number) => {
            commit('decrement', id);
        }
    },
};
