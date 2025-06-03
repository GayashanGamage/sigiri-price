<template>
    <div class="xl:grid xl:grid-cols-2 md:grid md:grid-cols-1 gap-4 w-full">
        <div class="flex flex-col p-4 border-2 border-gray-200 rounded-md gap-4 bg-gray-50 hover:bg-gray-100">
            <h3 class="font-semibold text-xl">Personal Infomation</h3>
            <div class="flex flex-col gap-2">
                <div class="flex flex-row">
                    <p class="text-gray-400 font-normal mr-4">First name : </p>
                    <p class="text-gray-400 font-bold">Gayashan Gamage</p>
                </div>
                <div class="flex flex-row overflow-hidden">
                    <p class="text-gray-400 font-normal mr-4">Email </p>
                    <p class="text-gray-400 font-bold">gayashan.randimagamage@gmail.com</p>
                </div>
                <div class="flex flex-row">
                    <p class="text-gray-400 font-normal mr-4">Account created : </p>
                    <p class="text-gray-400 font-bold">1st of june, 2025</p>
                </div>
            </div>
        </div>
        <div class="sm:grid sm:grid-cols-2 gap-4 grid grid-cols-1 md:mt-0 mt-4">
            <div class="flex flex-col p-4 border-2 border-gray-200 rounded-md gap-4 bg-gray-50 hover:bg-gray-100">
                <h3 class="font-semibold text-xl">Freez notifications</h3>
                <p class="text-gray-400 font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium hic minima</p>
                <button class="border-2 font-semibold text-sm py-1 rounded-sm hover:bg-[var(--button-hover)] hover:border-[var(--button-hover)] hover:text-white active:bg-[var(--button-activate)] active:border-[var(--button-activate)] active:text-white">Freez notifications</button>
            </div>
            <div class="flex flex-col p-4 border-2 border-gray-200 rounded-md gap-4 bg-gray-50 hover:bg-gray-100">
                <h3 class="font-semibold text-xl">Change password</h3>
                <p class="text-gray-400 font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium hic minima</p>
                <button class="border-2 font-semibold text-sm py-1 rounded-sm hover:bg-[var(--button-hover)] hover:border-[var(--button-hover)] hover:text-white active:bg-[var(--button-activate)] active:border-[var(--button-activate)] active:text-white">Change password</button>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>