const getGeoLocation = async (callback) => {
  const success = async (data) => {
    const { latitude, longitude } = data.coords;

    const cityData = await fetch(
      `/api/location?latitude=${latitude}&longitude=${longitude}`,
      {
        method: "POST"
      }
    );
    const parsedCitydata = await cityData.json();
    if (callback) {
      callback(parsedCitydata.location);
    }
  };
  const error = (err) => {
    console.log(err.code);
  };

  navigator.geolocation.getCurrentPosition(success, error);
};

export default getGeoLocation;
