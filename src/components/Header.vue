<template>
    <div class="header">
        <RouterLink to="home">
            <img :src="logo" class="logo">
        </RouterLink>
        <div class="searchBarContainer">
            <input type="text" v-model="query" @input="search" placeholder="Search for products...">
            <IconEpSearch class="searchIcon" />
            <div class="searchResults">
                <div v-for="product in filteredResults" :key="product.id">
                    <RouterLink :to="{ name: 'product', params: { id: product.id } }">
                        <h3>{{ product.title }}</h3>
                        <hr>
                    </RouterLink>
                </div>
            </div>
        </div>
        <IconEpFold @click="toggleMenu" class="menuIcon" />

        <!-- div that will render on large screen -->
        <div class="navBar__BigScreen">
            <RouterLink to="shop">Shop</RouterLink>
            <RouterLink to="cart">
                <IconEpCart class="cartIcon" />
            </RouterLink>
        </div>
    </div>
    <div v-if="menu" class="navBar__SmallScreen">
        <RouterLink to="shop">Shop</RouterLink>
        <RouterLink to="cart">Cart</RouterLink>
    </div>
</template>

<script setup lang="ts">
import { store } from '@/store';
import type { RouterLink } from 'vue-router';
import IconEpFold from '~icons/ep/fold';
import IconEpSearch from '~icons/ep/search';
import IconEpCart from '~icons/ep/shopping-cart';
import logo from '../assets/logo.png';

const menu = ref(false);
const query = ref('');

const toggleMenu = () => {
    menu.value = !menu.value;
}

const filteredResults = computed(() => {
    return store.state.search.results;
})

const search = () => {
    store.dispatch('search/searchProducts', query.value);
}

</script>

<style lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: crimson;
}

.navBar__BigScreen {
    display: none;

    @media (min-width: 550px) {
        display: flex;
        gap: 1rem;
    }
}

.navBar__SmallScreen {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    background-color: black;
    color: white;

    @media (min-width: 550px) {
        display: none;
    }
}

.menuIcon {
    @media (min-width: 550px) {
        display: none;
    }
}

.searchBarContainer {
    position: relative;

    input {
        padding: 6px 3px;
        padding-left: 10px;
        border-radius: 15px;
    }
}

.searchIcon {
    position: absolute;
    right: 4%;
    top: 18%;
}

.logo,
.cartIcon {
    height: 30px;
    width: 30px;
}

.searchResults {
    // position: absolute;
    top: 100%;
    background-color: black;
    width: 100%;
    min-height: 100%;
    outline: 1px solid lightgray;
}

a {
    text-decoration: none;
    color: wheat;

    h3 {
        padding: 16px;
    }
}
</style>