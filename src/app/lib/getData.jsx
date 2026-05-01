async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products.json`);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}

export default getData;
