// import logo from "./logo.svg";
// import "./App.css";
import React, { useEffect, useState } from "react";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";

import { Loader, ThemeProvider } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsexports from "../../aws-exports";
import { useNavigate } from "react-router-dom";

Amplify.configure(awsexports);

const BASE_URL = "http://localhost:3001";

export default function LivenessCheck() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [faceLivenessAlalysis, setFaceLivenessAlalysis] = useState(null);

  const fetchCreateLiveness = async () => {
    console.log("Creating session...");

    const res = await fetch(`${BASE_URL}/session/create`);
    const data = await res.json();
    setSessionId(data.sessionId);
    console.log(data.sessionId);
    console.log("Session Created!!");
    setLoading(false);
    console.log(loading);
    console.log(sessionId);
  };

  useEffect(() => {
    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete = async () => {
    console.log("Getting results...");

    const res = await fetch(`${BASE_URL}/session/get`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId: sessionId }),
    });

    const data = await res.json();
    console.log(data);

    setFaceLivenessAlalysis(data.body);

    if (data.results.Confidence > 50) {
      alert("Verified!!!");
      navigate("/");
    } else {
      alert("We could not verify you. Please verify again!");
      window.location.reload(); // Reloads the whole page
    }
  };

  return (
    <ThemeProvider>
      {loading ? (
        <Loader />
      ) : (
        <FaceLivenessDetector
          sessionId={sessionId}
          region="us-east-1"
          onAnalysisComplete={handleAnalysisComplete}
          disableStartScreen="true"
          // config={(displayText = "How are you!!!!")}
          onError={(error) => {
            // fetchCreateLiveness();
            console.error(error);
            alert("An error occurred. Restarting the session...");
            window.location.reload(); // Reloads the whole page
          }}
        />
      )}
    </ThemeProvider>
  );
}
