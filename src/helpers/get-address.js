export async function getAddress(ip = '8.8.8.8') {
  const res = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_7olAwwDk4ZiV7PvELd6ec8yAie3e0&ipAddress=${ip}`
  );
  return await res.json();
}
