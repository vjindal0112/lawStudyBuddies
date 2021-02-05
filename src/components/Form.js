import React, { useState, useEffect } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Question from "./Question";
import Privacy from "./Privacy";
import { withRouter } from "react-router-dom";
import SelectBar from "./SelectBar";
import Slider from "./Slider";
import { SaveBanner } from "./styles";

const Form = ({ history }) => {
  const [data, setData] = useState({
    name: "",
    year: "",
    class: "",
    interest: "2",
    "binge-study": "2",
    email: "",
  });

  const [animate, setAnimate] = useState(false); // for Save Confirmation Banner

  const keys = ["name", "year", "class", "interest", "binge-study", "email"];

  function bannerUp() {
    setAnimate(false);
  }

  function checkEmail() {
    const spamWords = [
      "a",
      "test",
      "spam",
      "shit",
      "fuck",
      "bitch",
      "cock",
      "cunt",
      "dick",
      "faggot",
      "ass",
      "titty",
      "titties",
    ];
    const specialChars = ["!", "*", "&", "^", "$", "#"];

    if (!data["email"].toLowerCase().includes("@umich.edu")) {
      alert("Please enter your @umich.edu email");
      return false;
    }

    let tempEmail = data["email"].toLowerCase().trim();
    let before = tempEmail.substr(0, tempEmail.indexOf("@"));

    let spam = false;
    spamWords.map((word, index) => {
      if (before == word) {
        spam = true;
      }
    });

    specialChars.map((char, index) => {
      if (tempEmail.includes(char)) {
        spam = true;
      }
    });

    if (tempEmail.split("@").length - 1 > 1) {
      spam = true;
    }
    if (
      !(
        tempEmail.toLowerCase().slice(tempEmail.length - 10) === "@umich.edu"
      ) ||
      before.includes(" ") ||
      spam ||
      before.length <= 1
    ) {
      alert("Please enter a valid email");
      return false;
    }
    return true;
  }

  function pushToSheets(anotherClass) {
    if (!checkEmail()) {
      return false;
    }

    // UNCOMMENT to check for all filled in
    for (var i = 0; i < keys.length; i++) {
      if (!data[keys[i]]) {
        alert("Please fill in all fields");
        return false;
      }

      if (keys[i] == "class") {
        let selected = data[keys[i]];
        let found = false;
        for (var k = 0; k < options.length; ++k) {
          // iterate through all classes
          if (selected == options[k]["value"]) {
            found = true;
          }
        }
        if (!found) {
          alert("Please enter a class on the list");
          window.scrollTo({
            top: window.innerHeight * 4,
            left: 0,
            behavior: "smooth",
          });
          return false;
        }
      }
    }

    var formData = new FormData();
    for (var key in data) {
      if (key == "email") {
        formData.append(key, data[key].toLowerCase().trim());
      } else {
        formData.append(key, data[key].trim());
      }
    }
    setData({ ...data, class: "", interest: "2" });
    fetch(
      "https://script.google.com/macros/s/AKfycbz7BiiPI21ZNM8YSOt_EMz1RLvJapDIoUtTgUNbSAv63NmCULB263HQ/exec",
      { method: "POST", body: formData }
    );
    if (anotherClass) {
      setAnimate(true);
      setTimeout(bannerUp, 4000);
      window.scrollTo({
        top: window.innerHeight * 3,
        left: 0,
        behavior: "smooth",
      });
    }
    return true;
  }

  function submit() {
    if (pushToSheets()) {
      history.push("/submitted");
    }
  }

  function onChangeListener(key, value) {
    setData({ ...data, [key]: value });
  }

  useEffect(() => {}, [data]);

  return (
    <ReactFullpage
      //fullpage options
      scrollingSpeed={1000} /* Options here */
      autoScrolling={false}
      fitToSection={false}
      render={({ state, fullpageApi }) => {
        return (
          <>
            <ReactFullpage.Wrapper>
              <SaveBanner animate={animate}>
                Saved your class, fill out these 3 fields for another
              </SaveBanner>
              <Privacy
                message="Once you fill this out, we'll match you with 3 buddies in your class based on the similarity of your responses"
                moveSectionDown={fullpageApi && fullpageApi.moveSectionDown}
                buttonMessage="Let's get started"
              />

              <Question
                title="To start off, what's your full name?"
                label="Full Name"
                keyName={keys[0]}
                moveSectionDown={fullpageApi && fullpageApi.moveSectionDown}
                onChange={onChangeListener}
                initial={data[keys[0]]}
              />

              <SelectBar
                title="What year are you?"
                label="Year"
                keyName={keys[1]}
                choices={year}
                moveSectionDown={fullpageApi && fullpageApi.moveSectionDown}
                onChange={onChangeListener}
                initial={data[keys[1]]}
              />

              <SelectBar
                title="Which class are you taking?"
                label="Class"
                keyName={keys[2]}
                choices={options}
                moveSectionDown={fullpageApi && fullpageApi.moveSectionDown}
                onChange={onChangeListener}
                initial={data[keys[2]]}
              />

              <Slider
                title="I am interested in taking this class"
                keyName={keys[3]}
                moveSectionDown={fullpageApi && fullpageApi.moveSectionDown}
                onChange={onChangeListener}
                initial={data[keys[3]]}
              />

              <Slider
                title="I only study in a group setting right before the final"
                keyName={keys[4]}
                moveSectionDown={fullpageApi && fullpageApi.moveSectionDown}
                onChange={onChangeListener}
                initial={data[keys[4]]}
              />

              <Privacy
                message="Just a heads up, by submitting this form you agree to share your email with your buddies"
                moveSectionDown={fullpageApi && fullpageApi.moveSectionDown}
              />

              <Question
                title="What's your UMich email?"
                label="Email"
                keyName={keys[5]}
                moveSectionDown={pushToSheets}
                onChange={onChangeListener}
                submitFunction={submit}
                submit={true}
                initial={data[keys[5]]}
              />
            </ReactFullpage.Wrapper>
          </>
        );
      }}
    />
  );
};

