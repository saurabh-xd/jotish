export const fetchEmployees = async () => {
  const res = await fetch(
    "/api/gettabledata.php",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "test",
        password: "123456",
      }),
    }
  );

  return res.json();
};


