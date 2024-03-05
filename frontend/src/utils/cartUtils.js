

export const addDecimals = (number)=> {
    return (Math.round(number * 100)/100).toFixed(2);
};
//to make sure they have 2 decimals 

export const updateCart = (state) => {
    // Calculate Items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((accumulator, item) => accumulator + item.price * item.qty, 0));
    // reduce() is a high order array method which we can use to add all prices together
    //default for the accumulator is 0


    // Calculate shipping price (If order is over $100 then free, else $10 shipping) - i can decide whatever shipping policy i want
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
    
    
    // Calculate tax price (15% tax)
    state.taxPrice = addDecimals(Number((state.itemsPrice * 0.15).toFixed(2)));


    // Calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) + 
        Number(state.shippingPrice) + 
        Number(state.taxPrice)
    ).toFixed(2);


    localStorage.setItem('cart', JSON.stringify(state)); // save state to localStorage

    return state;
};