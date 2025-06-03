const API_BASE_URL = 'http://localhost:5000';

export default async function apiRequest(
  endpoint: string,
  method: string = 'GET',
  data: any = null,
  token: any = null
) {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || result.message || 'Something went wrong');
  }

  return result;
}
