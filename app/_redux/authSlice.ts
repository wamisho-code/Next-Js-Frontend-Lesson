import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserPayload } from "../dto/dtos";

interface AuthState{
    token:string | null;
    user:UserPayload | null;
    isAutheniticated:boolean;
}
const initialState:AuthState={
    token:null,
    user:null,
    isAutheniticated:false,
};
const authSLice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(
            state,
            action:PayloadAction<{
                token:string;
                user:UserPayload;
            }>
        )=>{
            state.token=action.payload.token;
            state.user=action.payload.user;
            state.isAutheniticated=true;
        },
        logout:(state)=>{
            state.token=null;
            state.user=null;
            state.isAutheniticated=false;
        }
    }
})
export const {setCredentials,logout}= authSLice.actions;
export default authSLice.reducer;