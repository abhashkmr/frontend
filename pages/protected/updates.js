import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // Import dynamic for client-only rendering
import { Button ,Card,CardContent,Typography} from "@mui/material";
import withAuth from '../../hoc/withAuth';
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const API_URL = "http://localhost:3001";


const UpdateBox = () => {
  const [content, setContent] = useState("");
  const [posted,setPosted]=useState(false)

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
        // Handle login error, e.g., show error message to user
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
    </Card>
  );
};

export default withAuth(UpdateBox);
