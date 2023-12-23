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
import parse from 'html-react-parser';
import TimelineContent, {
  timelineContentClasses,
} from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save'; 
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';


import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const API_URL = "https://dailyupdates-backend.onrender.com";

const UpdateBox = () => {
  const [content, setContent] = useState("");
  const [updates, setUpdates] = useState([]);
  const [posted, setPosted] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);

  const router = useRouter();

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };
  const handleEditContentChange = (oldcontent) => {
    const contentToEdit = oldcontent;
    setEditedContent(contentToEdit);
  };

  const handleEdit = (index , content) => {
    console.log("editing")
    setEditedContent(content);
    setEditModalOpen(true);
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
   
  const handleDelete = async (userUpdate , timeStamp)=>
  {
    const userId = JSON.parse(localStorage.getItem("userdetail")).userId;
    const userConfirmation = window.confirm(`are you sure you want to delete the update at ${timeStamp}`);

    if (userConfirmation) {
      try {
        const token = sessionStorage.getItem("jwtToken");
        const response = await fetch(`${API_URL}/deleteUpdate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({userUpdate , timeStamp , userId}),
        });
  
        if (response.status === 201) {
          alert('successfully deleted')
        } else {
          alert('deletion unsuccessfull')
        }
      } catch (error) {
        console.log(error);
      }
  
    }
  }

  const logout = () => {
    const userConfirmation = window.confirm("Do you want to logout?");

    if (userConfirmation) {
      sessionStorage.clear();
      router.push("/auth/login");
    }
  };
  const handleSaveEdit = () => {
    const userConfirmation = window.confirm("Do you want to save?");

    if (userConfirmation) {
        alert('edit saved')
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


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

      <h1 className="myupdatesheading">My Updates</h1>
      <div className="timeline-container">
      <Timeline position="right" >

      {updates.map((update, index) => (
  <TimelineItem key={index}  >
    <TimelineOppositeContent color="text.secondary" position="left" className="leftcontent">
      {new Date(update.timestamp).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot color="primary" />
      {index < updates.length - 1 && <TimelineConnector />}
    </TimelineSeparator>
    <TimelineContent className="rightcontent">
    <p>{parse(update.content)}</p>
    <div className= "actionbtns">
    <IconButton
        className="deletebtn"
        aria-label="delete"
        color="primary"
        style={{ color: '#e02f2f' }}
        onClick={() => handleDelete(update.content , update.timestamp )}
      >
        <DeleteIcon />
  
      </IconButton>
      <IconButton
          aria-label="edit"
          color="primary"
          onClick={() => handleEdit(index , update.content)} 
        >
          <EditIcon />
        </IconButton>
        </div>

    
    </TimelineContent>
  </TimelineItem>
))}

<Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Content</DialogTitle>
        <DialogContent>
          <div className="updates-container">
            
            <ReactQuill value={editedContent}  onChange={handleEditContentChange} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary">
            <SaveIcon />
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </Timeline>
      </div>



    </>
  );
};

export default UpdateBox;
