import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { FaChevronRight } from "react-icons/fa";
import { KickConfirm } from "../../../components";
import { modalOnAction } from "../../../store/actions/kickboard";

export default function MainRecommend({
  kickListInfo = { data_by_3days: [], data_by_tags: [], data_by_time:[]},
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSelect, setIsSelect] = useState(0);
  const { kickboard } = useSelector((state) => state);

  const selectHandler = (direction) => {
    if (direction === "left" && isSelect > 0) {
      setIsSelect(isSelect - 1);
    } else if (direction === "left" && isSelect === 0) {
      setIsSelect(2);
    }
    if (direction === "right" && isSelect === 2) {
      setIsSelect(0);
    } else if (direction === "right" && isSelect < 2) {
      setIsSelect(isSelect + 1);
    }
  };

  const kickMoveHanlder = (data) => {
    console.log(data)
    if (data.is_purchased) {
      navigate(`/detailkick/${data.kick.kick_id}`);
      return;
    }
    dispatch(modalOnAction(data));
  }
  return (
    <Container>
      {/* <BtnContainer>
        <PageBtn onClick={() => selectHandler("left")}>왼쪽</PageBtn>
        <PageBtn onClick={() => setTimeout(() => selectHandler("right"), 300)}>
          <FaChevronRight />
        </PageBtn>
      </BtnContainer> */}
      <ContentContainer>
        <ContentFrame isSelect={isSelect}>
          {Object.keys(kickListInfo).length > 1 ? (
            <>
              {/* {kickListInfo.data_by_tags.length ? (
                <ContentPage name="tags">
                  {kickListInfo.data_by_tags.map((el, idx) => (
                    <KickBtn key={idx} onClick={() => navigate(`/detailkick`)}>
                      {el.post_name}
                    </KickBtn>
                  ))}
                </ContentPage>
              ) : null} */}
              {/* <ContentPage name="3days">
                {kickListInfo.data_by_3days.map((el, idx) => (
                  <KickBtn key={idx} onClick={() => navigate(`/detailkick`)}>
                    {el.post_name}
                  </KickBtn>
                ))}
              </ContentPage> */}
              <ContentPage name="time">
                {kickListInfo.data_by_time.map((el, idx) => (
                  <KickBtn key={idx} onClick={() => kickMoveHanlder(el)}>
                    {el.post_name}
                  </KickBtn>
                ))}
              </ContentPage>
              {/* <ContentPage name="tags">
                {kickListInfo.data_by_tags.map((el, idx) => (
                  <KickBtn key={idx} onClick={() => navigate(`/detailkick`)}>
                    {el.post_name}
                  </KickBtn>
                ))}
              </ContentPage> */}
            </>
          ) : (
            <ContentPage>
              <div>게시글이 없습니다.</div>
            </ContentPage>
          )}
          {kickboard.modalState && <KickConfirm />}
        </ContentFrame>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction:column;
  width: 80vw;
  font-family: ${({ theme }) => theme.fontFamily.jua};
  overflow:hidden;
`;

const BtnContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 3;
`;

const PageBtn = styled.button`
  font-size: 2vw;
`;

const ContentContainer = styled.div`
  display: flex;
`;

const ContentFrame = styled.div`
  position: relative;
  left: ${({ isSelect }) => `-${isSelect * 80}vw`};
  display: flex;
  min-height: 9vw;
  animation-name: ${({ isSelect }) =>
    isSelect === 1 ? "zeroToOne" : isSelect === 2 ? "oneToTwo" : "twoToOne"};
  animation-duration: 0.3s;
  animation-direction: normal;

  @keyframes zeroToOne {
    0% {
      left: -${80 * 0}vw;
    }
    100% {
      left: -${80 * 1}vw;
    }
  }
  @keyframes oneToTwo {
    0% {
      left: -${80 * 1}vw;
    }
    100% {
      left: -${80 * 2}vw;
    }
  }
  @keyframes twoToOne {
    0% {
      left: -${80 * 2}vw;
    }
    100% {
      left: -${80 * 3}vw;
    }
  }
`;

const ContentPage = styled.article`
  display: flex;
  justify-content: flex-start;
  align-content:flex-start;
  flex-wrap: wrap;
  gap: 0 0.8vw;
  width: 80vw;
  padding: 1vw 2vw;
  background-color: #eeeeee;
`;

const KickBtn = styled.p`
  width: 37vw;
  margin: 0.3vw;
  padding: 0.3vw;
  font-size: 1.3vw;
  background-color: #cccccc;
  cursor:pointer;
`;