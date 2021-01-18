import React from "react";
import styled from "styled-components";
import { QuestionButton } from "./styles";
import ReactGA from "react-ga";

const Wrapper = styled.div`
  margin: 20px auto;
  width: 40%;
  color: #fafafa !important;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const QuestionWrapper = styled.div`
  max-width: 32em;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Privacy = ({ message, moveSectionDown, buttonMessage }) => {
  return (
    <div className="section">
      <QuestionWrapper
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (buttonMessage) {
              ReactGA.event({
                category: "Navigation",
                action: "Enter",
                label: "Get Started",
              });
            }
            moveSectionDown();
          }
        }}
      >
        <p>{message}</p>
      </QuestionWrapper>

      <QuestionButton
        style={{ "paddingRight": "14px", "paddingLeft": "14px" }}
        onClick={() => {
          if (buttonMessage) {
              ReactGA.event({
                category: "Navigation",
                action: "Enter",
                label: "Get Started",
              });
            }
          moveSectionDown();
        }}
      >
        {buttonMessage ? buttonMessage : "Ok"}
      </QuestionButton>
    </div>
  );
};

export default Privacy;
