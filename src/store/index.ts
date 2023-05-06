import type { InjectionKey } from 'vue';
import { products, type ProductsState } from './products';
import { cart, type CartState } from './cart';
import { search, type SearchState } from './search';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

export interface State {
    products: ProductsState,
    cart: CartState,
    search: SearchState,
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    modules: {
        products,
        cart,
        search,
    },
})

// define your own `useStore` composition function
export function useStore() {
    return baseUseStore(key)
}