import type { Module } from "vuex";
import type { Product } from "./products";

export interface Search {
    id: number,
    title: string,
}

export interface SearchState {
    results: Search[]
}

export const search: Module<SearchState, any> = {
    namespaced: true,
    state: {
        results: [],
    },
    mutations: {
        setSearch(state: SearchState, results: Search[]) {
            state.results = results;
        }
    },
    actions: {
        searchProducts: ({ commit, rootState }, query: string) => {
            const filteredProducts = rootState.products.products.filter((product: Product) => {
                return product.title.toLowerCase().includes(query.toLowerCase())
                }
            );
            commit('setSearch', filteredProducts);
        }
    }
}