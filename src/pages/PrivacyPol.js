import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { collegeDark, collegeLight, collegeLightBold } from "../constants";
import ReactGA from "react-ga";
import styled, { keyframes } from "styled-components";

const Texth4 = styled.h4`
  max-width: 44%;
  font-size: 20px;
  text-align: left;
  @media (max-width: 768px) {
    max-width: 80%;
    font-size: 20px;
  }
`;

const Logo = styled.img`
  max-height: 30vh;
  margin-top: 18px;
`;

const Section = styled.section`
  text-align: center;
  padding: ${(props) => props.padding};
  color: #333;
  background-color: ${(props) => props.backgroundColor};
`;

const Texth1 = styled.h1`
  max-width: 50%;
  font-size: 32px;
  text-align: center;
  @media (max-width: 768px) {
    max-width: 90%;
    font-size: 32px;
    font-weight: 300;
  }
`;

const Button = styled(Link)`
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

const List = styled.li`
  font-size: 20px;
  text-align: left;
`;

const Wrap = styled.ol`
  width: 50%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const PrivacyPol = () => {
  return (
    <>
      <Header title="Privacy Policy" />
      <div className="App" style={{ padding: "4px" }}>
        <br />
        <Logo src="/StudyBuddyLogo.png" />
        <br />
        <Texth1>What happens to the data?</Texth1>
        <br />
        <Wrap>
          <List>
            StudyBuddies will not sell any personally identifiable data
            collected from the students of the University of Michigan Law
            School.
          </List>
          <br />
          <List>
            In the case of acquisition of StudyBuddies that results in a
            transfer of majority ownership, the personally identifiable data
            collected from the students of the University of Michigan Law School
            will not be transferred to the new majority owners of StudyBuddies.
          </List>
          <br />
          <List>
            StudyBuddies will not give a University of Michigan Law student's
            contact information to another party outside the University of
            Michigan Law School unless the student has consented to do so.
          </List>
          <br />
          <List>
            StudyBuddies has full ownership of the data that it collects from
            students of the University of Michigan Law School subject to the
            conditions above.
          </List>
        </Wrap>
        <br />

        <br />
        <Button to="/">Back</Button>
        <br />
      </div>
    </>
  );
};
export default PrivacyPol;
