<script>
  export let rooms
</script>

{#if rooms}
  {#each rooms as room}
    <a href={`/room/${room.title}`}>{room.title}</a>
  {/each}
{/if}
