export const saveFavourite = async (favourite) => {
  const response = await fetch("/api/favourites/lawfirms/create", {
    method: "POST",
    body: JSON.stringify({ ...favourite, date_created: new Date() })
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  console.log("saved!");
  return await response.json();
};

export const destroyFavourite = async (favourite) => {
  const response = await fetch("/api/favourites/lawfirms/delete", {
    method: "POST",
    body: JSON.stringify(favourite)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  console.log("destroyed!");
  return await response.json();
};
