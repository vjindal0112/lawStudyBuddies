import React, { useEffect } from "react";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import styled from "styled-components";
import { QuestionButton } from "./styles"

const Left = styled.h5`
  position: relative;
  left: -232px;
  top: 44px;
  width: 60px;
  display: inline-block;
  overflow-wrap: normal;

  @media (max-width: 768px) {
    left: -90px;
    top: 36px;
    font-size: 14px;
  }
`;

const Right = styled.h5`
  position: relative;
  right: -214px;
  top: 44px;
  width: 60px;
  display: inline-block;
  overflow-wrap: normal;

  @media (max-width: 768px) {
    right: -90px;
    top: 36px;
    font-size: 14px;
  }
`;

const QuestionWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Wrapper = styled.div`
  margin: 20px auto;
  margin-bottom: 32px;
  width: 400px;
  color: #fafafa !important;

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const Slider = ({ title, keyName, moveSectionDown, onChange, initial }) => {

  useEffect(() => {
  }, [keyName, initial]);

  return (
    <div className="section">
      <QuestionWrapper>
        <p>{title}</p>
      </QuestionWrapper>
      <Wrapper
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            moveSectionDown();
          }
        }}
      >
        <Left>Strongly Disagree</Left>
        <Right>Strongly Agree</Right>
        <RangeSlider
          key={keyName}
          value={initial}
          onChange={(e) => {
            onChange(keyName, e.target.value);
          }}
          min={0}
          max={4}
          tooltip="off"
          size={"sm"}
          variant={"light"}
        />
      </Wrapper>

      <QuestionButton
        onClick={() => {
          moveSectionDown();
        }}
      >
        Enter
      </QuestionButton>
    </div>
  );
};

export default Slider;
