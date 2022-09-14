<script lang="ts">
    import Nav from "$lib/components/Nav.svelte"
    import { state } from "$lib/stores"
    import { onMount } from "svelte"
    onMount(() => {
        const token = localStorage.getItem("pocketbase_auth")
        if (token) {
            state.refresh()
        }
    })
</script>

<Nav />

<slot />
