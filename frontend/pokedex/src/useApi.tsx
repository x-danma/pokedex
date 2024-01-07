
function getApiBaseUrl() {
  const apiBaseUrl = 'http://localhost:5025';
  const hostname = window.location.hostname;
  const apiPort = '5025';
  const clientPort = '5173';
  if (hostname.includes('github.dev')) {
    const newApiBaseUrl = hostname.replace(clientPort, apiPort);
    return `https://${newApiBaseUrl}`;
  }
  return apiBaseUrl;
}

const useApi = () => {
  // get baseurl from environment file

  const baseUrl = getApiBaseUrl();

  return {
    HealthCheck: () => fetch(`${baseUrl}/healthy`),
    GetPokemon: (id: number) => fetch(`${baseUrl}/pokemon/${id}`),
    GetPokemonSlim: (id: number) => fetch(`${baseUrl}/pokemon/${id}/slim`),
    GetAllPokemonSlim: () => fetch(`${baseUrl}/pokemon/slim`),
  };
};

export default useApi;
