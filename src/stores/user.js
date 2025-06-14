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
        document.cookie = `token=${tokenkey}; expires=Thu, 31 Dec 2026 12:00:00 UTC;`;
        // localStorage.setItem('token', tokenkey)
    }

    const restoreToken = () => {
        const allTokens = document.cookie.split(';')
        for (let index = 0; index < allTokens.length; index++) {
            console.log(allTokens[index])
            if(allTokens[index].startsWith('token')){
                token.value = allTokens[index].slice(6, allTokens[index].length)
            }            
        }
        if(token.value == null){
            removeToken()
            return false
        }else{
            return true
        }
    }

    const removeToken = () => {
        token.value = null
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }

    return { personalData, userData, token, storeToken, restoreToken, removeToken } 
})