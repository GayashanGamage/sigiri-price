import { defineStore } from 'pinia'
import { ref } from 'vue';

export const siteStore = defineStore('siteStore', () => {
    const membersPopup = ref(false)
    const passwordReset = ref(false)
    const logoutPopup = ref(false)
    const signintoggle = ref(true) // true menan signin
    const qanda = [
        {
            q: "How to see my tracked product",
            a: "Click user icon from top-right side. from there select 'Track Product' tab",
        },
        {
            q: "is this free service",
            a: "yes. it's totaly free",
        },
        {
            q: "what are the other e-commerce webapplication I can track",
            a: "currently it's only sinhagiri.lk only. ",
        },
        {
            q: "how many product track per user account ?",
            a: "unlimitet products",
        },
        {
            q: "when I get email about the my tracked product ?",
            a: "if product price change toword to your price, then you will get an email notification. one email for a day. all product cover withing one email",
        },
        {
            q: "if this is free, then how to cover cost of the cervice as a web application",
            a: "this develop as a my pet project. not tried to monitize.",
        },
    ];  

    const howThisWork = [
        {
            'step' : 'fi fi-rr-circle-1',
            'description' : 'If your are still not a member of the SIGIRI PRICE - then create an account. otherwise login as a member.'
        },
        {
            'step' : 'fi fi-rr-circle-2',
            'description' : "go to 'https://singhagiri.lk/' web portal."
        },
        {
            'step' : 'fi fi-rr-circle-3',
            'description' : 'find a product that you want to get update on'
        },
        {
            'step' : 'fi fi-rr-circle-4',
            'description' : 'copy the entire URL or the product. for a example -"https://singhagiri.lk/product/samsung-galaxy-a06-6gb128gb"'
        },
        {
            'step' : 'fi fi-rr-circle-5',
            'description' : 'past copied link in our "Product URL" box and find out the accual product from our site.'
        },
        {
            'step' : 'fi fi-rr-circle-6',
            'description' : "put your prefference tracking price and in the product showcase and get price update to your email when actual price change toward your price."
        }
    ]   

  return { qanda, howThisWork, membersPopup, signintoggle, passwordReset, logoutPopup } 
})