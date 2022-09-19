<script lang="ts">
  import { afterNavigate } from "$app/navigation"
  import Nav from "$lib/components/Nav.svelte"
  import { state } from "$lib/stores"

  afterNavigate(() => {
    if (!$state.user) {
      state.clearAlert()
    }
  })
</script>

<Nav />

<slot />
