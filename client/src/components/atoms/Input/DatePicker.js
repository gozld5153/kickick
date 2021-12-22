import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

import { FaCaretUp, FaCaretDown } from "react-icons/fa";

export default function SignupInputBox({ width = 20, height = 3, inputHandler }) {
  const [isFocus, setIsFocus] = useState("");
  const [selectDate, setSelectDate] = useState({
    year: "YYYY",
    month: "MM",
    date: "DD",
  });
  const [yearList, setYearList] = useState([new Date().getFullYear()]);
  const monthList = [12,11,10,9,8,7,6,5,4,3,2,1]
  const fetchSection = useRef();

  const handleFetch = useCallback(
    (entry) => {
      if (entry[0].isIntersecting && yearList[yearList.length - 1] > 1900) {
        console.log("call");
        setYearList([...yearList, yearList[yearList.length - 1] - 1]);
      }
    },
    [yearList]
  );

  useEffect(() => {
    let observer;
    const fetchelement = fetchSection.current;

    if (fetchelement) {
      observer = new IntersectionObserver(handleFetch);
      observer.observe(fetchelement);
    }
    return () => observer.disconnect(fetchelement);
  }, [handleFetch]);
  

  const selectOpenter = (part) => {
    if (isFocus === part) {
      return setIsFocus("");
    }
    return setIsFocus(part);
  }

  const inputOptionValue = (num, part) => {
    const newObj = { ...selectDate }
    console.log(num);
    newObj[part] = num;
    setSelectDate({ ...newObj });
    inputHandler(
      "birthday",
      new Date(`${newObj.year}.${newObj.month}.${newObj.date}`)
    );
    selectOpenter(part);
  }

  return (
    <Container width={width}>
      <InputTitle height={height}>생년월일</InputTitle>
      <DatePickerSelectContainer width={width}>
        <DatePickerSelectFrame>
          <DatePickerSelect
            onClick={() => selectOpenter("year")}
            part="year"
            isFocus={isFocus}
            width={width}
            height={height}
            divide={3.3}
          >
            <span>{selectDate.year + "년"}</span>
            {isFocus === "year" ? <FaCaretUp /> : <FaCaretDown />}
          </DatePickerSelect>
          <DatePickerOptionContaienr
            onMouseLeave={() => selectOpenter("")}
            width={width}
            height={height}
            divide={3.3}
            isFocus={isFocus}
            part="year"
          >
            {yearList.map((el, idx) => (
              <DatePickerOption
                onClick={() => inputOptionValue(el, "year")}
                width={width}
                height={height}
                divide={3.3}
                key={idx}
              >
                {el + "년"}
              </DatePickerOption>
            ))}
            <div ref={fetchSection}></div>
          </DatePickerOptionContaienr>
        </DatePickerSelectFrame>
        <DatePickerSelectFrame>
          <DatePickerSelect
            onClick={() => selectOpenter("month")}
            part="month"
            isFocus={isFocus}
            width={width}
            height={height}
            divide={3.4}
          >
            <span>{selectDate.month + "월"}</span>
            {isFocus === "month" ? <FaCaretUp /> : <FaCaretDown />}
          </DatePickerSelect>
          <DatePickerOptionContaienr
            onMouseLeave={() => selectOpenter("")}
            width={width}
            height={height}
            divide={3.4}
            isFocus={isFocus}
            part="month"
          >
            {monthList.map((el) => (
              <DatePickerOption
                onClick={() => inputOptionValue(el, "month")}
                width={width}
                height={height}
                divide={3.4}
              >
                {el + "월"}
              </DatePickerOption>
            ))}
          </DatePickerOptionContaienr>
        </DatePickerSelectFrame>
        <DatePickerSelectFrame>
          <DatePickerInput
            value={selectDate.date > 31 ? 31 : selectDate.date}
            onChange={(e) =>
              setSelectDate({
                ...selectDate,
                date: e.target.value,
              })
            }
            width={width}
            height={height}
            divide={3.4}
          >
            <input
              type="number"
              value={selectDate.date > 31 ? 31 : selectDate.date}
              max={31}
            />
            일
          </DatePickerInput>
        </DatePickerSelectFrame>
      </DatePickerSelectContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;

  @media ${({ theme }) => theme.device.mobileL} {
    width: 96vw;
  }
`;

const InputTitle = styled.div`
  margin-top: ${({ height }) => `${height / 5}rem`};
  font-size: ${({ height }) => `${height / 2}rem`};
  font-family: ${({ theme }) => theme.fontFamily.blackHanSans};
  color: ${({ theme }) => theme.color.font};
`;

const DatePickerSelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => `${width}rem`};

  @media ${({ theme }) => theme.device.mobileL} {
    width: 96vw;
  }
`;

const DatePickerSelectFrame = styled.div`
  position:relative;
`;

const DatePickerSelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ width, divide }) => `${width / divide}rem`};
  height: ${({ height }) => `${height}rem`};
  margin: 0.5rem 0 0.2rem 0;
  padding-left: ${({ height }) => `${height * 0.1}rem`};
  border: 0.15rem solid ${({ theme }) => theme.color.border};
  border-bottom: ${({ isFocus, part }) =>
    isFocus === part ? "none" : "default"};
  font-size: ${({ height }) => `${(height * 2) / 3}rem`};
  font-family: ${({ theme }) => theme.fontFamily.jua};
  color: ${({ theme }) => theme.color.font};
  white-space: nowrap;
  background-color: ${({ theme }) => theme.color.modalBack};
  cursor: pointer;

  @media ${({ theme }) => theme.device.mobileL} {
    width: ${({ divide }) => `${96 / divide}vw`};
    font-size: ${({ height }) => `${height * 0.5}rem`};
    padding-left: 1.5vw;
    overflow: hidden;
  }
