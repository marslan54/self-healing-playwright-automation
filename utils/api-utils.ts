import axios from 'axios';

export async function fetchExecutionLogs() {
  const response = await axios.get('https://qainsights-api.folio3.site/api/execution-logs');
  if (response.status !== 200) throw new Error('API failed');
  return response.data;
}
