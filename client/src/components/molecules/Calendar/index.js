import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import disableScroll from "disable-scroll";

import "react-datepicker/dist/react-datepicker.css";

import { getLogs } from "../../../apis/logs"

export default function Calendar({ standardSize = "0.7", unit="vw", backColor="back" }) {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    getLogs("signin", 30, 1).then((res) => {
      setAttendance(
        res.data.data
          .filter(
            (el) =>
              Number(el.created_at.split("-")[1]) ===
              Number(new Date().getMonth() + 1)
          )
          .map((el) => new Date(el.created_at))
      );
    });
  }, []);

  const closer = () => {
    disableScroll.off();
    navigate("/", { replace: true });
  };

  const renderDayContents = (day, date) => {
    const tooltipText = `Tooltip for date: ${date}`;
    return <span title={tooltipText}>{day}</span>;
  };

  return (
    <Container
      onClick={closer}
      standardSize={standardSize}
      unit={unit}
      backColor={backColor}
    >
      <Title standardSize={standardSize} unit={unit}>
        - 12월 출석판 -
      </Title>
      <DatePicker
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        renderDayContents={renderDayContents}
        showPopperArrow={false}
        highlightDates={attendance}
        disabledKeyboardNavigation
        inline
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${({ standardSize, unit }) => 2 * standardSize + unit};
  border-radius: ${({ standardSize, unit }) => standardSize + unit};
  font-family: ${({ theme }) => theme.fontFamily.jua};
  background-color: ${({ theme, backColor }) => theme.color[backColor]};
  overflow: hidden;
  cursor: pointer;

  .react-datepicker {
    border: none;
    background-color: ${({ theme, backColor }) => theme.color[backColor]};
  }

  .react-datepicker__header {
    padding: ${({ standardSize, unit }) => 0.3 * standardSize + unit};
    border-bottom: ${({ standardSize, unit }) => 0.1 * standardSize + unit}
      solid ${({ theme }) => theme.color.font};
    background-color: ${({ theme, backColor }) => theme.color[backColor]};
  }

  .react-datepicker__current-month,
  .react-datepicker__navigation--next,
  .react-datepicker__navigation--previous {
    display: none;
  }

  .react-datepicker__current-month {
    font-size: ${({ standardSize, unit }) => 2 * standardSize + unit};
  }

  .react-datepicker__day--outside-month {
    opacity: 0.3;
  }

  .react-datepicker__day,
  .react-datepicker__day-name {
    display: table-cell;
    vertical-align: middle;
    width: ${({ standardSize, unit }) => 5 * standardSize + unit};
    height: ${({ standardSize, unit }) => 5 * standardSize + unit};
    font-size: ${({ standardSize, unit }) => 2 * standardSize + unit};
    pointer-events: none;
  }

  .react-datepicker__day {
    border: ${({ standardSize, unit }) => 0.2 * standardSize + unit} solid white;
    color: ${({ theme }) => theme.color.font};
  }

  .react-datepicker__day--weekend {
    color: red;
  }

  .react-datepicker__day-name {
    position: relative;
    left: ${({ standardSize, unit }) => 0.5 * standardSize + unit};
    color: ${({ theme }) => theme.color.font};
  }

  .react-datepicker__day--highlighted {
    border-radius:0;
    color: white;
    background-color: red;
  }
`;

const Title = styled.p`
  font-size: ${({ standardSize, unit }) => 3 * standardSize + unit};
  color: ${({ theme }) => theme.color.font};
`;