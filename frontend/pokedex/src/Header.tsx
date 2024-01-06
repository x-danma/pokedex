/* eslint-disable indent */
import { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import useApi from "./useApi";

const Header = () => {
  const [apiStatus, setApiStatus] = useState("Loading...");
  const api = useApi();

  useEffect(() => {
    api
      .HealthCheck()
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
  }, [api]);

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
