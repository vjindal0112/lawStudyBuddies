import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { collegeLight } from "../constants";
import { QuestionButton, Input, Select } from "./styles";
import ReactGA from "react-ga";

const Wrapper = styled.div`
  margin: 20px auto;
  width: 40%;
  color: #fafafa !important;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Button = styled.button`
  border: 4px solid ${collegeLight};
  padding: 4px 8px;
  color: #fafafa;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0);

  transition: all 0.5s;
  &:hover {
    background-color: ${collegeLight};
  }
`;

const QuestionWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const intlNormalize = (value) => {
  if (!value) return value;

  const currentValue = value.replace(/[^\d]/g, "");
  const cvLength = currentValue.length;
  if(cvLength > 15) {
    return currentValue.slice(0,15);
  }
  return currentValue;
}

const normalizeInput = (value, previousValue) => {
  // return nothing if no value
  if (!value) return value;

  // only allows 0-9 inputs
  const currentValue = value.replace(/[^\d]/g, "");
  const cvLength = currentValue.length;

  if (!previousValue || value.length > previousValue.length) {
    // returns: "x", "xx", "xxx"
    if (cvLength < 4) return currentValue;

    // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
    if (cvLength < 7)
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

    // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
      3,
      6
    )}-${currentValue.slice(6, 10)}`;
  }
};

const Question = ({
  title,
  label,
  keyName,
  moveSectionDown,
  onChange,
  submitFunction,
  submit,
  initial,
  number,
}) => {
  // const [value, setValue] = useState(initial);
  const [selectVal, setSelectVal] = useState("US");

  useEffect(() => {}, [keyName, onChange, initial]);

  return (
    <div className="section">
      <QuestionWrapper>
        <p>{title}</p>
      </QuestionWrapper>
      <Wrapper>
        {number ? (
          <>
            <Select onChange={(e) => {
              setSelectVal(e.target.value);
            }}>
              <option>US</option>
              <option>Intl</option>
            </Select>
            <Input
              key={keyName}
              onChange={(e) => {
                // setValue(e.target.value);
                if(selectVal != "Intl") {
                  onChange(keyName, normalizeInput(e.target.value, initial));
                } else {
                  onChange(keyName, intlNormalize(e.target.value));
                }
              }}
              value={initial}
              placeholder={selectVal != "Intl" ? "(XXX) XXX-XXXX" : "XXXXXXXXXXXXXXX"}
            />
          </>
        ) : (
          <Input
            style={{ color: "#fafafa", outline: "#fafafa" }}
            key={keyName}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                moveSectionDown();
              }
            }}
            onChange={(e) => {
              // setValue(e.target.value);
              onChange(keyName, e.target.value);
            }}
            value={initial}
            placeholder={label}
          />
        )}
      </Wrapper>

      <QuestionButton
        onClick={() => {
          if (submit) {
            ReactGA.event({
              category: "Navigation",
              action: "Click",
              label: "Add Another Class",
            });
            moveSectionDown(true);
          } else {
            moveSectionDown();
          }
        }}
      >
        {submit ? "Add Another Class" : "Enter"}
      </QuestionButton>
      {submit ? (
        <>
          <br />
          <QuestionButton
            onClick={() => {
              ReactGA.event({
                category: "Navigation",
                action: "Click",
                label: "Submit All Classes",
              });
              submitFunction();
            }}
          >
            Submit All Classes
          </QuestionButton>
        </>
      ) : null}
    </div>
  );
};

export default Question;
