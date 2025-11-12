// Hardcoded data for development
export const mockCompetitions = [
  {
    id: 39,
    name: "Premier League",
    country: "England",
    logo: "https://media.api-sports.io/football/leagues/39.png",
  },
  {
    id: 140,
    name: "La Liga",
    country: "Spain",
    logo: "https://media.api-sports.io/football/leagues/140.png",
  },
  {
    id: 78,
    name: "Bundesliga",
    country: "Germany",
    logo: "https://media.api-sports.io/football/leagues/78.png",
  },
  {
    id: 135,
    name: "Serie A",
    country: "Italy",
    logo: "https://media.api-sports.io/football/leagues/135.png",
  },
  {
    id: 61,
    name: "Ligue 1",
    country: "France",
    logo: "https://media.api-sports.io/football/leagues/61.png",
  },
];

export const mockFixtures = [
  {
    id: 1,
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    homeScore: 2,
    awayScore: 1,
    status: "FT",
    time: "90'",
    league: "Premier League",
  },
  {
    id: 2,
    homeTeam: "Barcelona",
    awayTeam: "Real Madrid",
    homeScore: 1,
    awayScore: 3,
    status: "LIVE",
    time: "67'",
    league: "La Liga",
  },
  {
    id: 3,
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    homeScore: null,
    awayScore: null,
    status: "NS",
    time: "15:30",
    league: "Bundesliga",
  },
  {
    id: 4,
    homeTeam: "Juventus",
    awayTeam: "AC Milan",
    homeScore: 2,
    awayScore: 2,
    status: "HT",
    time: "HT",
    league: "Serie A",
  },
  {
    id: 5,
    homeTeam: "PSG",
    awayTeam: "Marseille",
    homeScore: 0,
    awayScore: 1,
    status: "LIVE",
    time: "23'",
    league: "Ligue 1",
  },
];

export const mockNews = [
  {
    id: 1,
    title: "Manchester United signs new striker",
    excerpt: "Red Devils complete deal for promising forward...",
    image: "https://via.placeholder.com/400x200",
    publishedAt: "2 hours ago",
  },
  {
    id: 2,
    title: "Champions League draw announced",
    excerpt: "Exciting matchups revealed for knockout stages...",
    image: "https://via.placeholder.com/400x200",
    publishedAt: "5 hours ago",
  },
  {
    id: 3,
    title: "Injury update: Star player out for season",
    excerpt: "Club confirms devastating news for key player...",
    image: "https://via.placeholder.com/400x200",
    publishedAt: "1 day ago",
  },
];

export const mockStandings = [
  { position: 1, team: "Arsenal", played: 20, points: 50, form: "WWWDW" },
  { position: 2, team: "Man City", played: 20, points: 48, form: "WWWWL" },
  { position: 3, team: "Newcastle", played: 20, points: 44, form: "WDWWW" },
  { position: 4, team: "Man United", played: 20, points: 42, form: "LWWDW" },
  { position: 5, team: "Tottenham", played: 20, points: 40, form: "DWWLW" },
];
