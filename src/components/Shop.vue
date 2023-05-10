<template>
    <el-carousel class="carouselContainer" arrow="always" indicator-position="none">
        <el-carousel-item v-for="product in filteredProducts" :key="product.id" class="banner">
            <img :src="product.image">
        </el-carousel-item>
    </el-carousel>
    <hr>

    <div id="shop">
        <div class="category__bigScreen">
            <h1>Catergories</h1>
            <hr>
            <div v-for="category in categories">
                <!-- extract the selected category name from click and use it to display -->
                <p @click="setCategory(category)">{{ category }}</p>
                <hr>
            </div>
        </div>
        <div class="main">
            <div class="filterBar">
                <div class="category__smallScreen">
                    <select class="selectBox">
                        <option value="category" selected>Category</option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                </div>
                <div class="filter">
                    <p>sort by:</p>
                </div>
            </div>

            <div class="categoryImgDiv">



                <div class="products">

                    <div class="productContainer" v-if="selectedCategory.length > 0" v-for="product in selectedCategory"
                        :key="product.id">
                        <RouterLink class="link" :to="{ name: 'product', params: { id: product.id } }">
                            <img class="productImg" :src="product.image">
                            <p>{{ product.title }}</p>
                        </RouterLink>
                    </div>

                    <div class="productContainer" v-else v-for="product__all in products" :key="product__all.id">

                        <RouterLink :to="{ name: 'product', params: { id: product__all.id } }">
                            <img class="productImg" :src="product__all.image">
                            <p>{{ product__all.title }}</p>
                        </RouterLink>

                        <div class="buttons">
                            <button>Buy now</button>
                            <button @click="addToCart(product__all.id)">Add to Cart</button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from '../store/index';
import type { Product } from '../store/products';
import { RouterLink } from 'vue-router';
import { ElCarousel, ElCarouselItem } from 'element-plus';

// variables
const store = useStore();
const selectedCategory = ref<Product[]>([]);

// computed properties
const products = computed(() => {
    return store.state.products.products;
});

// click event handlers
const setCategory = (category: string) => {
    selectedCategory.value.splice(0, selectedCategory.value.length);
    store.state.products.products.map((product) => {
        if (category === product.category) {
            selectedCategory.value.push(product);
        };
    });
    // console.log(selectedCategory.value)
};

const addToCart = (id: number) => {
    store.dispatch('cart/addToCart', id);
    console.log(store.state.cart.cart)
}

const filteredProducts = computed(() => {
    const filteredProducts: Product[] = [];
    products.value.forEach((product) => {
        if (filteredProducts.length < 6) {
            filteredProducts.push(product);
        }
    })
    console.log(filteredProducts);
    return filteredProducts;
})

// extract the category names
const categories = computed(() => {
    const uniqueCategories = new Set<string>();
    store.state.products.products.forEach((product: Product) => {
        uniqueCategories.add(product.category);
    });
    return Array.from(uniqueCategories);
});

// fetch all products on mount
onMounted(async () => {
    await store.dispatch('products/fetchProducts');
});
</script>
  
<style lang="scss">
main {
    background-color: #F0F0F0;
    height: 100vh;
    border: 1px solid black;
}

.productImg {
    height: 150px;
    width: 150px;
    object-fit: cover;
    padding: 1rem;
    align-self: center;
}

.filterBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    padding: 0 15px;
    width: 100%;
    background-color: lightslategrey;
}

.selectBox {
    padding: 0.3rem 1rem;
}

#shop {
    display: flex;
    margin: 1rem;
    gap: 1rem;
}

.categoryImgDiv {
    border: 1px solid black;
    padding: 1rem;
    background-color: white;

    @media (max-width: 620px) {
        grid-template-columns: auto;
    }
}

.category__bigScreen {
    text-align: center;
    height: fit-content;
    outline: 0.5px solid gray;
    border-radius: 10px;
    width: 100%;
    box-shadow: 2px 2px 5px gray;

    @media (max-width: 1100px) {
        display: none;
    }

    h1 {
        font-weight: 200;
        padding: 1rem 0;
        width: 100%;
        background-color: white;
    }

    p {
        font-size: 1.2rem;
        padding: 1rem 0;
        background-color: white;
    }

    div {
        width: 100%;
        cursor: pointer;
    }
}

.category__smallScreen {
    @media (min-width: 620px) {
        display: none;
    }
}

.products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
}

.productContainer {
    display: flex;
    flex-direction: column;
    width: 200px;
    gap: 10px;
    border: 0.5px solid gray;
    padding: 1rem;
    justify-content: space-between;
    background-color: white;
    border-radius: 10px;
    box-shadow: 2px 2px 5px gray;

    a {
        color: black;
        text-decoration: none;
        display: flex;
        flex-direction: column;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        gap: 6px;

        button {
            width: 100%;
            padding: 6px 0;
            background-color: rgb(47, 0, 47);
            color: aliceblue;
            cursor: pointer;
        }
    }
}

.carouselContainer {
    height: 100%;
    padding: 5rem 0;

    .banner {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            object-fit: cover;
            max-width: 100%;
            height: 100%;
        }
    }
}
</style>