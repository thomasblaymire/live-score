import { retry } from "../../helpers";

export async function fetchLiveScores(apiUrl: string) {
  const response = await retry(async () => {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch live scores: ${response.statusText}`);
    }
    return response;
  });
  return await response.json();
}

export async function fetchFixturesByDate(fixturesByDate: string) {
  const response = await retry(async () => {
    const response = await fetch(fixturesByDate);
    if (!response.ok) {
      throw new Error(`Failed to fetch fixtures: ${response.statusText}`);
    }
    return response;
  });
  const data = await response.json();
  return data.response.slice(0, 15);
}

export async function fetchFixturesByStatus(fixturesByStatus: string) {
  const response = await retry(async () => {
    const response = await fetch(fixturesByStatus);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch fixtures by status: ${response.statusText}`
      );
    }
    return response;
  });
  const data = await response.json();
  return data.response.slice(0, 15);
}
