

<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import loadingImage from '@/assets/images/loadingImage.png';
    import image2 from '@/assets/images/loadingImage2.png';
    import image3 from '@/assets/images/loadingImage3.png';

    const images: string[] = [loadingImage, image2, image3];
    const currentIndex = ref(0);
    let intervalId: number | null = null;

    const currentImage = ref(images[currentIndex.value]);
    const currentImageAlt = ref(`Image ${currentIndex.value + 1}`);

    onMounted(() => {
    startImageRotation();
    });

    onBeforeUnmount(() => {
    stopImageRotation();
    });

    function startImageRotation() {
    intervalId = setInterval(rotateImage, 500);
    }

    function stopImageRotation() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    }

    function rotateImage() {
    currentIndex.value = (currentIndex.value + 1) % images.length;
    currentImage.value = images[currentIndex.value];
    currentImageAlt.value = `Image ${currentIndex.value + 1}`;
    }
</script>

<template>
    <div class="loading-container">
        <img :src="currentImage" :alt="currentImageAlt" class="loading-image" />
        <p class="loading-text">Loading...</p>
    </div>
</template>

<style lang="scss">
    .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    }

    .loading-image {
    width: 200px;
    height: auto;
    }

    .loading-text {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    }
</style>