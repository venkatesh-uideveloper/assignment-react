export async function getFetchSessions(): Promise<any> {
  const response = await fetch("http://localhost:3001/sessions");
  const data = await response.json();
  return data;
}

export async function getFetchChildren(): Promise<any> {
  const response = await fetch("http://localhost:3001/children");
  const data = await response.json();
  return data;
}
