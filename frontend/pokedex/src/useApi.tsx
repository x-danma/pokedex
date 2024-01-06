const useApi = () => {
  const baseUrl = "http://localhost:5025";

  return {
    HealthCheck: () => fetch(`${baseUrl}/healthy`),
    GetPokemon: (id: number) => fetch(`${baseUrl}/pokemon/${id}`),
    GetPokemonSlim: (id: number) => fetch(`${baseUrl}/pokemon/${id}/slim`),
  };
};

export default useApi;
