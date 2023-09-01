import { useLoaderData } from "react-router-dom";
import Header from "../../Rooms/Header";
import RoomInfo from "../../Rooms/RoomInfo";
import RoomReservation from "../../Rooms/RoomReservation";
import Container from "../../Shared/Container";

const RoomDetails = () => {
  const roomData = useLoaderData();

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <div>
            <Header roomData={roomData} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <RoomInfo roomData={roomData} />
            <div className="mb-10 md:col-span-3 order-first md:order-last">
            <RoomReservation roomData={roomData} />
          </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RoomDetails;
