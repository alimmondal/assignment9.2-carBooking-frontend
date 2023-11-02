import { IMeta, IAdmin as IUser } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addUserWithFormData: build.mutation({
      query: (data) => ({
        url: "/users/create-user",
        method: "POST",
        data,
        // contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    users: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: USER_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IUser[], meta: IMeta) => {
        return {
          admins: response,
          meta,
        };
      },
      providesTags: [tagTypes.admin],
    }),

    user: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),

    updateUser: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useUsersQuery,
  useUserQuery,
  useAddUserWithFormDataMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