`;

const DatePickerInput = styled.label`
  display: flex;
  align-items: center;
  width: ${({ width, divide }) => `${width / divide}rem`};
  height: ${({ height }) => `${height}rem`};
  margin: 0.5rem 0 0.2rem 0;
  padding-left: ${({ height }) => `${height * 0.1}rem`};
  border: 0.15rem solid ${({ theme }) => theme.color.border};
  font-size: ${({ height }) => `${(height * 2) / 3}rem`};
  font-family: ${({ theme }) => theme.fontFamily.jua};
  color: ${({ theme }) => theme.color.font};
  white-space: nowrap;
  background-color: ${({ theme }) => theme.color.modalBack};

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input {
    width: ${({ width, divide }) => `${width / divide - 3}rem`};
    height: ${({ height }) => `${height / 1.2}rem`};
    padding-left: ${({ height }) => `${height * 0.1}rem`};
    font-size: ${({ height }) => `${(height * 2) / 3}rem`};
    font-family: ${({ theme }) => theme.fontFamily.jua};
    text-align: end;
    color: ${({ theme }) => theme.color.font};
    white-space: nowrap;
    background-color: ${({ theme }) => theme.color.modalBack};
  }

  @media ${({ theme }) => theme.device.mobileL} {
    width: ${({ divide }) => `${96 / divide}vw`};
    font-size: ${({ height }) => `${height * 0.5}rem`};

    input {
      width: ${({ divide }) => `${96 / (divide + 1.7) }vw`};
      /* height: ${96 / 1.2}vw; */
      padding-left: ${96 * 0.1}vw;
      font-size: ${({ height }) => `${height * 0.5}rem`};
      font-family: ${({ theme }) => theme.fontFamily.jua};
    }
  }
`;

const DatePickerOptionContaienr = styled.div`
  position: absolute;
  top: ${({ height }) => `${height + 0.4}rem`};
  display: ${({ isFocus, part }) => (isFocus === part ? "default" : "none")};
  width: ${({ width, divide }) => `${width / divide}rem`};
  max-height: ${({ height }) => `${height * 5}rem`};
  padding-bottom: 0.1rem;
  border: 0.15rem solid ${({ theme }) => theme.color.border};
  font-size: ${({ height }) => `${(height * 2) / 3}rem`};
  font-family: ${({ theme }) => theme.fontFamily.jua};
  color: ${({ theme }) => theme.color.font};
  background-color: ${({ theme }) => theme.color.modalBack};
  overflow: scroll;
  z-index: 99;

  ::-webkit-scrollbar {
    display: none;
  }

  @media ${({ theme }) => theme.device.mobileL} {
      width: ${({ divide }) => `${96 / divide}vw`};
      font-size: ${({ height }) => `${height * 0.5}rem`};
  }
`;

const DatePickerOption = styled.div`
  width: ${({ width, divide }) => `${width / divide}rem`};
  padding: ${({ height }) => `${height * 0.06}rem`} 0;
  padding-left: ${({ height }) => `${height * 0.1}rem`};
  cursor: pointer;
`;