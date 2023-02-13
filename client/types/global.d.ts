interface NavItem {
  id: number
  name: string
  href: string
}

interface Provider {
  callbackUrl: string
  id: string
  name: string
  email: string
  type: string
}

interface League {
  id: number
  name: string
  type: string
  logo: string
}

interface Country {
  name: string
  code?: any
  flag?: any
}

interface Competition {
  id: number
  name: string
  country: string
  logo: string
  flag: string
  season: number
  standings: Standings[]
}

interface Competitions {
  league: League
  country: Country
  seasons: Season[]
}

interface StandingsTable {
  rank: number
  team: Team
  points: number
  goalsDiff: number
  group: string
  form: string
  status: string
  description: string
  all: All
  home: Home
  away: Away
  update: Date
}

interface Team {
  id: number
  name: string
  logo: string
}

interface Goals {
  for: number
  against: number
}

interface All {
  played: number
  win: number
  draw: number
  lose: number
  goals: Goals
}

interface Goals2 {
  for: number
  against: number
}

interface Home {
  played: number
  win: number
  draw: number
  lose: number
  goals: Goals2
}

interface Goals3 {
  for: number
  against: number
}

interface Away {
  played: number
  win: number
  draw: number
  lose: number
  goals: Goals3
}

interface Fixtures {
  events: boolean
  lineups: boolean
  statistics_fixtures: boolean
  statistics_players: boolean
}

interface Coverage {
  fixtures: Fixtures
  standings: boolean
  players: boolean
  top_scorers: boolean
  top_assists: boolean
  top_cards: boolean
  injuries: boolean
  predictions: boolean
  odds: boolean
}

interface Season {
  year: number
  start: string
  end: string
  current: boolean
  coverage: Coverage
}

interface Standings {
  [x: string]: any
  position: number
  team: Team
  playedGames: number
  form: string
  won: number
  draw: number
  lost: number
  points: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
}

interface League {
  id: number
  name: string
  country: string
  logo: string
  flag: string
  season: number
  standings: Standings[]
}

interface Team {
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
}

enum LEAGUE_CODE {
  PL = 'PL',
  FL1 = 'FL1',
  ELC = 'ELC',
  BSA = 'BSA',
  CL = 'CL',
  EC = 'EC',
  BL1 = 'BL1',
  SA = 'SA',
  DED = 'DED',
  PPL = 'PPL',
  PD = 'PD',
  WC = 'WC',
}

interface FavouriteMatch {
  id: string
  matchId: number
  userId: string
}

interface Fixture {
  id: number
  referee: string
  timezone: string
  date: Date
  timestamp: number
  periods: Periods
  venue: Venue
  status: Status
}

interface Periods {
  first: number
  second: number
}

interface Venue {
  id: number
  name: string
  city: string
}

interface Status {
  long: string
  short: string
  elapsed: number
}
interface TopScorer {
  player: Player
  statistics: Statistic[]
}
interface Birth {
  date: string
  place: string
  country: string
}
interface Player {
  id: number
  name: string
  firstname: string
  lastname: string
  age: number
  birth: Birth
  nationality: string
  height: string
  weight: string
  injured: boolean
  photo: string
}
interface Team {
  id: number
  name: string
  logo: string
}
interface League {
  id: number
  name: string
  country: string
  logo: string
  flag: string
  season: number
}
interface Games {
  appearences: number
  lineups: number
  minutes: number
  number?: any
  position: string
  rating: string
  captain: boolean
}
interface Substitutes {
  in: number
  out: number
  bench: number
}
interface Shots {
  total: number
  on: number
}
interface Goals {
  total: number
  conceded: number
  assists?: number
  saves?: any
}
interface Passes {
  total: number
  key: number
  accuracy: number
}
interface Tackles {
  total: number
  blocks?: number
  interceptions: number
}
interface Duels {
  total: number
  won: number
}
interface Dribbles {
  attempts: number
  success: number
  past?: any
}
interface Fouls {
  drawn: number
  committed: number
}
interface Cards {
  yellow: number
  yellowred: number
  red: number
}
interface Penalty {
  won?: any
  commited?: any
  scored: number
  missed: number
  saved?: any
}

interface Statistic {
  team: Team
  league: League
  games: Games
  substitutes: Substitutes
  shots: Shots
  goals: Goals
  passes: Passes
  tackles: Tackles
  duels: Duels
  dribbles: Dribbles
  fouls: Fouls
  cards: Cards
  penalty: Penalty
}

// Search
interface SearchResult {
  get: string
  parameters: string
  errors: any[]
  results: number
  paging: Paging
  response: SearchResponse[]
}

interface SearchResponse {
  team: SearchTeam
  venue: Venue
}

interface SearchPaging {
  current: number
  total: number
}

interface SearchTeam {
  id: number
  name: string
  code: string
  country: string
  founded?: number
  national: boolean
  logo: string
}

interface SearchVenue {
  id?: number
  name: string
  address: string
  city: string
  capacity?: number
  surface: string
  image: string
}

interface NewsResponse {
  title: string
  author: string | null
  source: NewsSource
  publishedAt: string
  url: string
}

interface NewsSource {
  Id: string
  Name: string
}
