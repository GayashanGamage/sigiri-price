import { defineStore } from 'pinia'
import { ref } from 'vue';

export const userStore = defineStore('userStore', () => {
    const userData = ref()
    const token = ref(null)
    const personalData = {
        name : 'Gayashan Gamage',
        email : 'gayashan.randimagamage@gmail.com',
        created : '1st of May, 2025',
        notificationFreez : true
    }

    // functions ------------------------------------------------------
    const storeToken = (tokenkey) => {
        token.value = tokenkey
        localStorage.setItem('token', tokenkey)
    }

    const restoreToken = () => {
        token.value = localStorage.getItem('token')
        if(token.value == null){
            return false
        }else{
            return true
        }
    }

    return { personalData, userData, token, storeToken, restoreToken } 
})