<script>
  import Chatbox from "$lib/components/Chatbox.svelte"
  import RoomList from "$lib/components/RoomList.svelte"
  export let data
</script>

{#if data.posts}
  <RoomList rooms={data.rooms} />
  <Chatbox posts={data.posts.items} room={data.currentRoom} />
{/if}
