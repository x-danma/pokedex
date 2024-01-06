import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

const Header = () => {
  const [apiStatus, setApiStatus] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5025/healthy")
      .then((response) => {
        if (response.ok) {
          setApiStatus("Success");
        } else {
          throw new Error("Server response was not ok.");
        }
      })
      .catch((error) => {
        setApiStatus("Error");
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Tooltip title={`Api Connection: ${apiStatus}`}>
        <InfoIcon
          style={{
            color:
              apiStatus === "Success"
                ? "green"
                : apiStatus === "Error"
                ? "red"
                : "grey",
          }}
        />
      </Tooltip>
    </div>
  );
};

export default Header;
