import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import dynamic from "next/dynamic"; // Import dynamic for client-only rendering
import { Button ,Card,CardContent,Typography} from "@mui/material";
import "react-quill/dist/quill.snow.css";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent, { timelineContentClasses } from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';


const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


const API_URL = "http://localhost:3001";


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

  return (
    <Card style={{ width: '50%', margin: '0 auto' }}>
      <CardContent>
      <Typography variant="h5" gutterBottom>
      My Updates For Today
        </Typography>
        <ReactQuill value={content} onChange={handleContentChange} />
        <Button variant="contained" onClick={() => handleSubmit({ content })}>Submit</Button>
        {posted && (
          <div>
            <h1>Update posted</h1>
          </div>
        )}
      </CardContent>
      <Timeline
      sx={{
        [`& .${timelineContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          09:30 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
    </Timeline>
    </Card>
  );
};

export default UpdateBox;
