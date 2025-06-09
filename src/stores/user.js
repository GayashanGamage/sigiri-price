import { defineStore } from 'pinia'
import { ref } from 'vue';

export const userStore = defineStore('userStore', () => {
    const userData = ref()
    const personalData = {
        name : 'Gayashan Gamage',
        email : 'gayashan.randimagamage@gmail.com',
        created : '1st of May, 2025',
        notificationFreez : true
    }

    return { personalData, userData } 
})