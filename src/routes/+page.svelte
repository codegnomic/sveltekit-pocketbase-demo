<script>
  import Chatbox from "$lib/components/Chatbox.svelte"
  import RoomList from "$lib/components/RoomList.svelte"
  import { state } from "$lib/stores"

  export let data
</script>

{#if $state.user}
  <RoomList rooms={data.rooms} />
  <Chatbox posts={data.posts.items} room={data.currentRoom} />
{:else}
  <p>
    You need to be registered to see the chat, please <a href="/login">login</a>
  </p>
{/if}
