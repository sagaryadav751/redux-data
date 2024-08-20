import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // cartItems:[],
    cartItems:localStorage.getItem("cartItems")
    ?JSON.parse(localStorage.getItem("cartItems"))
    :[],
    cartTotalQty:0,
    cartTotalPrice:0
}

const cartSlice = createSlice({

        name:"cart",
        initialState,
        reducers :{
            addToCart(state,action){
                // console.log(state)
                // console.log(action.payload)
                // state.cartItems.push(action.payload)
                const itemIndex=state.cartItems.findIndex(
                    (item)=>item.id===action.payload.id
                );
                if(itemIndex>=0){
                    state.cartItems[itemIndex].cartTotalQty+=1
                }
                else{
                    let tempProducts={...action.payload,cartTotalQty:1};
                    state.cartItems.push(tempProducts)
                }
                
                localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
            },
            // eslint-disable-next-line no-unused-vars
        clearCart(state,action){
            state.cartItems=[]
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
        },
        decreaseCart(state,action){
            const itemIndex=state.cartItems.findIndex(
                (item)=>item.id===action.payload.id
            );
            if(state.cartItems[itemIndex].cartTotalQty>1){
                state.cartItems[itemIndex].cartTotalQty-=1
            }
            else if (state.cartItems[itemIndex].cartTotalQty===1){
                const nextCartItems=state.cartItems.filter(
                (item)=>item.id!==action.payload.id
                );
                state.cartItems=nextCartItems
                localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
            }
        },
        removeCart(state,action){
            const nextCartItems=state.cartItems.filter(
               
                (item)=>item.id!==action.payload.id
            );
            state.cartItems=nextCartItems
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
        }
        
        }
        

})

export const {addToCart,clearCart,increaseCart,decreaseCart,removeCart}=cartSlice.actions
export default cartSlice.reducer;

