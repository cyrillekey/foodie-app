import { dummyData } from '../../constants';
import * as productActions from './productActionTypes';
import * as cartActions from '../cart/cartActionTypes';
const initialState = {
    products:dummyData.menu[1].list,
    favourites:[],
    order:[],
    qty:0,
    cartItems:[],
    cartTotal:0,
    shippingCost:6,
    cartDiscount:0,
};
const productReducer = (state = initialState,action )=>{
    switch (action.type) {
        case productActions.ADD_PRODUCTS:
            break;
        case cartActions.ADD_TO_CART:
            if (state.cartItems.length > 0){
            let exist = state.cartItems.find(cart=>cart.id == action.payload.id);
            if (exist){
                const tempCart = [...state.cartItems]
                let index = state.cartItems.indexOf(exist);
                tempCart[index].qty += action.payload.qty;
                let total = tempCart[index].price * action.payload.qty
                return {...state,cartItems:tempCart,qty:state.qty + action.payload.qty,cartTotal:state.cartTotal+ total};
            } else {
            let item = state.products.find(product=>product.id == action.payload.id);
            item.qty = action.payload.qty;
            let total = item.price * action.payload.qty
            return {...state,cartItems:state.cartItems.concat([item]),qty:(state.qty) + action.payload.qty,cartTotal:state.cartTotal + total};}
            }
            else {
                let item = state.products.find(product=>product.id == action.payload.id);
                item.qty = action.payload.qty;
                let total = item.price * action.payload.qty;
                return {...state,cartItems:[item],qty:(state.qty) + action.payload.qty,cartTotal:total};
            }
        case cartActions.REMOVE_FROM_CART:
            let exist = state.cartItems.find(cart=>cart.id == action.payload.id);
            let index = state.cartItems.indexOf(exist);
            const tempCart = [...state.cartItems];
            let tempCost =exist.qty * exist.price;
            let tempQty = exist.qty;
            console.log(index)
            tempCart.splice(index,1);
            return {...state,cartItems:tempCart,qty:state.qty - tempQty,cartTotal:state.cartTotal - tempCost};
        case cartActions.REDUCE_QTY:
            let item = state.cartItems.find(cart=>cart.id == action.payload.id);
            const tempCartReduce = [...state.cartItems];
            let indexOf = state.cartItems.indexOf(item);
            if (item.qty == 1){
                action.type=cartActions.REMOVE_FROM_CART
                return state;
            }
            tempCartReduce[indexOf].qty -= 1;
            return {...state,tempCartReduce,cartItems:tempCartReduce,qty:state.qty - 1,cartTotal:state.cartTotal-item.price};
        case cartActions.INCREASE_QTY:
            let itemAdd = state.cartItems.find(cart=>cart.id == action.payload.id);
            const tempCartAdd = [...state.cartItems];
            let indexOfAdd = state.cartItems.indexOf(itemAdd);
            tempCartAdd[indexOfAdd].qty += 1;
            return {...state,cartItems:tempCartAdd,qty:state.qty + 1,cartTotal:state.cartTotal+itemAdd.price};
        case productActions.ADD_FAVOURITE:
            if (state.favourites.length > 0){
                let favItem = state.products.find(product=>product.id == action.payload.id);
                favItem.isFavourite = true;
                return {...state,favourites:state.favourites.concat(favItem)};
            } else {
                let favItem= state.products.find(product=>product.id == action.payload.id);
                favItem.isFavourite = true;
                return {...state,favourites:[favItem]};
            }
        case productActions.REMOVE_FAVOURITE:
            return state;
        default:
            return state;
    }
};
export default productReducer;
