<script>
  import Chatbox from "$lib/components/Chatbox.svelte"
  import { state } from "$lib/stores"

  export let data
</script>

{#if $state.user}
  <Chatbox posts={data.posts.items} />
{:else}
  <p>
    You need to be registered to see the chat, please <a href="/login">login</a>
  </p>
{/if}
