export async function getJson({ url }) {
  try {
    const res = await fetch(`${process.env.API_URL}${url}`);

    return await res.json();
  } catch (err) {
    throw new Error(err);
  }
}
