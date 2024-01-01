import React, { useState } from "react";
import PokemonList from "./PokemonList";
import { Tabs, Tab, Box } from "@mui/material";
import Pokemon from "./Pokemon";

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

export function PokemonTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (
    _event: React.ChangeEvent<object>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "95%", height: "95vh" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="For Printing" />
        <Tab label="Shiny Buttons" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <PokemonList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Pokemon />
      </TabPanel>
    </Box>
  );
}
