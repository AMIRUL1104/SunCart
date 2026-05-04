async function getData() {
  const res = await fetch(`${process.env.BETTER_AUTH_URL}/products.json`);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}

export default getData;
