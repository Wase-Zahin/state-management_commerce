<template>
    <div class="full-bg">
        <div class="background">
            <div class="mid">
                <div class="shopInvitation">
                    <h2>We're here for all <br>of your shopping needs!</h2>
                    <div to="/shop">
                        <div class="shopBtn">
                            <h3>Shop Now</h3>
                        </div>
                    </div>
                </div>
                <img :src="vector" class="bg-img" alt="vector background">
            </div>
        </div>
        <img :src="wave" alt="wave background">
    </div>
</template>
  
<script setup lang="ts">
import vector from '../assets/vector.jpg';
import wave from '../assets/wave.svg';
</script>
  
<style lang="scss">
.full-bg {
    margin-bottom: -4px;

    .background {
        position: relative;
        max-width: 1920px;
        height: 60vh;
        z-index: 1;

        .mid {
            font-family: 'Roboto', sans-serif;
            position: relative;
            padding-top: 8rem;
            height: fit-content;
            width: fit-content;
            margin: auto;
            font-size: 2rem;
            font-weight: bold;
            text-align: center;
            box-sizing: border-box;

            .shopInvitation {
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 2rem;

                .shopBtn {
                    cursor: pointer;
                    height: fit-content;
                    width: fit-content;
                    background: rgba(54, 54, 54, 0.5);
                    box-shadow: -2px -2px 5px rgb(255, 174, 0), 3px 3px 5px rgb(0, 177, 221);
                    border: 3px solid rgb(0, 0, 0);
                    color: #000000;
                    text-shadow: 3px 3px 5px white;
                    padding: 0.5rem 2rem;
                    border-radius: 1rem;

                    &:hover {
                        filter: brightness(90%);
                    }
                }
            }
        }
    }

    .bg-img {
        position: absolute;
        background-size: cover;
        max-width: 100%;
        top: 50%;
        left: 50%;
        /* bring your own prefixes */
        transform: translate(-50%, -50%);
        z-index: -1000;
        opacity: 0.6;
        margin: auto;
    }

    @media screen and (max-width: 750px) {
        .background {
            .mid {
                font-size: 1.5rem;
            }
        }
    }

    @media screen and (max-width: 500px) {
        .background {
            .mid {
                font-size: 1.2rem;
            }
        }
    }

    @media screen and (max-width: 400px) {
        .background {
            .mid {
                font-size: 1.0rem;
            }
        }
    }

    @media screen and (max-width: 350px) {
        .background {
            .mid {
                font-size: 0.9rem;
            }
        }
    }
}
</style>
  