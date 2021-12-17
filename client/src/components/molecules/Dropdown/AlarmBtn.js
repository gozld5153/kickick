import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom"
import styled, { css } from "styled-components";
import { useSelector,useDispatch } from "react-redux";

import { postAlarm } from "../../../apis/alarm"
import { dateConverter } from "../../../commons/utils/dateConverter"
import { alarmPageAction } from "../../../store/actions/socket";

import { FaBell } from "react-icons/fa";

export default function AlarmBtn({ fontSize = "xl", socketClient }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchSection = useRef();
  const isLogin = useSelector((state) => state.login.isLogin);
  const alarmList = useSelector((state) => state.alarmList);
  const socketChange = useSelector((state) => state.socket);

  const [alarmOpen, setAlarmOpen] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const alarmOpner = () => {
    return setAlarmOpen(!alarmOpen);
  };

  const moveRefer = (obj) => {
    if (obj.reference) {
      const middleLink =
        obj.reference.table === "posts"
          ? "detailboard"
          : obj.reference.table === "notices" && obj.type === "notices"
          ? "notice/소식"
          : "notice/이벤트";
      
      if (obj.reference.table === "posts") {
        // 댓글 알람
        postAlarm(obj.alarm_id, 1)
          .then(() => {
            socketClient.emit("alarms", {
              username: isLogin.username,
              ...socketChange.alarmPage,
            });
            navigate(`/${middleLink}/${obj.reference.id}`);
            setAlarmOpen(false);
          })
          .catch(() => navigate(`/err`));
      } else {
        // 공지 알람
        navigate(`/${middleLink}/${obj.reference.id}`);
        setAlarmOpen(false);
      }
        
    } else {
      // 포인트 획득 알람
      postAlarm(obj.alarm_id, 1)
        .then(() => {
          socketClient.emit("alarms", {
            username: isLogin.username,
            ...socketChange.alarmPage,
          });
          setAlarmOpen(false);
        })
        .catch(() => navigate(`/err`));
    }
  };

  const handleFetch = useCallback(
    (entry) => {
      if (entry[0].isIntersecting) {
        console.log("알람 요청");
        console.log(
          "요청 여부",
          alarmList.count,
          socketChange.alarmPage.limit,
          alarmList.count >= socketChange.alarmPage.limit
        );

        if (alarmList.count >= socketChange.alarmPage.limit) {
          dispatch(
            alarmPageAction(
              socketChange.alarmPage.page_num,
              socketChange.alarmPage.limit + 5
            )
          );
        }
      }
    },
    [alarmList]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0%",
      threshold: 0.1,
    };

    let observer;
    const fetchelement = fetchSection.current;

    if (fetchelement) {
      observer = new IntersectionObserver(handleFetch, options);
      observer.observe(fetchelement);
    }
    return () => observer.disconnect(fetchelement);
  }, [handleFetch, alarmList]);

  return (
    <Container>
      <AlarmContainer
        fontSize={fontSize}
        onClick={alarmOpner}
        onMouseEnter={() => setIsOver(true)}
        onMouseOut={() => setIsOver(false)}
      >
        <AlarmFrame fontSize={fontSize}>
          <AlarmCounter
            alarmLength={alarmList.count}
            isOver={isOver}
            fontSize={fontSize}
          >
            {alarmList.count > 9 ? "+9" : alarmList.count}
          </AlarmCounter>
          <FaBell />
        </AlarmFrame>
      </AlarmContainer>
      <Dropdown
        dropdownOpen={alarmOpen}
        fontSize={fontSize}
        top="2.3rem"
        onMouseLeave={() => setAlarmOpen(false)}
      >
        {alarmList.count ? (
          alarmList.data.map((el) => (
            <DropdownList onClick={() => moveRefer(el)} key={el.alarm_id}>
              <DropdownContext>{el.content}</DropdownContext>
              {dateConverter(el.created_at).includes("전") ? (
                <DropdownCreated>
                  {dateConverter(el.created_at)}
                </DropdownCreated>
              ) : null}
            </DropdownList>
          ))
        ) : (
          <DropdownList>
            <DropdownContext>알림이 없습니다.</DropdownContext>
          </DropdownList>
        )}
        <div ref={fetchSection}></div>
      </Dropdown>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
`;

const AlarmContainer = styled.button`
  position: relative;
  top: ${({ theme, fontSize }) =>
    `${theme.fontSizes[fontSize].split("rem")[0] / 10}rem`};
  border-radius: 50%;
  color: ${({ theme }) => theme.color.font};
  font-size: ${({ theme, fontSize }) => theme.fontSizes[fontSize]};
`;

const AlarmCounter = styled.div`
  position: absolute;
  display: ${({ alarmLength }) => alarmLength === 0 ? "none" : "default"};
  padding-top: ${({ theme, fontSize }) =>
    `${theme.fontSizes[fontSize].split("rem")[0] / 20}rem`};
  color: white;
  background-color: red;
  transition-property: width, bottom, right, height, border-radius;
  transition-duration: 0.2s;
  overflow: hidden;

  ${({ isOver }) =>
    !isOver &&
    css`
      bottom: ${({ theme, fontSize }) =>
        `${theme.fontSizes[fontSize].split("rem")[0] / 5}rem`};
      right: ${({ theme, fontSize }) =>
        `${theme.fontSizes[fontSize].split("rem")[0] / 7}rem`};
      width: ${({ theme, fontSize }) =>
        `${theme.fontSizes[fontSize].split("rem")[0] / 3}rem`};
      height: ${({ theme, fontSize }) =>
        `${theme.fontSizes[fontSize].split("rem")[0] / 3}rem`};

      border-radius: 50%;
      font-size: 0rem;
    `}

  ${({ isOver }) =>
    isOver &&
    css`
      bottom: ${({ theme, fontSize }) =>
        `${theme.fontSizes[fontSize].split("rem")[0] / 8}rem`};
      right: ${({ theme, fontSize }) =>
        `${theme.fontSizes[fontSize].split("rem")[0] / 16}rem`};
      width: ${({ theme, fontSize }) =>
        `${theme.fontSizes[fontSize].split("rem")[0] / 1.5}rem`};
      height: ${({ theme, fontSize }) =>
        `${theme.fontSizes[fontSize].split("rem")[0] / 1.5}rem`};
      border-radius: ${({ theme, fontSize }) =>
        `${theme.fontSizes[fontSize].split("rem")[0] / 5}rem`};
      font-size: ${({ theme, fontSize }) =>
        `${theme.fontSizes[fontSize].split("rem")[0] / 10}rem`};
    `}
`;

const AlarmFrame = styled.div`
  padding-top: ${({ theme, fontSize }) =>
    `${theme.fontSizes[fontSize].split("rem")[0] * 0.15}rem`};
  pointer-events: none;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: ${({ top }) => top};
  display: ${({ dropdownOpen }) => (dropdownOpen ? "default" : "none")};
  right: -10.2rem;
  max-height: 10rem;
  border-radius: ${({ theme }) =>
    `${theme.fontSizes.base.split("rem")[0] * 0.3}rem`};
  color: white;
  background-color: ${({ theme }) => theme.color.alarm};
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const DropdownList = styled.li`
  display: flex;
  justify-content: space-between;
  min-width: 17rem;
  margin: 0 0.4rem;
  padding: 0.5rem 0;
  font-size: 0.7rem;
  font-family: ${({ theme }) => theme.fontFamily.jua};
  cursor: pointer;
  border-top: 0.01rem solid ${({ theme }) => theme.color.border};

  :first-child {
    border-top: none;
  }

  :last-child {
    border-top: none;
  }
`;

const DropdownContext = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  white-space:nowrap;
  pointer-events:none;
`;

const DropdownCreated = styled(DropdownContext)`
  margin-left: 0.3rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  white-space: nowrap;
  pointer-events: none;
`;