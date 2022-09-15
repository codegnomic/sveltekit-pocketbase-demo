<script>
    import Chatbox from "$lib/components/Chatbox.svelte"
    import { state } from "$lib/stores"
    $: console.log($state.user)
</script>

{$state?.user}

<Chatbox />
