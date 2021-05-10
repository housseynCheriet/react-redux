import { ADD_TO_CART, CHEK_IF_ITEM_EXIST_IN_CART, GET_PRODUCTS_LIST, GET_TOTAL_PRICE, REMOVE_FROM_CART } from "../types";
import { stockData } from './../product'
const initState = {
    products: stockData,
    cart: [],
    total_price: 0,
    itemIsExistInCart: false
}
function itemIsExistInCart(action){
    // //console.log("from reducer: ", state)
            // const cart_product = state.cart
            var cart_product = [];
            if(localStorage.getItem("cart") !== null){ 
                console.log((localStorage))
                cart_product = JSON.parse(localStorage.getItem("cart"))
            }
            var check_if_item_exist_in_cart = false
            console.log("thana ",action.product_id)
            console.log("cart ",cart_product)
            cart_product.map(item => (
               // console.log("action.product_id:  ",action.product_id),
               // console.log("check_if_item_exist_in_cart: ",product.id.indexOf(action.product_id) !== -1),
                 check_if_item_exist_in_cart = item.product.id.indexOf(action.product_id) !== -1
            ))
            return check_if_item_exist_in_cart;
}
function upsert(cart, cartItems) { 
  const i = cart.findIndex(_item => _item.product.id === cartItems.product.id);
  if (i > -1) {
    cartItems.qty+=cart[i].qty;
  cart[i] = cartItems; 
  }
  else cart.push(cartItems);
}
const getProductListReducer = function (state = initState, action) {
    //console.log(state.products[0].id);
    ///////////localStorage.clear()
    switch (action.type) {

        case GET_PRODUCTS_LIST:
            //console.log("from reducer: ", state)
            return state;

        case ADD_TO_CART:
        var _itemIsExistInCart=itemIsExistInCart(action);
        if(localStorage.getItem("cart") !== null){
            state.cart = JSON.parse(localStorage.getItem("cart"))
        }
            const productItem = state.products.find(product =>
                product.id === action.product_id);
              const cartItems = {
                product: productItem,
                qty: Number(action.qty)
            }
            upsert(state.cart, cartItems)
           /* const cartItems = [...state.cart,{
                product: productItem,
                qty: action.qty
            }]*/
            ///////localStorage.removeItem("cart")
            console.log("cartItems: ",cartItems)
            
            //console.log("JSON.stringify(cartItems):  ",JSON.stringify(cartItems))
            //console.log("test JSON.parse:  ",((localStorage.getItem("cart"))))
            //state.cart = cartItems
            console.log("add to cart: " , state)
            /* */
            state.cart.map(item => (
                state.total_price += item.product.price * item.qty
            ));
            localStorage.setItem("total_price",state.total_price);
            localStorage.setItem("cart",JSON.stringify(state.cart))
            /* */ 
            return state;

        case REMOVE_FROM_CART:
            // //console.log("from reducer: ", state)
            const ProductAfterRemove = state.products.filter(product =>
                product.id !== action.product_id);
                localStorage.setItem("cart",ProductAfterRemove)
            state.cart = ProductAfterRemove
            /* */
            state.cart.map(item => (
                state.total_price += item.product.price * item.qty
            ));
            localStorage.setItem("total_price",state.total_price)
            /* */
            return state;

        case GET_TOTAL_PRICE:
            ///console.log("from reducer: ", state)
            state.cart = JSON.parse(localStorage.getItem("cart"))
            console.log("thana thana thana thana thana thana thana thana thana thana :",state.cart)
            state.cart.map(item => (
                state.total_price += item.product.price * item.qty
            ));
            localStorage.setItem("total_price",state.total_price)
            return state;

        case CHEK_IF_ITEM_EXIST_IN_CART:
            
             state.itemIsExistInCart = itemIsExistInCart(action);
            return state;
            
        default:
            return state;
    }
}


export default getProductListReducer

