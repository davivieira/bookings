import { fetchAvailableProperties } from "@/api";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useAvailableProperties = (checkinDate: string | null, checkoutDate: string | null) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser?.id);

  const {
    data
  } = useQuery(
    [
      "availableProperties",
      {
        checkinDate: checkinDate,
        checkoutDate: checkoutDate,
        currentUser,
      },
    ],
    fetchAvailableProperties
  );

  return { availableProperties: data }
}