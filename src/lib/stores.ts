import { client } from "$lib/db"
import { writable } from "svelte/store"

function createStores() {
  const { subscribe, set, update } = writable({ user: null, alert: null })

  return {
    subscribe,
    login: async (email, password) => {
      try {
        let userData = await client.users.authViaEmail(email, password)
        state.init(userData)
      } catch (error) {
        return set({ user: null, alert: error.message })
      }
    },
    register: async ({ email, password, passwordConfirm, username }) => {
      try {
        let user = await client.users.create({
          email,
          password,
          passwordConfirm,
        })
        await client.users.authViaEmail(email, password)
        await client.records.update("profiles", user.profile.id, {
          name: username,
        })
        state.refresh()
      } catch (error) {
        return set({ user: null, alert: error.message })
      }
    },
    registerAdmin: async (email, password, passwordConfirm, username) => {
      await client.admins.create({ email, password, passwordConfirm })
    },
    refresh: async () => {
      let userData = await client.users.refresh()
      state.init(userData)
    },
    signOut: async () => {
      await client.authStore.clear()
      state.init()
    },
    clearAlert: () => {
      return set({ user: null, alert: null })
    },
    init: async (user = null) => {
      return set({ user, alert: null })
    },
  }
}

export const state = createStores()
