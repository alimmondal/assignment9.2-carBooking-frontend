import { ICars, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const CAR_LISTING_URL = "/listings";

export const carListingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all
    carListings: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: CAR_LISTING_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ICars[], meta: IMeta) => {
        return {
          cars: response,
          meta,
        };
      },
      providesTags: [tagTypes.car],
    }),

    // get single
    carListing: build.query({
      query: (id: string) => ({
        url: `${CAR_LISTING_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.car],
    }),
    // create
    addCar: build.mutation({
      query: (data) => ({
        url: `${CAR_LISTING_URL}/create-car`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.car],
    }),

    // update
    updateCar: build.mutation({
      query: (data) => ({
        url: `${CAR_LISTING_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.car],
    }),
    // delete
    deleteCar: build.mutation({
      query: (id) => ({
        url: `${CAR_LISTING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.car],
    }),
  }),
});

export const {
  useCarListingsQuery,
  useCarListingQuery,
  useAddCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation,
} = carListingApi;
