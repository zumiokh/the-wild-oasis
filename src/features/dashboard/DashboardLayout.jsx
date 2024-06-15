import styled from "styled-components";

import { useRecentBookings } from "./useRecentBookings.js";
import { useRecentStays } from "./useRecentStays.js";
import Spinner from "../../ui/Spinner.jsx";
import Stats from "./Stats.jsx";
import { useCabin } from "../cabins/useCabin.js";
import SalesChart from "./SalesChart.jsx";
import DurationChart from "./DurationChart.jsx";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPending: isLoadingBookings, bookings } = useRecentBookings();
  const {
    isPending: isLoadingStays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { cabins, isPending: isLoadingCabins } = useCabin();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
