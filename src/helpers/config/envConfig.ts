export const getBaseUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://car-booking-backend-orpin.vercel.app/api/v1"
  );
};
