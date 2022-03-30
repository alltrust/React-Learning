import React, { useRef } from "react";
import styled from "styled-components";

const StyledSlider = styled.div`
  position: relative;
  border-radius: 3px;
  background: #dddddd;
  height: 15px;
`;

const StyledThumb = styled.div`
  width: 10px;
  height: 25px;
  border-radius: 3px;
  position: relative;
  top: -5px;
  opacity: 0.5s;
  background: #823eb7;
  cursor: pointer;
`;

const getPercentage = (current,max) => (100 * current) / max;
const getLeft = percentage =>`calc(${percentage}% - 5px)`;
const Slider = () => {
  const sliderRef = useRef();
  const thumbRef = useRef();

  const diff = useRef();

  const handleMouseMove = (event) => {
    console.log(thumbRef);
    let newX =
      event.clientX -
      diff.current -
      sliderRef.current.getBoundingClientRect().left;

    const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;
    const start = 0;
    if(newX < start){
        newX=0;
    }
    if(newX > end){
        newX=end
    }

    const newPercentage = getPercentage(newX, end);
    thumbRef.current.style.left = getLeft(newPercentage)
  };
  const handleMouseUp = () => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
  };
  const handleMouseDown = (event) => {
    diff.current =
      event.clientX - thumbRef.current.getBoundingClientRect().left;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  return (
    <>
      <StyledSlider ref={sliderRef}>
        <StyledThumb ref={thumbRef} onMouseDown={handleMouseDown} />
      </StyledSlider>
    </>
  );
};

export default Slider;
