<script>
  export let rooms
</script>

{#if rooms}
  <div class="container">
    {#each rooms as room}
      <a class="room-btn" href={`/room/${room.title}`}
        ><button>{room.title}</button></a
      >
    {/each}
  </div>
{/if}

<style>
  .container {
    width: 100%;
    background: rgb(55, 111, 49);
    border: 1px solid black;
  }

  .room-btn {
    text-decoration: none;
  }

  .room-btn > button {
    width: 100%;
    color: white;
    display: block;
    border: none;
    background-color: transparent;
  }

  .room-btn > button:hover {
    background-color: yellow;
    color: black;
  }
</style>
