import { client } from "$lib/db"
import { writable } from "svelte/store"

function createStores() {
    const { subscribe, set, update } = writable({ user: null, alert: null })

    return {
        subscribe,
        login: async (email, password) => {
            let userData = await client.users.authViaEmail(email, password)
            state.init(userData)
        },
        register: async (email, password, passwordConfirm) => {
            await client.users.create({ email, password, passwordConfirm })
        },
        registerAdmin: async (email, password, passwordConfirm) => {
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
        init: async (user = null) => {
            return set({ user, alert: null })
        },
    }
}

export const state = createStores()
