export const saveFavourite = async (favourite) => {
  const response = await fetch("/api/favourites/lawyers/create", {
    method: "POST",
    body: JSON.stringify({ ...favourite, date_created: new Date() })
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  console.log("saved favourite!");
  return await response.json();
};

export const destroyFavourite = async (favourite) => {
  const response = await fetch("/api/favourites/lawyers/delete", {
    method: "POST",
    body: JSON.stringify(favourite)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  console.log("destroyed favourite!");
  return await response.json();
};
