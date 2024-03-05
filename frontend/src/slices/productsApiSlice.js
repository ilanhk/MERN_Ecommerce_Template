import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts : builder.query({
            query: ()=> ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5 //5 seconds
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5,
        })
    }), // any endpoints that have to do with products will go into the builder obj

});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice; // convention to add use and Query to the endpoint in this case getProducts
// we can use useGetProductsQuery to fetch our products data
// when using apiSlice we need to follow convention for each reducer of productsApiSlice since its a child of apiSlice