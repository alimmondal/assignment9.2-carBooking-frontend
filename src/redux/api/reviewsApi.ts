import { IMeta, IReviews } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const REVIEWS_URL = "/reviews";
export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all reviews
    reviews: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${REVIEWS_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IReviews[], meta: IMeta) => {
        return {
          comments: response,
          meta,
        };
      },
      providesTags: [tagTypes.comment],
    }),

    // post reviews

    addReviews: build.mutation({
      query: (data) => ({
        url: `${REVIEWS_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.reviews],
    }),

    getReview: build.query({
      query: (id: string) => ({
        url: `${REVIEWS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.comment],
    }),
    // update student
    updateReviews: build.mutation({
      query: (data) => ({
        url: `${REVIEWS_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.comment],
    }),

    // delete student
    deleteReviews: build.mutation({
      query: (id) => ({
        url: `${REVIEWS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.comment],
    }),
  }),
});

export const {
  useAddReviewsMutation, // create
  useReviewsQuery, // get all
  useGetReviewQuery, // get single
  useUpdateReviewsMutation, // update
  useDeleteReviewsMutation, // delete
} = reviewsApi;
