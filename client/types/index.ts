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
  GITHUB = 'github',
  FACEBOOK = 'facebook',
  EMAIL = 'email',
  GOOGLE = 'google',
}
