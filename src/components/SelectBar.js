import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { QuestionButton } from "./styles";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 40%;
  color: #fafafa !important;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Input = styled.input`
  font-size: 16px;
  padding: 12px;
  background-color: #fff;
  width: 100%;
  border-radius: 4px;
  display: flex;
  margin: 0 auto;
  /* box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2); */
  box-shadow: none;
  border: none;
  outline: none;
  /* :focus {
    border-radius: 4px;
  } */
  @media (max-width: 768px) {
    width: 80%;
    padding: 12px;
  }
`;

const QuestionWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const ListItem = styled.div`
  border: 1px solid #ddd;
  border-top-width: 0;
  background-color: ${props => props.selected ? "#efefff" : "#fff"};
  color: #333;
  padding: 20px;
  /* width: 40%; */
  margin: 0 auto;
  z-index: 3;
  /* display: block; */
  transition: all 200ms;
  text-align: left;
  font-size: 16px;
  position: relative;
  :hover {
    background-color: #efefff;
  }
  /* @media (max-width: 768px) {
    width: 80%;
  } */
`;

const ListItemContainer = styled.div`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  width: 40%;
  padding-top: 8px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InnerListItemContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  overflow-y: auto;
  max-height: 30vh;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 72%;
  }
`;

const SelectBar = ({
  title,
  label,
  keyName,
  choices,
  moveSectionDown,
  onChange,
  initial,
}) => {
  const [focused, setFocused] = useState(false);

  useEffect(() => {}, [keyName, choices, initial]);

  return (
    <div className="section">
      <QuestionWrapper>
        <p>{title}</p>
      </QuestionWrapper>
      <Wrapper>
        <Input
          type="input"
          placeholder={label}
          onChange={(e) => onChange(keyName, e.target.value)}
          value={initial}
          onFocus={(e) => setFocused(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (focused) {
                let temp = choices.filter((obj) => {
                  return obj.value
                    .toLowerCase()
                    .includes(initial.toLowerCase());
                });
                if (temp.length >= 1) {
                  onChange(keyName, temp[0].value);
                  setFocused(false);
                }
              }
              moveSectionDown();
            }
          }}
        />

        <ListItemContainer>
          <InnerListItemContainer>
            {focused
              ? choices
                  .filter((obj) => {
                    return obj.value
                      .toLowerCase()
                      .includes(initial.toLowerCase());
                  })
                  .map((obj, index) => (
                    <React.Fragment key={index}>
                      {index < 200 ? (
                        <ListItem
                          // noGroupMe={false}
                          key={index}
                          onClick={(e) => {
                            onChange(keyName, obj.value);
                            setFocused(false);
                          }}
                          selected={index == 0 ? true : false}
                        >
                          {obj.value}
                        </ListItem>
                      ) : null}
                    </React.Fragment>
                  ))
              : null}
          </InnerListItemContainer>
        </ListItemContainer>
        <QuestionButton
          onClick={() => {
            moveSectionDown();
          }}
        >
          Enter
        </QuestionButton>
      </Wrapper>
    </div>
  );
};

export default SelectBar;
