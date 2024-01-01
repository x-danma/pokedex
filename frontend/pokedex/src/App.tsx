import React, { useState } from "react";
import "./App.css";
// import Pokemon from './Pokemon';
import PokemonList from "./PokemonList";
import { Tabs, Tab, Box } from "@mui/material";
import Pokemon from "./Pokemon";
import { PokemonProvider } from "./PokemonContext";

type TabPanelProps = {
  value: number;
  index: number;
  children: React.ReactNode;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <PokemonProvider>
      <Box sx={{ width: "95%", height: "95vh" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Pokemon List" />
          <Tab label="Pokemon Boxes" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <PokemonList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Pokemon />
        </TabPanel>
      </Box>
    </PokemonProvider>
  );
}

export default App;
