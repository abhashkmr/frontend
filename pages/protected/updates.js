import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import dynamic from "next/dynamic"; // Import dynamic for client-only rendering
import { Button, Card, CardContent, Typography } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import "../../index.css";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent, {
  timelineContentClasses,
} from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
// import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent, Paper, Typography } from '@mui/material';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const API_URL = "https://dailyupdates-backend.onrender.com";

const UpdateBox = () => {
  const [content, setContent] = useState("");
  const [updates, setUpdates] = useState([]);
  const [posted, setPosted] = useState(false);
  const router = useRouter();
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const fetchData = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userdetail")).userId;
      const response = await fetch(`${API_URL}/updates/${userId}`);
      console.log(`${API_URL}/updates/${userId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUpdates(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async ({ content }) => {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await fetch(`${API_URL}/updates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (response.status === 201) {
        setPosted(true);
      } else {
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    const userConfirmation = window.confirm("Do you want to logout?");

    if (userConfirmation) {
      sessionStorage.clear();
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    fetchData();
    console.log("Loading  updates::", updates);
  }, []);

  function formatContent(originalString) {
    var tempElement = document.createElement("div");
    tempElement.innerHTML = originalString;
    var formattedString = tempElement.textContent;
    return formattedString;
  }

  return (
    <>
      {/* adding logout btn */}
      <div className="logoutbtn">
        <button onClick={logout}>Logout</button>
      </div>

      <Card style={{ width: "50%", margin: "0 auto" }}>
        <CardContent>
          <div className="updates-container">
            <Typography variant="h5" gutterBottom>
              My Updates For Today
            </Typography>
            <ReactQuill value={content} onChange={handleContentChange} />
            <Button
              variant="contained"
              onClick={() => handleSubmit({ content })}
            >
              Submit
            </Button>
          </div>
          {posted && (
            <div>
              <h1>Update posted</h1>
            </div>
          )}
        </CardContent>
      </Card>
      {/* adding timeline */}
      <Timeline>
        {updates.map((update) => (
          <TimelineItem key={update.timestamp}>
            <TimelineDot color="primary" />
            <TimelineContent>
              <Typography variant="h6">
                {formatContent(update.content)}
              </Typography>
              <Typography variant="h7">
                {new Date(update.timestamp).toLocaleString("en-US",options)}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </>
  );
};

export default UpdateBox;
