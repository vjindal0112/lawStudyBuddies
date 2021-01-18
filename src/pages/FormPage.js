import React from "react";
import Form from "../components/Form";
import Header from "../components/Header";
import "../App.css";
import { Banner } from "../components/styles";

export default function FormPage() {
  return (
    <>
      <Header
        title="Form"
        description="Fill out this form to get paired with study buddies in your class at UMich. We only match you with people we know you will vibe with."
      />
      {/*<Banner>The form is closed!</Banner>*/}
      <div className="App">
        <Form />
      </div>
    </>
  );
}
