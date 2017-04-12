import { LOGIN } from './types'

export const localStoragePlugin = store => {
  store.subscribe(({ type }, state) => {
    console.log('localStoragePlugin', type, state)
  })
}
