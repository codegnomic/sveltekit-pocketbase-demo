<script lang="ts">
  import { client } from "$lib/db"
  import { onMount } from "svelte"
  import { state } from "$lib/stores"
  import { createPicker } from "picmo"
  import { createPopperActions } from "svelte-popperjs"

  export let posts
  let input = ""
  let showPicker = false
  let caretPosition

  const [popperRef, popperContent] = createPopperActions({
    placement: "top",
    strategy: "fixed",
  })

  const extraOpts = {
    modifiers: [{ name: "offset", options: { offset: [-40, 0] } }],
  }

  const togglePicker = () => {
    showPicker = !showPicker
  }

  const handleSubmit = async () => {
    if (input == "") return
    try {
      await client.records.create("posts", {
        user: $state.user.user.id,
        body: input,
      })
      input = ""
    } catch (error) {
      console.log(error)
    }
  }

  const handleCaretPosition = (e) => {
    caretPosition = e.target.selectionStart - 1
  }

  async function fetchPosts() {
    const postsData = await client.records.getList("posts", 1, 100)
    posts = postsData.items
  }

  onMount(() => {
    client.realtime.subscribe("posts", function (e) {
      fetchPosts()
    })

    const rootElement = document.querySelector("#pickerContainer")
    const picker = createPicker({ rootElement })

    picker.addEventListener("emoji:select", (event) => {
      input =
        input.slice(0, caretPosition) + event.emoji + input.slice(caretPosition)
    })
  })
</script>

<div class="chatbox">
  {#each posts as post}
    <div>
      <span>{post.user}: </span>
      <p class="post-body">{post.body}</p>
    </div>
  {/each}
</div>

<form on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    bind:value={input}
    bind:this={caretPosition}
    on:keyup={handleCaretPosition}
  />
  <span use:popperRef on:click={togglePicker}>😃</span>
  <button type="submit">Send</button>
</form>

<span use:popperContent={extraOpts} hidden={!showPicker} id="pickerContainer" />

<style>
  .post-body {
    display: inline;
  }
  .chatbox {
    border: 1px solid black;
    overflow: scroll;
    height: 90vh;
  }
</style>
