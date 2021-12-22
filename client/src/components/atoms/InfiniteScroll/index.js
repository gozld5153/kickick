import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

export default function InfiniteScroll({ callback }) {
  const fetchSection = useRef();
  const handleFetch = useCallback(
    (entry) => {
      if (entry[0].isIntersecting) {
        callback();
      }
    },
    [callback]
  );
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-100px",
      threshold: 0.1,
    };

    let observer;
    const fetchelement = fetchSection.current;

    if (fetchelement) {
      observer = new IntersectionObserver(handleFetch, options);
      observer.observe(fetchelement);
    }
    return () => observer.disconnect(fetchelement);
  }, [handleFetch]);

  return <Container ref={fetchSection}></Container>;
}

const Container = styled.div`
  position: relative;

  top: -70vh;
`;
