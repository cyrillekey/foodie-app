//import { dummyData } from '../../constants';
import * as productActions from './productActionTypes';
import * as cartActions from '../cart/cartActionTypes';
const initialState = {
    products:[],
    favourites:[],
    order:[],
    qty:0,
    cartItems:[],
    cartTotal:0,
    shippingCost:6,
    cartDiscount:0,
    categories:[],
};
const productReducer = (state = initialState,action )=>{
    switch (action.type) {
        case productActions.ADD_PRODUCTS:
            return {...state,products:action.payload.food};
        case cartActions.ADD_TO_CART:
            if (state.cartItems.length > 0){
            let exist = state.cartItems.find(cart=>cart.food_id === action.payload.id);
            if (exist){
                const tempCart = [...state.cartItems];
                let index = state.cartItems.indexOf(exist);
                tempCart[index].qty += action.payload.qty;
                let total = tempCart[index].food_price * action.payload.qty;
                console.log(total);
                return {...state,cartItems:tempCart,qty:state.qty + action.payload.qty,cartTotal:state.cartTotal + total};
            } else {
                console.log("im called");
            let item = state.products.find(product=>product.food_id === action.payload.id);
            item.qty = action.payload.qty;
            let total = item.food_price * action.payload.qty;
            return {...state,cartItems:state.cartItems.concat([item]),qty:(state.qty) + action.payload.qty,cartTotal:state.cartTotal + total};}
            }
            else {
                let item = state.products.find(product=>product.food_id === action.payload.id);
                item.qty = action.payload.qty;
                let total = item.food_price * action.payload.qty;
                return {...state,cartItems:[item],qty:(state.qty) + action.payload.qty,cartTotal:total};
            }
        case cartActions.REMOVE_FROM_CART:
            let exist = state.cartItems.find(cart=>cart.food_id === action.payload.id);
            let index = state.cartItems.indexOf(exist);
            const tempCart = [...state.cartItems];
            let tempCost = exist.qty * exist.food_price;
            let tempQty = exist.qty;
            tempCart.splice(index,1);
            return {...state,cartItems:tempCart,qty:state.qty - tempQty,cartTotal:state.cartTotal - tempCost};
        case cartActions.REDUCE_QTY:
            {
            let item = state.cartItems.find(cart=>cart.food_id === action.payload.id);
            const tempCartReduce = [...state.cartItems];
            let indexOf = state.cartItems.indexOf(item);
            if (item.qty == 1){
                action.type = cartActions.REMOVE_FROM_CART;
                return state;
            }
            tempCartReduce[indexOf].qty -= 1;
            return {...state,tempCartReduce,cartItems:tempCartReduce,qty:state.qty - 1,cartTotal:state.cartTotal - item.food_price};
            }
        case cartActions.INCREASE_QTY:
            {
            let itemAdd = state.cartItems.find(cart=>cart.food_id === action.payload.id);
            const tempCartAdd = [...state.cartItems];
            let indexOfAdd = state.cartItems.indexOf(itemAdd);
            tempCartAdd[indexOfAdd].qty += 1;
            return {...state,cartItems:tempCartAdd,qty:state.qty + 1,cartTotal:state.cartTotal + itemAdd.food_price};
            }
        case productActions.ADD_FAVOURITE:
            if (state.favourites.length > 0){
                let favItem = state.products.find(product=>product.food_id === action.payload.id);
                favItem.isFavourite = true;
                return {...state,favourites:state.favourites.concat(favItem)};
            } else {
                let favItem = state.products.find(product=>product.food_id === action.payload.id);
                favItem.isFav = true;
                return {...state,favourites:[favItem]};
            }
        case productActions.REMOVE_FAVOURITE:
            let item = state.favourites.find(fav=>fav.food_id === action.payload.id);
            let indexO = state.favourites.indexOf(item);
            const tempFav = [...state.favourites];
            tempFav.splice(indexO,1);
            return {...state,favourites:tempFav};
        case productActions.SAVE_CATEGORY:
            return {...state,categories:action.payload.categories};
        default:
            return state;
    }
};
export default productReducer;
