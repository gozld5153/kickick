import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

import { FaPlusSquare, FaTimes } from "react-icons/fa";

export default function DragDrop({ setThumbnail, file, setFile }) {
  const dragRef = useRef();

  const fileChange = useCallback((e) => {
    const theImageFile = e.target.files[0];

    const reader = new FileReader();
    if (theImageFile) {
      reader.readAsDataURL(theImageFile);
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setFile(result);
      };
    }
    setThumbnail(theImageFile);
  }, []);

  const dragFileChange = useCallback((e) => {
    const theImageFile = e.dataTransfer.files[0];

    const reader = new FileReader();
    if (theImageFile) {
      reader.readAsDataURL(theImageFile);
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setFile(result);
      };
    }
    setThumbnail(theImageFile);
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current.style.backgroundColor = "#d8d8d8";
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current.style.backgroundColor = "white";
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    dragRef.current.style.backgroundColor = "#d8d8d8";

    if (e.dataTransfer.files) {
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      dragFileChange(e);
    },
    [dragFileChange]
  );

  const initDragEvents = useCallback(() => {
    // 앞서 말했던 4개의 이벤트에 Listener를 등록합니다. (마운트 될때)

    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback(() => {
    // 앞서 말했던 4개의 이벤트에 Listener를 삭제합니다. (언마운트 될때)

    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <ThumbnailDropZone ref={dragRef}>
      <FaPlusSquare />
      <h2>이미지를 끌어다가 놓으세요</h2>
      <form>
        <input
          type="file"
          onChange={fileChange}
          id="fileUpload"
          style={{ display: "none" }}
        />
        <label htmlFor="fileUpload">클릭하여 첨부하기</label>
      </form>
      {file && (
        <ImageSection>
          <img src={file} alt="" />
          <FaTimes
            onClick={() => {
              setFile(null);
              dragRef.current.style.backgroundColor = "white";
            }}
          />
        </ImageSection>
      )}
    </ThumbnailDropZone>
  );
}

const ThumbnailDropZone = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20rem;
  padding: 2rem;
  border: 3px dashed skyblue;
  color: gray;
  gap: 2rem;
  transition: background-color 0.25s linear;

  h2 {
    font-size: 2.5rem;
    @media ${({ theme }) => theme.device.tablet} {
      font-size: 1.8rem;
    }
  }

  svg {
    font-size: 3rem;
    @media ${({ theme }) => theme.device.tablet} {
      font-size: 2rem;
    }
  }

  form {
    margin-top: 2rem;
  }

  label {
    font-size: 1rem;
    height: 4rem;
    color: gray;
    border: 3px solid #ddd;
    border-radius: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
  }
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.2rem;
  }
`;
const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  height: 20rem;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);

  img {
    object-fit: contain;
  }

  svg {
    font-size: 1.5rem;
    position: absolute;
    left: 90%;
    top: 5%;
    color: #333;
    cursor: pointer;
  }
`;
