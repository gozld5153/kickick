import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko"

import "react-datepicker/dist/react-datepicker.css";

export default function SignupInputBox({ width = 20, height = 3, inputHandler }) {
  const [selectDate, setSelectDate] = useState(new Date());
  const [isDateOpen, setIsDateOpen] = useState(false);

  // const getDayName = (date) => {
  //   return date.toLocaleDateString("ko-KR", { weekday: "long" }).substr(0, 1);
  // };

  // const createDate = (date) => {
  //   return new Date(
  //     new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
  //   );
  // };

  return (
    <Container width={width}>
      <InputTitle height={height}>생년월일</InputTitle>
      <DatePickerInput
        value={`${selectDate.getFullYear()}년 ${
          selectDate.getMonth() + 1
        }월 ${selectDate.getDate()}일`}
        width={width}
        height={height}
        onClick={() => setIsDateOpen(true)}
      />
      <DatePieckerContainer isDateOpen={isDateOpen}>
        <DatePicker
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
          showPopperArrow={false}
          fixedHeight
          selected={selectDate}
          onChange={(date) => {
            setSelectDate(date);
            setIsDateOpen(false);
            inputHandler("birthday",date);
          }}
          disabledKeyboardNavigation
          inline
        />
      </DatePieckerContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .react-datepicker__header {
    background-color: white;
  }

  .react-datepicker__day {
    :hover {
      color: white;
      background-color: black;
    }
  }

  .react-datepicker__day--selected {
    color: white;
    background-color: black;
  }
`;

const InputTitle = styled.div`
  margin-top: ${({ height }) => `${height / 5}rem`};
  font-size: ${({ height }) => `${height / 2}rem`};
  font-family: ${({ theme }) => theme.fontFamily.blackHanSans};
  color: ${({ theme }) => theme.color.font};
`;

const DatePieckerContainer = styled.div`
  position: absolute;
  top: ${({ height }) => `${height * 1.78 + 0.7}rem`};
  left: 0;
  display: ${({ isDateOpen }) => (isDateOpen ? "default" : "none")};
  z-index: 999;
`;

const DatePickerInput = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};
  margin: 0.5rem 0 0.2rem 0;
  padding: ${({ height }) => `${height * 0.08}rem`};
  border: 0.15rem solid ${({ theme }) => theme.color.border};
  font-size: ${({ height }) => `${(height * 2) / 3}rem`};
  font-family: ${({ theme }) => theme.fontFamily.jua};
  color: ${({ theme }) => theme.color.font};
  background-color: ${({ theme }) => theme.color.modalBack};
`;