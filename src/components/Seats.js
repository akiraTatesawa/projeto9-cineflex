import { useState } from "react";

const Seat = ({
  seatNumber,
  isAvailable,
  seatId,
  setSelectedSeats,
  selectedSeats,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  function removeSelectedSeat() {
    const arrayIds = selectedSeats.seatsIds.filter((id) => id !== seatId);
    const arrayNumbers = selectedSeats.seatsNumbers.filter(
      (num) => num !== seatNumber
    );
    setSelectedSeats({
      ...selectedSeats,
      seatsIds: [...arrayIds],
      seatsNumbers: [...arrayNumbers],
    });
  }

  function addSelectedSeat() {
    const arrayIds = [...selectedSeats.seatsIds, seatId];
    const arrayNumbers = [...selectedSeats.seatsNumbers, seatNumber];
    setSelectedSeats({
      ...selectedSeats,
      seatsIds: [...arrayIds],
      seatsNumbers: [...arrayNumbers],
    });
  }

  function clickSeat() {
    if (isSelected) {
      setIsSelected(false);
      removeSelectedSeat();
    } else if (!isAvailable) {
      alert("Esse assento não está disponível");
    } else {
      setIsSelected(true);
      addSelectedSeat();
    }
  }

  return (
    <button
      className={`${isAvailable ? "available" : "taken"} ${
        isSelected && isAvailable ? "selected" : ""
      }`}
      onClick={clickSeat}
    >
      {seatNumber}
    </button>
  );
};

export default function Seats({ seatsArray, setSelectedSeats, selectedSeats }) {
  return (
    <div className="seats">
      {seatsArray.map((seat, index) => (
        <Seat
          key={index}
          seatId={seat.id}
          seatNumber={seat.name}
          isAvailable={seat.isAvailable}
          setSelectedSeats={setSelectedSeats}
          selectedSeats={selectedSeats}
        ></Seat>
      ))}
    </div>
  );
}
