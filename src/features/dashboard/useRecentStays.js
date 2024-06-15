import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings.js";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  // date to use as query for the api
  // methods from dateFns
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isPending, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  // additional computing for stays since not all bookings will be confirmed as stay
  // we only want the stays that are confirmed or already checked-out
  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isPending, stays, confirmedStays, numDays };
}
