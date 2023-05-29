export async function getFetchNews(): Promise<any> {
  const response = await fetch("http://localhost:3001/news");
  const data = await response.json();
  return data;
}
