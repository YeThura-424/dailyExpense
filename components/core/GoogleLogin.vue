<template>
    <button
        class="flex w-full justify-center items-center border border-gray-500 px-4 py-3 rounded-lg text-gray-500  font-medium hover:text-black hover:bg-gray-100"
        @click="signIn('google')">
        <Icon name="ion:logo-google" class="mr-4 h-6 w-6" />
        Log in with Google
    </button>
</template>

<script setup lang="ts">
const { signIn } = useAuth()
</script>
