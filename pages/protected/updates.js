import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import dynamic from "next/dynamic"; // Import dynamic for client-only rendering
import { Button ,Card,CardContent,Typography} from "@mui/material";
import "react-quill/dist/quill.snow.css";
import '../../index.css'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent, { timelineContentClasses } from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
// import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent, Paper, Typography } from '@mui/material';


const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


const API_URL = "https://dailyupdates-backend.onrender.com";


const UpdateBox = () => {
  const [content, setContent] = useState("");
  const [posted,setPosted]=useState(false)
  const router = useRouter();

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleSubmit = async ({content}) => {
    try {
      const token = sessionStorage.getItem('jwtToken')
      const response = await fetch(`${API_URL}/updates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ content }),
      });

      if (response.status === 201) {
        setPosted(true)
      } else {
        router.push('/auth/login')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = ()=>
  {
    const userConfirmation = window.confirm("Do you want to logout?");

if (userConfirmation) {
    // User clicked "OK"
    sessionStorage.clear();
    router.push('/auth/login')

} }

  return (
    <>
    {/* adding logout btn */}
    <div className="logoutbtn"><button onClick={logout}>Logout</button></div>

    <Card style={{ width: '50%', margin: '0 auto' }}>
      <CardContent>
      <div className="updates-container">
      <Typography variant="h5" gutterBottom>
      My Updates For Today
        </Typography>
        <ReactQuill value={content} onChange={handleContentChange} />
        <Button variant="contained" onClick={() => handleSubmit({ content })}>Submit</Button>
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
      <TimelineItem>
        <TimelineDot color="primary" />
        <TimelineContent>
          <Typography variant="h6">Event 1</Typography>
          <Typography>January 2023</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot color="secondary" />
        <TimelineContent>
          <Typography variant="h6">Event 2</Typography>
          <Typography>March 2023</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot color="primary" />
        <TimelineContent>
          <Typography variant="h6">Event 3</Typography>
          <Typography>June 2023</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>


    </>
  );
};

export default UpdateBox;
