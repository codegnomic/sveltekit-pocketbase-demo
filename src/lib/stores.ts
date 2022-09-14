import {client} from '$lib/db'
import {writable} from 'svelte/store'

function createStores () {
    const {subscribe, set, update} = writable({user: null, alert: null})

    return {
        login: async (email, password) => {
            let userData = await client.users.authViaEmail(email, password)
            state.init(userData) 
        },
        refresh: async () => {
            let userData = await client.users.refresh()
            state.init(userData)
        },
        init: async (user = null) => {
            return set({user, alert: null})
        }, 
    }
}

export const state = createStores()
