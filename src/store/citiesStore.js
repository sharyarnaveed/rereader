import {create} from 'zustand';

import { persist,devtools } from 'zustand/middleware';

const cityStore=(set)=>
({
    cities:[],
    addCities:(cities)=>{
        set((state)=>({
            cities:[cities,...state.cities],
        }))
    },
})


const usecityStore=create(
    devtools(
        persist(cityStore,{
            name:"cityStore",
        })
    )
)

export default usecityStore;