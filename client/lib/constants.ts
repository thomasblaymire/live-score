export const API_URL = process.env.NEXT_PUBLIC_API_URL

export enum ModalName {
  SignIn = 'signIn',
  SignUp = 'signUp',
}
interface Modals {
  [ModalName.SignIn]: boolean
  [ModalName.SignUp]: boolean
}

export enum FavouriteType {
  Team = 'Team',
  Venue = 'Venue',
  Player = 'Player',
}
