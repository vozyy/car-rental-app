export const createRental = async (token, fetchData) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/create-rental`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fetchData),
    }
  );

  const resBody = await response.json();
  return resBody;
};
