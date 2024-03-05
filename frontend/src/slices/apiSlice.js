import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // fetchBaseQuery will allow us to make a request to our backend api
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User'], //types of data we are fetching from our api
    endpoints: (builder) => ({}), //because of this we dont need to fetch our data with try catch
});