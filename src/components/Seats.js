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
    <SeatButton
      border={isAvailable ? isSelected ? "#45bdb0" : "#808f9d" : "#f7c52b"}
      bgColor={isAvailable ? isSelected ? "#8dd7cf" : "#c3cfd9" : "#fbe192"}
      onClick={clickSeat}
    >
      {seatNumber}
    </SeatButton>
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

export const SeatButton = styled.button`
  flex: 0 0 26px;
  width: 26px;
  height: 26px;
  border-radius: 12px;
  margin-bottom: 18px;
  margin-right: 5px;
  padding: 7px;
  color: #293845;
  font-size: 11px;
  border: 1px solid ${props => props.border};
  background-color: ${props => props.bgColor};
`;