export default withRouter(Form);

const year = [
  { value: "1L", label: "1L" },
  { value: "2L", label: "2L" },
  { value: "3L", label: "3L" },
  { value: "Other", label: "Other" },
];

const options = [
  {
    value: "SexualOrien/GenderID & the Law 404 - Carroll",
    label: "SexualOrien/GenderID & the Law 404 - Carroll",
  },
  {
    value: "Accounting for Lawyers 751 - Desimpelare",
    label: "Accounting for Lawyers 751 - Desimpelare",
  },
  {
    value: "Adv Problem Solving Initiative 798 - Carr, Sankaran",
    label: "Adv Problem Solving Initiative 798 - Carr, Sankaran",
  },
  { value: "Advanced Clinical Law 980", label: "Advanced Clinical Law 980" },
  {
    value: "Advanced Clinical Law 980 - Richardson",
    label: "Advanced Clinical Law 980 - Richardson",
  },
  {
    value: "Advanced Clinical Law 980 - Santacroce",
    label: "Advanced Clinical Law 980 - Santacroce",
  },
  {
    value: "Advanced Clinical Law 980 - Thomas",
    label: "Advanced Clinical Law 980 - Thomas",
  },
  {
    value: "Advanced Clinical Law 980 - Sankaran",
    label: "Advanced Clinical Law 980 - Sankaran",
  },
  {
    value: "Advanced Clinical Law 980 - Chopp",
    label: "Advanced Clinical Law 980 - Chopp",
  },
  {
    value: "Advanced Clinical Law 980 - Appleberry",
    label: "Advanced Clinical Law 980 - Appleberry",
  },
  {
    value: "Advanced Clinical Law 980 - Moran",
    label: "Advanced Clinical Law 980 - Moran",
  },
  {
    value: "Advanced Clinical Law 980 - Kay",
    label: "Advanced Clinical Law 980 - Kay",
  },
  {
    value: "Advanced Clinical Law 980 - Thompson",
    label: "Advanced Clinical Law 980 - Thompson",
  },
  {
    value: "Advanced Clinical Law 980 - Campbell",
    label: "Advanced Clinical Law 980 - Campbell",
  },
  {
    value: "Advanced Clinical Law 980 - Salinas",
    label: "Advanced Clinical Law 980 - Salinas",
  },
  {
    value: "Advanced Clinical Law 980 - Syed",
    label: "Advanced Clinical Law 980 - Syed",
  },
  {
    value: "Advanced Clinical Law 980 - Kohl",
    label: "Advanced Clinical Law 980 - Kohl",
  },
  {
    value: "Advanced Clinical Law 980 - Steinberg",
    label: "Advanced Clinical Law 980 - Steinberg",
  },
  {
    value: "Advanced Clinical Law 980 - Sadek",
    label: "Advanced Clinical Law 980 - Sadek",
  },
  {
    value: "Advanced Clinical Law 980 - Freedman",
    label: "Advanced Clinical Law 980 - Freedman",
  },
  {
    value: "Advanced Clinical Law 980 - Mendez",
    label: "Advanced Clinical Law 980 - Mendez",
  },
  {
    value: "Advanced Clinical Law 980 - Kalil",
    label: "Advanced Clinical Law 980 - Kalil",
  },
  {
    value: "Advanced Clinical Law 980 - Murphy",
    label: "Advanced Clinical Law 980 - Murphy",
  },
  {
    value: "Advanced Externship 944 - Sankaran",
    label: "Advanced Externship 944 - Sankaran",
  },
  {
    value: "Advanced Legal Research 608 - Brown, Neisler",
    label: "Advanced Legal Research 608 - Brown, Neisler",
  },
  {
    value: "Advocacy for Underdogs 803 - Buchsbaum",
    label: "Advocacy for Underdogs 803 - Buchsbaum",
  },
  {
    value: "Alternative Dispute Resolution 612 - Kantor",
    label: "Alternative Dispute Resolution 612 - Kantor",
  },
  {
    value: "Anatomy of a Commercial Trial 617 - Ankers",
    label: "Anatomy of a Commercial Trial 617 - Ankers",
  },
  {
    value: "Anti-corruption Law & Practice 854 - Dickinson",
    label: "Anti-corruption Law & Practice 854 - Dickinson",
  },
  {
    value: "Antitrust and IP 504 - Crane",
    label: "Antitrust and IP 504 - Crane",
  },
  {
    value: "Appellate Advoc:Skills & Pract 730 - Caminker",
    label: "Appellate Advoc:Skills & Pract 730 - Caminker",
  },
  { value: "Art Law 748 - Schneider", label: "Art Law 748 - Schneider" },
  {
    value: "Business Economics for Lawyers 548 - Masten",
    label: "Business Economics for Lawyers 548 - Masten",
  },
  {
    value: "Business Planning 448 - Tucker",
    label: "Business Planning 448 - Tucker",
  },
  {
    value: "Child Advocacy Clinic 910 - Sankaran",
    label: "Child Advocacy Clinic 910 - Sankaran",
  },
  {
    value: "Child Advocacy Clinic Seminar 911 - Sankaran",
    label: "Child Advocacy Clinic Seminar 911 - Sankaran",
  },
  {
    value: "Civil Procedure 510 - Hurley",
    label: "Civil Procedure 510 - Hurley",
  },
  {
    value: "Civil Rights Litig Initiative 901 - Steinberg",
    label: "Civil Rights Litig Initiative 901 - Steinberg",
  },
  {
    value: "Civil-Criminal Litig Clnc Sem 921 - Santacroce, Freedman, Edmonds",
    label: "Civil-Criminal Litig Clnc Sem 921 - Santacroce, Freedman, Edmonds",
  },
  {
    value: "Civil-Criminal Litigation Clnc 920 - Santacroce, Freedman, Edmonds",
    label: "Civil-Criminal Litigation Clnc 920 - Santacroce, Freedman, Edmonds",
  },
  {
    value: "Community Enterprise Clinic 955 - Thompson, Pfeifer",
    label: "Community Enterprise Clinic 955 - Thompson, Pfeifer",
  },
  {
    value: "Community Enterprise Clnc Sem 956 - Thompson, Pfeifer",
    label: "Community Enterprise Clnc Sem 956 - Thompson, Pfeifer",
  },
  {
    value: "Complex Litigation 716 - Carroll",
    label: "Complex Litigation 716 - Carroll",
  },
  {
    value: "Constitutional Law in China 607 - Zhang",
    label: "Constitutional Law in China 607 - Zhang",
  },
  {
    value: "Contracting in Complex Transac 676 - Kimball",
    label: "Contracting in Complex Transac 676 - Kimball",
  },
  { value: "Contracts 520 - Crane", label: "Contracts 520 - Crane" },
  {
    value: "Corporate & White Collar Crime 772 - Khanna",
    label: "Corporate & White Collar Crime 772 - Khanna",
  },
  {
    value: "Corporate Lawyer: Law & Ethics 723 - Pritchard",
    label: "Corporate Lawyer: Law & Ethics 723 - Pritchard",
  },
  {
    value: "Couns & Advocacy in Antitrust 486 - Cernak",
    label: "Couns & Advocacy in Antitrust 486 - Cernak",
  },
  {
    value: "Couns & Advocacy in Antitrust 486",
    label: "Couns & Advocacy in Antitrust 486",
  },
  {
    value: "Crim Appellate Practice 927 - Van Campen, Mittlestat",
    label: "Crim Appellate Practice 927 - Van Campen, Mittlestat",
  },
  {
    value: "Crim Procedure: Bail to Post Conviction Review 643 - Mcquade",
    label: "Crim Procedure: Bail to Post Conviction Review 643 - Mcquade",
  },
  {
    value: "Criminal Appel Pract Field 928 - Van Campen, Mittlestat",
    label: "Criminal Appel Pract Field 928 - Van Campen, Mittlestat",
  },
  { value: "Criminal Law 530 - Mendlow", label: "Criminal Law 530 - Mendlow" },
  { value: "Criminal Law 530 - Uhlmann", label: "Criminal Law 530 - Uhlmann" },
  {
    value: "Criminal Law 530 - Prescott",
    label: "Criminal Law 530 - Prescott",
  },
  {
    value: "Critical Race Theory 640 - Carbado",
    label: "Critical Race Theory 640 - Carbado",
  },
  {
    value: "Data Privacy Law 503 - Deacon",
    label: "Data Privacy Law 503 - Deacon",
  },
  {
    value: "Design Fulfilling Life in Law 685 - Carr, Sankaran",
    label: "Design Fulfilling Life in Law 685 - Carr, Sankaran",
  },
  {
    value: "Dialogue Across Difference 627 - Appleberry",
    label: "Dialogue Across Difference 627 - Appleberry",
  },
  {
    value: "Dialogue Across Difference 627",
    label: "Dialogue Across Difference 627",
  },
  {
    value: "Documentary and the Law 488 - Vandervort",
    label: "Documentary and the Law 488 - Vandervort",
  },
  {
    value: "Editing and Advocacy 622 - Barry",
    label: "Editing and Advocacy 622 - Barry",
  },
  {
    value: "Emerging Issues in Poverty Law 413 - Gray",
    label: "Emerging Issues in Poverty Law 413 - Gray",
  },
  {
    value: "Employee Benefits & Exec Comp 710 - Stumpff",
    label: "Employee Benefits & Exec Comp 710 - Stumpff",
  },
  {
    value: "Employment Law 609 - Salvatore",
    label: "Employment Law 609 - Salvatore",
  },
  {
    value: "Enterprise Organization 657 - Choi",
    label: "Enterprise Organization 657 - Choi",
  },
  {
    value: "Entrepreneurship Clinic 993 - Sadek, Murphy, Mendez",
    label: "Entrepreneurship Clinic 993 - Sadek, Murphy, Mendez",
  },
  {
    value: "Entrepreneurship Clinic Seminar 994 - Sadek, Murphy, Mendez",
    label: "Entrepreneurship Clinic Seminar 994 - Sadek, Murphy, Mendez",
  },
  {
    value: "Entrepreneurship Law 404 - Schipani",
    label: "Entrepreneurship Law 404 - Schipani",
  },
  {
    value: "Environmental Crimes 791 - Uhlmann",
    label: "Environmental Crimes 791 - Uhlmann",
  },
  {
    value: "Environmental Justice 805 - Kantor",
    label: "Environmental Justice 805 - Kantor",
  },
  {
    value: "Envt'l Law & Sustain Clinic 930 - Salim",
    label: "Envt'l Law & Sustain Clinic 930 - Salim",
  },
  {
    value: "Envt'l Law & Sustain Clnc Sem 931 - Salim",
    label: "Envt'l Law & Sustain Clnc Sem 931 - Salim",
  },
  { value: "Evidence 669 - Primus", label: "Evidence 669 - Primus" },
  {
    value: "Evidence Practicum 428 - Hurley",
    label: "Evidence Practicum 428 - Hurley",
  },
  { value: "Externship Paper 949", label: "Externship Paper 949" },
  { value: "Family Law 673 - Myers", label: "Family Law 673 - Myers" },
  {
    value: "Federal Appel Litig Clnc II 973 - Salinas",
    label: "Federal Appel Litig Clnc II 973 - Salinas",
  },
  {
    value: "Federal Courts 677 - Sant'Ambrogio",
    label: "Federal Courts 677 - Sant'Ambrogio",
  },
  { value: "Fin & Bnkg Law 407 - Kress", label: "Fin & Bnkg Law 407 - Kress" },
  {
    value: "Financial Regulation 709 - Lee",
    label: "Financial Regulation 709 - Lee",
  },
  {
    value: "First Amendment 681 - Niehoff",
    label: "First Amendment 681 - Niehoff",
  },
  {
    value: "Forensic Science and the Law 863 - Syed",
    label: "Forensic Science and the Law 863 - Syed",
  },
  {
    value: "Formation of the Common Law 516 - Hudson",
    label: "Formation of the Common Law 516 - Hudson",
  },
  {
    value: "Full-Time Externship 940 - Sankaran",
    label: "Full-Time Externship 940 - Sankaran",
  },
  {
    value: "Full-Time Externship Seminar 941 - Sankaran",
    label: "Full-Time Externship Seminar 941 - Sankaran",
  },
  {
    value: "Gender Law and Policy 670 - Katz",
    label: "Gender Law and Policy 670 - Katz",
  },
  {
    value: "Geneva Externship 947 - Nicol",
    label: "Geneva Externship 947 - Nicol",
  },
  {
    value: "Geneva Externship Seminar 948 - Nicol",
    label: "Geneva Externship Seminar 948 - Nicol",
  },
  {
    value: "Good with Words 719 - Barry",
    label: "Good with Words 719 - Barry",
  },
  {
    value: "Government Relations Practicum 456 - Johnson",
    label: "Government Relations Practicum 456 - Johnson",
  },
  { value: "Habeas Corpus 788 - Primus", label: "Habeas Corpus 788 - Primus" },
  {
    value: "Human Trafficking Clinic 951 - Campbell, Kalil",
    label: "Human Trafficking Clinic 951 - Campbell, Kalil",
  },
  {
    value: "Human Trafficking Clinic Sem 954 - Campbell, Kalil",
    label: "Human Trafficking Clinic Sem 954 - Campbell, Kalil",
  },
  {
    value: "Immigration and Nationality 687 - Thronson",
    label: "Immigration and Nationality 687 - Thronson",
  },
  {
    value: "Impact of Hum Rts on Int Law 787 - Simma",
    label: "Impact of Hum Rts on Int Law 787 - Simma",
  },
  {
    value: "Impact of Hum Rts on Int Law 787",
    label: "Impact of Hum Rts on Int Law 787",
  },
  { value: "Independent Study 399", label: "Independent Study 399" },
  { value: "Independent Study 750", label: "Independent Study 750" },
  {
    value: "India Externship 943 - Sankaran",
    label: "India Externship 943 - Sankaran",
  },
  {
    value: "Innovation Platform 729 - Ohmer, Salari",
    label: "Innovation Platform 729 - Ohmer, Salari",
  },
  {
    value: "Int'l Environment Law & Policy 682 - Daugirdas",
    label: "Int'l Environment Law & Policy 682 - Daugirdas",
  },
  {
    value: "Int'l Transactions Clinic 907 - Guenther",
    label: "Int'l Transactions Clinic 907 - Guenther",
  },
  {
    value: "Interdisc Prob Solv 741 - Logue, Carr, Lemos",
    label: "Interdisc Prob Solv 741 - Logue, Carr, Lemos",
  },
  {
    value: "Interdisc Prob Solv 741 - Fielder, Kitaba-Gaviglio, Carr",
    label: "Interdisc Prob Solv 741 - Fielder, Kitaba-Gaviglio, Carr",
  },
  {
    value: "Interdisc Prob Solv 741 - Thompson, Carr, Norman",
    label: "Interdisc Prob Solv 741 - Thompson, Carr, Norman",
  },
  {
    value: "Internal Investigations 506 - Lynch",
    label: "Internal Investigations 506 - Lynch",
  },
  {
    value: "International Arbitration 766 - Kent",
    label: "International Arbitration 766 - Kent",
  },
  {
    value: "International IP 717 - Eisenberg, Daugirdas",
    label: "International IP 717 - Eisenberg, Daugirdas",
  },
  {
    value: "International Refugee Law 724 - Fisher",
    label: "International Refugee Law 724 - Fisher",
  },
  {
    value: "Introduction to Constitutional Law 540 - Mortenson",
    label: "Introduction to Constitutional Law 540 - Mortenson",
  },
  {
    value: "Introduction to Constitutional Law 540 - Litman",
    label: "Introduction to Constitutional Law 540 - Litman",
  },
  {
    value: "Introduction to Constitutional Law 540 - Primus",
    label: "Introduction to Constitutional Law 540 - Primus",
  },
  {
    value: "Investor Protection 477 - Davis",
    label: "Investor Protection 477 - Davis",
  },
  { value: "Islamic Law 812 - Khan", label: "Islamic Law 812 - Khan" },
  {
    value: "Joint Ventures Practicum 732 - Kaye",
    label: "Joint Ventures Practicum 732 - Kaye",
  },
  {
    value: "Juvenile Justice Clinic 952 - Thomas",
    label: "Juvenile Justice Clinic 952 - Thomas",
  },
  {
    value: "Juvenile Justice Clinic Sem 953 - Thomas",
    label: "Juvenile Justice Clinic Sem 953 - Thomas",
  },
  {
    value: "Law and Psychiatry Crossroads 898 - Pinals",
    label: "Law and Psychiatry Crossroads 898 - Pinals",
  },
  {
    value: "Law and Theology 482 - Niehoff",
    label: "Law and Theology 482 - Niehoff",
  },
  {
    value: "Law Firm Careers/Evolv Prof 435 - Hirshon",
    label: "Law Firm Careers/Evolv Prof 435 - Hirshon",
  },
  {
    value: "Law of Marketing 413 - Rogala",
    label: "Law of Marketing 413 - Rogala",
  },
  {
    value: "Law of the Internet 711 - Willen",
    label: "Law of the Internet 711 - Willen",
  },
  { value: "Law Practicum Research 942", label: "Law Practicum Research 942" },
  {
    value: "Law&Diplomacy: African Nations 814 - Page",
    label: "Law&Diplomacy: African Nations 814 - Page",
  },
  {
    value: "Law&Slavery:Reopen a Cold Case 421 - Scott",
    label: "Law&Slavery:Reopen a Cold Case 421 - Scott",
  },
  {
    value: "Legal Aspt Mgmt&Fin 306 - Rogala",
    label: "Legal Aspt Mgmt&Fin 306 - Rogala",
  },
  {
    value: "Legal Ethics and Professional Responsibility 731 - Hirshon",
    label: "Legal Ethics and Professional Responsibility 731 - Hirshon",
  },
  {
    value: "Legal Issues/Autonomous Veh 703 - Frascaroli",
    label: "Legal Issues/Autonomous Veh 703 - Frascaroli",
  },
  {
    value: "Legal Practice Skills II 594 - Hannon",
    label: "Legal Practice Skills II 594 - Hannon",
  },
  {
    value: "Legal Practice Skills II 594 - Wilensky",
    label: "Legal Practice Skills II 594 - Wilensky",
  },
  {
    value: "Legal Practice Skills II 594 - Lefort",
    label: "Legal Practice Skills II 594 - Lefort",
  },
  {
    value: "Legal Practice Skills II 594 - Vettorello",
    label: "Legal Practice Skills II 594 - Vettorello",
  },
  {
    value: "Legal Practice Skills II 594 - Bromberg",
    label: "Legal Practice Skills II 594 - Bromberg",
  },
  {
    value: "Legal Practice Skills II 594 - Kornblatt",
    label: "Legal Practice Skills II 594 - Kornblatt",
  },
  {
    value: "Legal Practice Skills II 594 - Pinto",
    label: "Legal Practice Skills II 594 - Pinto",
  },
  {
    value: "Legal Practice Skills II 594 - Osbeck",
    label: "Legal Practice Skills II 594 - Osbeck",
  },
  {
    value: "Legislation and Regulation 569 - Deacon",
    label: "Legislation and Regulation 569 - Deacon",
  },
  {
    value: "Legislation and Regulation 569",
    label: "Legislation and Regulation 569",
  },
  {
    value: "Legislation and Regulation 569 - Mendelson",
    label: "Legislation and Regulation 569 - Mendelson",
  },
  {
    value: "Local Government Practicum 447 - Taylor",
    label: "Local Government Practicum 447 - Taylor",
  },
  {
    value: "Low-Income Taxpayer Clinic 933 - Appleberry",
    label: "Low-Income Taxpayer Clinic 933 - Appleberry",
  },
  {
    value: "Low-Income Taxpayer Clinic Sem 934 - Appleberry",
    label: "Low-Income Taxpayer Clinic Sem 934 - Appleberry",
  },
  { value: "Mass Incarceration 642", label: "Mass Incarceration 642" },
  {
    value: "Mass Incarceration 642 - Jones Jr",
    label: "Mass Incarceration 642 - Jones Jr",
  },
  {
    value: "Mergers and Acquisitions 705 - Willbrand",
    label: "Mergers and Acquisitions 705 - Willbrand",
  },
  {
    value: "Michigan Innocence Clinic 976 - Moran, Syed, Richardson",
    label: "Michigan Innocence Clinic 976 - Moran, Syed, Richardson",
  },
  {
    value: "Michigan Innocence Clinic 976 - Richardson, Syed",
    label: "Michigan Innocence Clinic 976 - Richardson, Syed",
  },
  {
    value: "Michigan Innocence Clinic Sem 977 - Moran, Syed, Richardson",
    label: "Michigan Innocence Clinic Sem 977 - Moran, Syed, Richardson",
  },
  {
    value: "Michigan Innocence Clinic Sem 977 - Richardson, Syed",
    label: "Michigan Innocence Clinic Sem 977 - Richardson, Syed",
  },
  {
    value: "Mini-Seminar 885 - Bromberg, Osbeck",
    label: "Mini-Seminar 885 - Bromberg, Osbeck",
  },
  {
    value: "Mini-Seminar 885 - Guenther",
    label: "Mini-Seminar 885 - Guenther",
  },
  { value: "Mini-Seminar 885 - Herzog", label: "Mini-Seminar 885 - Herzog" },
  {
    value: "Mini-Seminar 885 - Kornblatt, Lefort",
    label: "Mini-Seminar 885 - Kornblatt, Lefort",
  },
  { value: "Mini-Seminar 885 - Pinto", label: "Mini-Seminar 885 - Pinto" },
  {
    value: "Mini-Seminar 885 - Sankaran, Sadek",
    label: "Mini-Seminar 885 - Sankaran, Sadek",
  },
  {
    value: "Mini-Seminar 885 - Schlanger",
    label: "Mini-Seminar 885 - Schlanger",
  },
  {
    value: "Mini-Seminar 885 - Caminker",
    label: "Mini-Seminar 885 - Caminker",
  },
  {
    value: "Mini-Seminar 885 - Edmonds, Krishna",
    label: "Mini-Seminar 885 - Edmonds, Krishna",
  },
  { value: "Mini-Seminar 885 - Niehoff", label: "Mini-Seminar 885 - Niehoff" },
  {
    value: "Modern Amer Legal History 508 - Novak",
    label: "Modern Amer Legal History 508 - Novak",
  },
  {
    value: "Natural Resources Law 575 - Barsky, Mergen",
    label: "Natural Resources Law 575 - Barsky, Mergen",
  },
  { value: "Negotiation 712 - Kimball", label: "Negotiation 712 - Kimball" },
  {
    value: "Part-Time Externship 990 - Sankaran",
    label: "Part-Time Externship 990 - Sankaran",
  },
  {
    value: "Part-Time Externship Seminar 991 - Sankaran",
    label: "Part-Time Externship Seminar 991 - Sankaran",
  },
  {
    value: "Partnership Tax 726 - Adams",
    label: "Partnership Tax 726 - Adams",
  },
  {
    value: "Patent Litigation 444 - Cantor",
    label: "Patent Litigation 444 - Cantor",
  },
  {
    value: "Peacemaking in State Just Sys 773 - Connors, Connors",
    label: "Peacemaking in State Just Sys 773 - Connors, Connors",
  },
  {
    value: "Pediatric Advoc Clinic 958 - Chopp, Cowin",
    label: "Pediatric Advoc Clinic 958 - Chopp, Cowin",
  },
  {
    value: "Pediatric Advoc Clinic Sem 959 - Chopp, Cowin",
    label: "Pediatric Advoc Clinic Sem 959 - Chopp, Cowin",
  },
  {
    value: "Philosophy of Law: Sel Topics 782 - Hershovitz",
    label: "Philosophy of Law: Sel Topics 782 - Hershovitz",
  },
  {
    value: "Policy Wksh: Mich Court Reform 589 - Andres",
    label: "Policy Wksh: Mich Court Reform 589 - Andres",
  },
  {
    value: "Presidential Powers 893 - Mortenson",
    label: "Presidential Powers 893 - Mortenson",
  },
  {
    value: "Privacy, Tech & 4th Amendment 875 - Caminker",
    label: "Privacy, Tech & 4th Amendment 875 - Caminker",
  },
  {
    value: "Private Agreements, Pub Values 816 - Jordan",
    label: "Private Agreements, Pub Values 816 - Jordan",
  },
  {
    value: "Private Law Theory 442 - Hershovitz, Logue",
    label: "Private Law Theory 442 - Hershovitz, Logue",
  },
  {
    value: "Problems in Const'l Theory 834 - Primus",
    label: "Problems in Const'l Theory 834 - Primus",
  },
  { value: "Property 560 - Cornell", label: "Property 560 - Cornell" },
  {
    value: "Public Control of Land Use 735 - Schneider",
    label: "Public Control of Land Use 735 - Schneider",
  },
  {
    value: "Public Interest Litig Ethics 408 - Vandervort",
    label: "Public Interest Litig Ethics 408 - Vandervort",
  },
  {
    value: "PublicSect K-12Educ Ext Pract 998 - Sankaran",
    label: "PublicSect K-12Educ Ext Pract 998 - Sankaran",
  },
  {
    value: "PublicSect K-12Educ Ext Sem 997 - Sankaran",
    label: "PublicSect K-12Educ Ext Sem 997 - Sankaran",
  },
  {
    value: "PublicSect K-12Educ Externship 995 - Sankaran",
    label: "PublicSect K-12Educ Externship 995 - Sankaran",
  },
  {
    value: "Race and International Law 431 - Hakimi",
    label: "Race and International Law 431 - Hakimi",
  },
  {
    value: "Race, Law, and Citizenship 427 - Novak",
    label: "Race, Law, and Citizenship 427 - Novak",
  },
  { value: "Real Est Law 482 - Schloff", label: "Real Est Law 482 - Schloff" },
  {
    value: "Real Estate Law 582 - Schloff",
    label: "Real Estate Law 582 - Schloff",
  },
  {
    value: "Real Estate Transactions 406 - Cameron Jr",
    label: "Real Estate Transactions 406 - Cameron Jr",
  },
  {
    value: "Rebuilding American Democracy 837 - Andrias",
    label: "Rebuilding American Democracy 837 - Andrias",
  },
  {
    value: "Regulating Contagion/ Leg Hist 525 - Bagley",
    label: "Regulating Contagion/ Leg Hist 525 - Bagley",
  },
  {
    value: "Reproductive Rights & Justice 469 - Litman",
    label: "Reproductive Rights & Justice 469 - Litman",
  },
  {
    value: "Secured Transactions 652 - Bartell",
    label: "Secured Transactions 652 - Bartell",
  },
  {
    value: "Securities Regulation 743 - Pritchard",
    label: "Securities Regulation 743 - Pritchard",
  },
  { value: "Semester Study Abroad 945", label: "Semester Study Abroad 945" },
  {
    value: "Semester Study Abroad Paper 946",
    label: "Semester Study Abroad Paper 946",
  },
  {
    value: "Senior Judge Seminar 799 - Becker",
    label: "Senior Judge Seminar 799 - Becker",
  },
  {
    value: "Senior Judge Seminar II 794 - Becker",
    label: "Senior Judge Seminar II 794 - Becker",
  },
  {
    value: "Senior Judge Seminar II 794 - Primus",
    label: "Senior Judge Seminar II 794 - Primus",
  },
  {
    value: "SexualOrien/GenderID & the Law 404 - Carroll",
    label: "SexualOrien/GenderID & the Law 404 - Carroll",
  },
  {
    value: "South Africa Externship 938 - Sankaran",
    label: "South Africa Externship 938 - Sankaran",
  },
  {
    value: "South Africa Externship Sem 939 - Sankaran",
    label: "South Africa Externship Sem 939 - Sankaran",
  },
  {
    value: "State Government Law & Policy 416 - Esty",
    label: "State Government Law & Policy 416 - Esty",
  },
  {
    value: "State Supreme Court Practice 878 - McCormack",
    label: "State Supreme Court Practice 878 - McCormack",
  },
  {
    value: "Sustainability and International Trade 445 - Haverkamp",
    label: "Sustainability and International Trade 445 - Haverkamp",
  },
  {
    value: "Tax Planning for Corp Transac 437 - Adams",
    label: "Tax Planning for Corp Transac 437 - Adams",
  },
  {
    value: "Tax Policy Seminar 424 - Fox",
    label: "Tax Policy Seminar 424 - Fox",
  },
  {
    value: "Taxation of Individual Income 747 - Fox",
    label: "Taxation of Individual Income 747 - Fox",
  },
  {
    value: "The Laws of Change 422 - Davenport",
    label: "The Laws of Change 422 - Davenport",
  },
  { value: "Torts 580 - Sommers", label: "Torts 580 - Sommers" },
  {
    value: "Trademarks and Unfair Competition 760 - Eisenberg",
    label: "Trademarks and Unfair Competition 760 - Eisenberg",
  },
  {
    value: "Transactional Drafting 433 - Becker",
    label: "Transactional Drafting 433 - Becker",
  },
  {
    value: "Transnational Law 606 - Reimann",
    label: "Transnational Law 606 - Reimann",
  },
  { value: "Tribal Law 740 - Fletcher", label: "Tribal Law 740 - Fletcher" },
  {
    value: "Unjustified Enrichment 784 - Frier",
    label: "Unjustified Enrichment 784 - Frier",
  },
  {
    value: "Veterans Legal Clinic 978 - Andres",
    label: "Veterans Legal Clinic 978 - Andres",
  },
  {
    value: "Veterans Legal Clinic Seminar 979 - Andres",
    label: "Veterans Legal Clinic Seminar 979 - Andres",
  },
  {
    value: "Workers' Rights Clinic I 974",
    label: "Workers' Rights Clinic I 974",
  },
  {
    value: "Workers' Rights Clinic I 974 - Kohl, Van Hoven",
    label: "Workers' Rights Clinic I 974 - Kohl, Van Hoven",
  },
  {
    value: "Workers' Rights Clnc Research 975 - Kohl, Van Hoven",
    label: "Workers' Rights Clnc Research 975 - Kohl, Van Hoven",
  },
  {
    value: "Workers' Rts Clinic:Supv&Litig 984 - Kohl, Barry, Van Hoven",
    label: "Workers' Rts Clinic:Supv&Litig 984 - Kohl, Barry, Van Hoven",
  },
  {
    value: "Workers' Rts Clnc:Supv&Lit Sem 985 - Kohl, Barry, Van Hoven",
    label: "Workers' Rts Clnc:Supv&Lit Sem 985 - Kohl, Barry, Van Hoven",
  },
  {
    value: "Workers' Rts Clnc:Supv&Lit Sem 985 - Kohl, Van Hoven, Barry",
    label: "Workers' Rts Clnc:Supv&Lit Sem 985 - Kohl, Van Hoven, Barry",
  },
];
