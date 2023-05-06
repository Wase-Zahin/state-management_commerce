import type { Module } from "vuex";

export interface Product {
    id: number,
    category: string,
    description: string,
    image: string,
    price: number,
    rating: {
        rate: number,
        count: number,
    },
    title: string
}

export interface ProductsState {
    products: Product[]
}

export const products: Module<ProductsState, any> = {
    namespaced: true,
    state: {
        products: [],
    },
    mutations: {
        setProducts(state: ProductsState, fetchedProducts: Product[]) {
            state.products = fetchedProducts;
        },
    },
    actions: {
        fetchProducts: async ({ commit }) => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                commit('setProducts', data);
            } catch (err) {
                console.log(err);
            }
        },
    }
};
