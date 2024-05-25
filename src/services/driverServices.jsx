const API_URL = process.env.REACT_APP_API_URL;
const PATH = process.env.REACT_APP_API_DRIVERS_PATH;

export default async function getAllDriversList() {
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