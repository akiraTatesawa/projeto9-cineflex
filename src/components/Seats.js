import { useState } from "react";
import styled from "styled-components";

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
    <SeatsTable>
      {seatsArray.map(({ id, name, isAvailable }) => (
        <Seat
          key={id}
          seatId={id}
          seatNumber={name}
          isAvailable={isAvailable}
          setSelectedSeats={setSelectedSeats}
          selectedSeats={selectedSeats}
        ></Seat>
      ))}
    </SeatsTable>
  );
}

const SeatsTable = styled.div`
  width: 310px;
  display: flex;
  flex-flow: row wrap;
  height: auto;
`;
