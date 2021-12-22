import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { Thumbnail, IconText, Profile2 } from "../../../components";

import { modalOnAction } from "../../../store/actions/kickboard";

// import Alien from "../../../assets/images/alien.svg";
// import Astronaut from "../../../assets/images/astronaut.svg";

export default function KickBoardPost({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container
      onClick={() => {
        if (data.is_purchased) {
          navigate(`/detailkick/${data.kick.kick_id}`);
          return;
        }
        dispatch(modalOnAction(data));
      }}
    >
      {data.is_purchased && (
        <div className="absolute">
          <IconText label="구매함" />
        </div>
      )}
      <Thumbnail src={data.kick?.thumbnail} />
      <PostDescription>
        <PostSummary>
          <h3>{data.post_name}</h3>
          <p>{data.content}</p>
        </PostSummary>
        <PostUser>
          <Profile2
            type="post"
            src={data.user.profile}
            username={data.user.username}
          />
          <div className="datetime">{data.created_at}</div>
          <div className="seperator">·</div>
          <div className="commentCount">{data.comments.length} 개의 댓글</div>
        </PostUser>
      </PostDescription>
      {/* <Interest>
        <img src={Astronaut} alt="astronaut" />
        <div className="seperator"></div>
        <img src={Alien} alt="alien" />
      </Interest> */}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 20rem;
  margin: ${({ theme }) => theme.margins.xxl};

  border-radius: 0.3rem;
  box-shadow: 1px 1px 10px ${({ theme }) => theme.color.shadow};

  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: scale(1.025);
  }

  .absolute {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    z-index: 10;
  }

  @media ${({ theme }) => theme.device.notebookS} {
    width: calc(50% - 2rem);
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: calc(100% - 2rem);
  }
`;

const PostDescription = styled.div`
  margin: ${({ theme }) => theme.margins.xxl};
`;

const PostSummary = styled.div`
  height: 6rem;

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin-bottom: ${({ theme }) => theme.margins.lg};
    word-break: break-all;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.small};
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
`;
const PostUser = styled.div`
  display: flex;

  > div {
    color: gray;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: 1.8;
  }
  /* .username {
    margin-left: ${({ theme }) => theme.margins.small};
    color: ${({ theme }) => theme.color.font} !important;
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes.small};
    line-height: 1.5;
  } */
  .seperator {
    margin: 0 ${({ theme }) => theme.margins.small};
  }
  .datetime {
    margin-left: auto;
  }
`;

// const Interest = styled.div`
//   display: flex;
//   border-top: 0.1rem dashed gray;
//   padding-top: ${({ theme }) => theme.paddings.small};
//   padding-bottom: ${({ theme }) => theme.paddings.small};
//   padding-left: ${({ theme }) => theme.paddings.xxl};
//   padding-right: ${({ theme }) => theme.paddings.xxl};

//   img {
//     width: 1.5rem;
//   }
//   .seperator {
//     width: 100%;
//   }
// `;
