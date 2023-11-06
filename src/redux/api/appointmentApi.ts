import { IMeta, IReservation } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const RESERVATION_URL = "/appointments";
export const appointmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    appointments: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: RESERVATION_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IReservation[], meta: IMeta) => {
        return {
          appointments: response,
          meta,
        };
      },
      providesTags: [tagTypes.reservation],
    }),

    appointment: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${RESERVATION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.reservation],
    }),

    addAppointment: build.mutation({
      query: (data) => ({
        url: `${RESERVATION_URL}/book-appointment`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.reservation],
    }),

    updateAppointment: build.mutation({
      query: (data) => ({
        url: `${RESERVATION_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.reservation],
    }),

    approveAppointment: build.mutation({
      query: (data) => ({
        url: `${RESERVATION_URL}/approve-appointment/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.reservation],
    }),

    cancelAppointment: build.mutation({
      query: (data) => ({
        url: `${RESERVATION_URL}/cancel-appointment/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.reservation],
    }),

    deleteAppointment: build.mutation({
      query: (id) => ({
        url: `${RESERVATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.reservation],
    }),

    startRegistration: build.mutation({
      query: () => ({
        url: `${RESERVATION_URL}/start-registration`,
        method: "POST",
      }),
    }),

    confirmMyRegistration: build.mutation({
      query: () => ({
        url: `${RESERVATION_URL}/confirm-registration`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.reservation],
    }),
  }),
});

export const {
  useAppointmentsQuery,
  useAppointmentQuery,
  useAddAppointmentMutation,
  useDeleteAppointmentMutation,
  useUpdateAppointmentMutation,
  useApproveAppointmentMutation,
  useCancelAppointmentMutation,
} = appointmentApi;

export default appointmentApi;
