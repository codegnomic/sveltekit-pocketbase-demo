import { state } from "$lib/stores"
import { browser } from "$app/environment"
import { client } from "$lib/db"

export async function load() {
  let rooms = await client.records.getFullList("rooms")

  if (browser) {
    let token = localStorage.getItem("pocketbase_auth")
    if (token) {
      state.refresh()
    }
  }

  return {
    rooms,
  }
}
