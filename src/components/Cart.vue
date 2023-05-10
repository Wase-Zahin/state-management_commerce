<template>
    <div class="cartItem" v-for="product in cart" :key="product.id">
        <img class="productImg" :src="product.image">
        <div class="vr"></div>

        <div class="productInfo">
            <h2>{{ product.title }}</h2>
            <p class="productPrice">Price: ${{ product.price }}</p>
            <div class="quantityCounter">Quantity:
                <div class="counterBox">
                    <p @click="decrement(product.id)" class="operator">-</p>
                    <div class="separator"></div>
                    <p>{{ product.counter }}</p>
                    <div class="separator"></div>
                    <p @click="increment(product.id)" class="operator">+</p>
                </div>
            </div>
            <p class="productTotal">Total: ${{ product.price * product.counter }}</p>
        </div>
        <div @click="remove(product.id)" class="removeItem">x</div>
    </div>

    <div class="cartItem__bigScreen">
        <div class="item">
            <p>Item</p>
            <div v-for="product in cart" :key="product.id">
                <img class="productImg" :src="product.image">
            </div>
        </div>

        <div class="price">
            <p>Price</p>
            <div v-for="product in cart" :key="product.id">
                <p>{{ product.price }}</p>
            </div>
        </div>

        <div class="quantity">
            <p>Quantity</p>
            <div v-for="product in cart" :key="product.id">
                <p>{{ product.counter }}</p>
            </div>
        </div>

        <div class="total">
            <p>Total</p>
            <div v-for="product in cart" :key="product.id">
                <p>{{ product.counter * product.price }}</p>
                <!-- <div @click="remove(product.id)" class="removeItem">x</div> -->
            </div>
        </div>
        <div class="line"></div>
    </div>


    <RouterLink to="checkout">
        <button>Checkout</button>
    </RouterLink>
</template>

<script setup lang="ts">
import { store } from '@/store';
import { RouterLink } from 'vue-router';

const cart = computed(() => {
    return store.state.cart.cart;
});

const increment = (id: number) => {
    store.dispatch('cart/increment', id);
}

const decrement = (id: number) => {
    store.dispatch('cart/decrement', id);
}

const remove = (id: number) => {
    store.dispatch('cart/removeFromCart', id);
}

</script>

<style scoped lang="scss">
.cartItem {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid lightgray;
    padding: 1rem 6px;
    position: relative;
    width: 100%;

    .removeItem {
        position: absolute;
        top: 4%;
        right: 2%;
        border-radius: 50%;
        border: 1px solid black;
        color: rgb(255, 0, 0);
        padding: 1px 5px;
        text-align: end;
        cursor: pointer;
    }

    .removeItem:hover {
        filter: brightness(90%);
        border: 1px solid rgb(255, 0, 0);
    }

    .productImg {
        height: 120px;
        width: 120px;
        object-fit: cover;
    }

    h2 {
        font-size: 18px;
        font-weight: 600;
        text-align: center;
    }

    .productInfo {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;

        h2 {
            margin-top: 20px;
            margin-bottom: 6px;
        }

        .productPrice,
        .productTotal,
        .quantityCounter {
            text-align: end;
            margin-right: 1rem;
        }

        .quantityCounter {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            gap: 10px;

            .counterBox {
                display: flex;
                gap: 10px;
                padding: 2px 8px;
                width: fit-content;
                align-self: flex-end;
                border: 1px solid gray;
                border-radius: 6px;

                .separator {
                    min-height: 100%;
                    width: 1px;
                    background-color: gray;
                }

                .operator {
                    background-color: white;
                    cursor: pointer;
                }
            }
        }
    }

    .vr {
        height: 200px;
        width: 1px;
        margin: 0 1rem;
        background-color: lightgray;
    }

    @media (min-width: 768px) {
        display: none;
    }


}

.cartItem__bigScreen {
    display: flex;
    justify-content: space-around;
    width: 100%;
    position: relative;

    @media (max-width: 768px) {
        display: none;
    }

    .price,
    .item,
    .quantity,
    .total {
        display: grid;
        justify-items: center;
    }

    .item {
        gap: 2.5rem;
    }

    .line {
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: black;
    }
}</style>