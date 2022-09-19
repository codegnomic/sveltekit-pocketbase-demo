import { state } from "$lib/stores"
import { browser } from "$app/environment"

export async function load({ data }) {
  if (browser) {
    let token = localStorage.getItem("pocketbase_auth")
    if (token) {
      state.refresh()
    }
  }
}
