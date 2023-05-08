<template>
    <div class='checkoutStatus'>
        <div class='checkoutMessage'>
            <DoneIcon class='doneIcon' />
            <div>
                <h1>Payment successful!</h1>
                <p>Thank you for your purchase.</p>
                <p>Redirecting in {{ countdown }}...</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DoneIcon from '~icons/ic/baseline-cloud-done';
import router from '@/router';

// Set cart as an empty array
localStorage.setItem('cart', JSON.stringify([]));

const countdown = ref(10);

// Start countdown timer
const timer = setInterval(() => {
    countdown.value--;
}, 1000);

// Navigate to the homepage after countdown ends
const redirectTimer = setTimeout(() => {
    // Use your own navigate function
    router.push({ name: 'home' });
}, countdown.value * 1000);

// Clean up timers on unmount
onUnmounted(() => {
    clearInterval(timer);
    clearTimeout(redirectTimer);
});

</script>

<style lang="scss">
.checkoutStatus {
    height: 100vh;

    .checkoutMessage {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .doneIcon {
        font-size: 3rem;
        color: green;
    }
}
</style>