export const getVehicles = async (
  token,
  navigate,
  setCarList,
  setErrorMessage
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/vehicles`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const resBody = await response.json();
    if (response.status === 401 || !token) {
      navigate('/login');
    }
    resBody.error ? setErrorMessage(resBody.error) : setCarList(resBody);
  } catch (error) {
    setErrorMessage(error);
  }
};
