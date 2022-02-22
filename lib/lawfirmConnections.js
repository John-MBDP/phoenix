export const sendConnectionRequest = async (connectionIds) => {
  const response = await fetch("/api/connections/lawfirms/create", {
    method: "POST",
    body: JSON.stringify({ ...connectionIds, date_changed: new Date() })
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  console.log("sent connection request!");
  return await response.json();
};

export const destroyConnectionRequest = async (connectionIds) => {
  const response = await fetch("/api/connections/lawfirms/delete", {
    method: "POST",
    body: JSON.stringify({ ...connectionIds })
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  console.log("destroyed connection!");
  return await response.json();
};
