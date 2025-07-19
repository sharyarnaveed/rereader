import { create } from "zustand";

const useSaveInfo=create((set)=>({
    userid:'',

    setUserid:(newuserid)=> set({userid:newuserid})
}))

export default useSaveInfo