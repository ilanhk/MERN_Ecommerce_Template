import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts : builder.query({
            query: ()=> ({
                url: PRODUCTS_URL,
            }),
            providesTags: ['Product'], //if not we would need to refresh the page
            keepUnusedDataFor: 5 //5 seconds
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',

            }),
            invalidatesTags: ['Product'], //stop it from being cashed so we will have fresh data (wont reload the page when create new product)
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url:  `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,

            }),
            invalidatesTags: ['Product'],
        }),
        uploadProductImage: builder.mutation({
            query: (data)=>({
                url: UPLOAD_URL,
                method: 'POST',
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url:  `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
        }),
    }), 
    // any endpoints that have to do with products will go into the builder obj

});

export const { 
    useGetProductsQuery, 
    useGetProductDetailsQuery, 
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation, 
} = productsApiSlice; // convention to add use and Query to the endpoint in this case getProducts
// we can use useGetProductsQuery to fetch our products data
// when using apiSlice we need to follow convention for each reducer of productsApiSlice since its a child of apiSlice