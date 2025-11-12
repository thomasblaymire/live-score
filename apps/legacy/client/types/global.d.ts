interface NavItem {
  id: number
  name: string
  href: string
  icon?: IconType
  secure?: boolean
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

interface Prediction {
  [matchId: number]: {
    teamA: number
    teamB: number
  }
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

interface Match {
  fixture: Fixture
  league: League
  teams: SingleMatchTeams
  goals: Goals
  score: Score
}

interface FavouriteMatches {
  favourites: FavouriteMatch[]
  totalCount: number
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
  venue: FixtureVenue
  status: Status
}

interface User {
  name?: string | null | undefined
  email?: string | null | undefined
  image?: string | null | undefined
}

interface Periods {
  first: number
  second: number
}

interface FixtureVenue {
  id: number
  name: string
  city: string
}

interface AllTeams {
  team: SingleTeam
  venue: SingleVenue
}

interface SingleVenue {
  address: string
  capacity: number
  city: string
  id: number
  image: string
  name: string
  surface: string
}

interface SingleTeam {
  code: string
  country: string
  founded: number
  id: number
  logo: string
  name: string
  national: boolean
  venue: Venue
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
  venue: SearchVenue
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

interface NewsItem {
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

interface Periods {
  first: number
  second: number
}

interface SearchVenue {
  id: number
  name: string
  city: string
}

interface Status {
  long: string
  short: string
  elapsed: number
}

interface Fixture {
  id: number
  referee: string
  timezone: string
  date: Date
  timestamp: number
  periods: Periods
  venue: FixtureVenue
  status: Status
}

interface League {
  id: number
  name: string
  country: string
  logo: string
  flag: string
  season: number
  round: string
}

interface Home {
  id: number
  name: string
  logo: string
  winner: boolean
}

interface Away {
  id: number
  name: string
  logo: string
  winner: boolean
}

interface SingleMatch {
  fixture: Fixture
  league: League
  teams: SingleMatchTeams
  goals: Goals
  score: Score
  events: Event[]
  lineups: Lineup[]
  statistics: Statistic[]
  players: Player4[]
}

interface SingleMatchTeams {
  home: Home
  away: Away
}

interface Goals {
  home: number
  away: number
}

interface Halftime {
  home: number
  away: number
}

interface Fulltime {
  home: number
  away: number
}

interface Extratime {
  home?: any
  away?: any
}

interface Penalty {
  home?: any
  away?: any
}

// We will eventually refactor to this primary type once migrated to live
interface CustomFixture {
  id: number
  apiId: number
  referee: string
  timezone: string
  date: string
  timestamp: number
  venueId: number
  leagueId: number
  homeTeamId: number
  awayTeamId: number
  goalsId: number
  scoreId: number
  statusId: number
  homeTeam: CustomHomeTeam
  awayTeam: CustomAwayTeam
  status: CustomStatus
  goals: CustomGoals
  score: CustomScore
  league: CustomLeague
  venue: CustomVenue
}

interface CustomHomeTeam {
  id: number
  name: string
  logo: string
  winner: boolean
}

interface CustomAwayTeam {
  id: number
  name: string
  logo: string
  winner: boolean
}

interface CustomStatus {
  id: number
  long: string
  short: string
  elapsed: number
}

interface CustomGoals {
  id: number
  home: number
  away: number
}

interface CustomScore {
  id: number
  halftimeHome: number
  halftimeAway: number
  fulltimeHome: number
  fulltimeAway: number
  extratimeHome: any
  extratimeAway: any
  penaltyHome: any
  penaltyAway: any
}

interface CustomLeague {
  id: number
  name: string
  country: string
  logo: string
  flag: string
  season: number
  round: string
}

interface CustomVenue {
  id: number
  name: string
  city: string
}

type CustomMatchesByWeek = Record<string, CustomFixture[]>

interface Score {
  halftime: Halftime
  fulltime: Fulltime
  extratime: Extratime
  penalty: Penalty
}

interface Time {
  elapsed: number
  extra?: any
}

interface Team {
  id: number
  name: string
  logo: string
}

interface PlayerResult {
  id: number
  name: string
  age: number
  number: number
  position: string
  photo: string
}

interface VenueResult {
  id: number
  name: string
  city: string
}

interface TeamResult {
  id: number
  logo: string
  name: string
}

interface Assist {
  id?: number
  name: string
}

interface Event {
  time: Time
  team: Team
  player: Player
  assist: Assist
  type: string
  detail: string
  comments?: any
}

interface Team2 {
  id: number
  name: string
  logo: string
  colors?: any
}

interface Coach {
  id: number
  name: string
  photo: string
}

interface Player2 {
  id: number
  name: string
  number: number
  pos: string
  grid: string
}

interface StartXI {
  player: Player2
}

interface Player3 {
  id: number
  name: string
  number: number
  pos: string
  grid?: any
}

interface Substitute {
  player: Player3
}

interface Lineup {
  team: Team2
  coach: Coach
  formation: string
  startXI: StartXI[]
  substitutes: Substitute[]
}

interface Team3 {
  id: number
  name: string
  logo: string
}

interface Statistic2 {
  type: string
  value: any
}

interface Statistic {
  team: Team3
  statistics: Statistic2[]
}

interface Team4 {
  id: number
  name: string
  logo: string
  update: Date
}

interface Player6 {
  id: number
  name: string
  photo: string
}

interface Games {
  minutes: number
  number: number
  position: string
  rating: string
  captain: boolean
  substitute: boolean
}

interface Shots {
  total: number
  on: number
}

interface Goals2 {
  total?: number
  conceded: number
  assists?: number
  saves?: number
}

interface Passes {
  total: number
  key: number
  accuracy: string
}

interface Tackles {
  total?: number
  blocks: number
  interceptions: number
}

interface Duels {
  total: number
  won: number
}

interface Dribbles {
  attempts: number
  success: number
  past?: number
}

interface Fouls {
  drawn: number
  committed: number
}

interface Cards {
  yellow: number
  red: number
}

interface Penalty2 {
  won?: any
  commited?: any
  scored: number
  missed: number
  saved?: number
}

interface Statistic3 {
  games: Games
  offsides?: number
  shots: Shots
  goals: Goals2
  passes: Passes
  tackles: Tackles
  duels: Duels
  dribbles: Dribbles
  fouls: Fouls
  cards: Cards
  penalty: Penalty2
}

interface Player5 {
  player: Player6
  statistics: Statistic3[]
}

interface Player4 {
  team: Team4
  players: Player5[]
}

interface Tab {
  title: string
}
