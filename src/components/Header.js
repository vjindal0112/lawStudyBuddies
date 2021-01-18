import React from "react";
import { Helmet } from "react-helmet";

export default function Header({title, description}) {
  return (
    <>
      <Helmet
        title={title ? `${title} | UMich StudyBuddies` : "UMich StudyBuddies"}
        meta={[
          {
            name: "description",
            content:
              description ? description : "Get paired with study buddies in your class at UMich. We only match you with people we know you will vibe with.",
          },
          {
            name: "og:title", 
            content: title ? `${title} | UMich StudyBuddies` : "UMich StudyBuddies",
          },
          {
            name: "og:description",
            content:
            description ? description : "Get paired with study buddies in your class at UMich. We only match you with people we know you will vibe with.",
          },
          { name: "og:url", content: "https://umichstudybuddies.com" },
          {
            name: "og:image",
            content: "https://umichstudybuddies.com/SocialSharing.png",
          },
          {
            name: "twitter:url",
            content: "https://umichstudybuddies.com",
          },
          {
            name: "twitter:title",
            content: title ? `${title} | UMich StudyBuddies` : "UMich StudyBuddies",
          },
          {
            name: "twitter:description",
            content: "Find study buddies in your classes",
          },
          {
            name: "twitter:image",
            content: "https://umichstudybuddies.com/SocialSharing.png",
          },
        ]}
      >
        <link rel="canonical" href="https://umichstudybuddies.com" />
      </Helmet>
    </>
  );
}
