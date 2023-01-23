export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T
}

export interface Provider {
  callbackUrl: string
  id: string
  name: string
  email: string
  type: string
}

export enum PROVIDERS {
  GITHUB = 'GitHub',
  FACEBOOK = 'Facebook',
  EMAIL = 'Email',
  GOOGLE = 'Google',
}

export interface Competition {
  id: number
  area: Area
  name: string
  code: string
  type: string
  emblem: string
  plan: string
  currentSeason: CurrentSeason
  numberOfAvailableSeasons: number
  lastUpdated: Date
}

export interface Area {
  id: number
  name: string
  code: string
  flag: string
}

export interface CurrentSeason {
  id: number
  startDate: string
  endDate: string
  currentMatchday: number
  winner?: any
}

export interface Standings {
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

export interface Team {
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
}

export enum LEAGUE_CODE {
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
