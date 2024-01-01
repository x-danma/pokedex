import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface DropdownProps {
  generation: number;
  onGenerationChange: (newGeneration: number) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  generation,
  onGenerationChange,
}) => {
  const handleChange = (event: SelectChangeEvent<number>) => {
    const newGeneration = Number(event.target.value);
    onGenerationChange(newGeneration);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="generation-select-label"></InputLabel>
      <Select
        labelId="generation-select-label"
        id="generation-select"
        value={generation}
        onChange={handleChange}
      >
        <MenuItem value={1}>Generation 1</MenuItem>
        <MenuItem value={2}>Generation 2</MenuItem>
        <MenuItem value={3}>Generation 3</MenuItem>
        <MenuItem value={4}>Generation 4</MenuItem>
        <MenuItem value={5}>Generation 5</MenuItem>
        <MenuItem value={6}>Generation 6</MenuItem>
        <MenuItem value={7}>Generation 7</MenuItem>
        <MenuItem value={8}>Generation 8</MenuItem>
        <MenuItem value={9}>Generation 9</MenuItem>
        <MenuItem value={-2}>All</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Dropdown;
