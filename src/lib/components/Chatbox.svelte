<script lang="ts">
  import { client } from "$lib/db"
  import { onMount, afterUpdate, onDestroy } from "svelte"
  import ChatInput from "./ChatInput.svelte"

  export let posts
  export let room
  let chatbox

  async function fetchPosts() {
    try {
      const postsData = await client.records.getList("posts", 1, 100, {
        expand: "user",
        filter: `room = "${room.id}"`,
      })
      posts = postsData.items
    } catch (error) {
      console.log(error)
    }
  }

  onMount(async () => {
    try {
      await client.realtime.subscribe("posts", function (e) {
        fetchPosts()
      })
    } catch (error) {
      console.log(error)
    }

    // chatbox.scrollTop = chatbox.scrollHeight
  })

  afterUpdate(() => {
    chatbox.scrollTop = chatbox.scrollHeight
  })
</script>

<div class="chatbox" bind:this={chatbox}>
  {#each posts as post}
    <div>
      <span>{post["@expand"].user.name}: </span>
      <p class="post-body">{post.body}</p>
    </div>
  {/each}
</div>

<ChatInput {room} />

<style>
  .post-body {
    display: inline;
  }
  .chatbox {
    border: 1px solid black;
    width: 100%;
    overflow: scroll;
    height: 50vh;
  }
</style>
