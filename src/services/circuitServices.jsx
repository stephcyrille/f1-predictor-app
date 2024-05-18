const API_URL = 'http://localhost:8000';
const PATH = '/apis/v1/circuits/all/'

export default async function getAlCircuitList() {
  try {
    const response = await fetch(`${API_URL}${PATH}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending data:', error.message);
    throw error;
  }
};