<template>
    <StripeElements v-if="stripeLoaded" v-slot="{ elements }" ref="elms" :stripe-key="stripeKey"
        :instance-options="instanceOptions" :elements-options="elementsOptions">
        <StripeElement ref="card" :elements="elements" :options="cardOptions" />
    </StripeElements>
    <RouterLink to="success">
        <button type="button" @click="pay">Pay</button>
    </RouterLink>
</template>
  

<script setup lang="ts">

import { StripeElements, StripeElement } from 'vue-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { defineComponent, ref, onBeforeMount } from 'vue'

const stripeLoaded = ref(false);
const card = ref();
const elms = ref();

const instanceOptions = ref({
    // https://stripe.com/docs/js/initializing#init_stripe_js-options
})
const elementsOptions = ref({
    // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
})
const cardOptions = ref({
    // https://stripe.com/docs/stripe.js#element-options
    value: {
        postalCode: '12345',
    },
})

const stripeKey = ref('pk_test_51Mk0utA80Tij0bnPXMSHBBOBk5CYgfdgSv0aMyzNQIIL5nucQLtSZUTFeX1PedqFOjD34KnrH8gEYN3i7fdCc7cH00Eawy3yUL') // test key

onBeforeMount(() => {
    const stripePromise = loadStripe(stripeKey.value)
    stripePromise.then(() => {
        stripeLoaded.value = true
    })
})

const pay = () => {
    // Get stripe element
    const cardElement = card.value.stripeElement

    // Access instance methods, e.g. createToken()
    elms.value.instance.createToken(cardElement).then((result: object) => {
        // Handle result.error or result.token
        console.log(result)
    })
}

</script>