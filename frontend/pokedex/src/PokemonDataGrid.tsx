/* eslint-disable indent */
import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useApi from "./useApi"; // replace with the actual path to your useApi hook
import { PokemonInfo } from "./PokemonCard";
import { getTypeIcon } from "./getTypeIcon";

export function PokemonDataGrid() {
  const api = useApi();
  const [pokemons, setPokemons] = React.useState<PokemonInfo[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    api
      .GetAllPokemonSlim()
      .then((response) => response.json())
      .then((data) => {
        setPokemons(
          data.map((pokemon: any) => ({
            id: pokemon.id,
            number: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.default,
            shinyImage: pokemon.sprites.shiny,
            type: pokemon.types.map((type: string) => type),
          }))
        );
        setIsLoading(false);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "image",
      headerName: "Default Sprite",

      renderCell: (params: GridRenderCellParams<PokemonInfo>) => (
        <>
          <img
            src={params.value}
            alt={params.row.name}
            width="50"
            height="50"
          />
        </>
      ),
      flex: 1,
    },
    {
      field: "shinyImage",
      headerName: "Shiny Sprite",

      renderCell: (params) => (
        <img src={params.value} alt={params.row.name} width="50" height="50" />
      ),
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: (params: GridRenderCellParams<PokemonInfo>) => (
        <>
          <div className="type-icons">
            {params.value.map(
              (
                type: string | undefined,
                index: React.Key | null | undefined
              ) => (
                <img
                  key={index}
                  className="type-icon"
                  src={getTypeIcon(type)}
                  alt={type}
                />
              )
            )}
          </div>
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        position: "sticky",
        bottom: "20px",
        margin: "0 auto",
        width: "100%",
        height: "calc(100vh - 200px)", // Adjust the height as needed
      }}
    >
      <DataGrid rows={pokemons} columns={columns} loading={isLoading} />
    </div>
  );
}
