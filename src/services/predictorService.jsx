const API_URL = process.env.REACT_APP_API_URL;
const PATH = process.env.REACT_APP_API_PREDICTOR_PATH;

export default async function MakePrediction(data) {
  try {
    const response = await fetch(`${API_URL}${PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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