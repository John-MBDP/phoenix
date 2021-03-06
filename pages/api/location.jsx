export default async function handler(req, res) {
  console.log(req.query);
  const { latitude, longitude } = req.query;

  const response = await fetch(
    `https://us1.locationiq.com/v1/reverse.php?key=${process.env.LOCATION_IQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
  );

  const location = await response.json();

  res.status(200).json({ location: location.address.city });
}
