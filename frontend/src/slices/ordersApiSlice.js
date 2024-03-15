import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

console.log('PAYPAL_URL', PAYPAL_URL)

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            })
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                //no need to say method: 'GET' bc its GET by default
            }),
            keepUnusedDataFor: 5 //seconds
        }),
        payOrder: builder.mutation({
            query: ({orderId, details}) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: {...details}
            })
        }),
        getPayPalClientId : builder.query({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5
        }),
    }),
}); 
//we are going to inject the orders to the api slice which is connected to the store

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery } = ordersApiSlice;