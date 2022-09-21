<script lang="ts">
  import { createPicker } from "picmo"
  import { createPopperActions } from "svelte-popperjs"
  import { onMount } from "svelte"
  import { state } from "$lib/stores"
  import { client } from "$lib/db"

  export let room
  let input = ""
  let showPicker = false
  let caretPosition = 0

  onMount(() => {
    const rootElement = document.querySelector("#pickerContainer")
    const picker = createPicker({ rootElement })

    picker.addEventListener("emoji:select", (event) => {
      input =
        input.slice(0, caretPosition) + event.emoji + input.slice(caretPosition)
    })
  })

  const [popperRef, popperContent] = createPopperActions({
    placement: "top",
    strategy: "fixed",
  })

  const extraOpts = {
    modifiers: [{ name: "offset", options: { offset: [-40, 0] } }],
  }

  const handleCaretPosition = (e) => {
    caretPosition = e.target.selectionStart
  }

  const handleSubmit = async () => {
    if (input == "") return
    try {
      await client.records.create("posts", {
        user: $state.user.user.profile.id,
        body: input,
        room: room.id,
      })
      input = ""
    } catch (error) {
      console.log(error)
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    bind:value={input}
    on:keyup={handleCaretPosition}
    on:click={handleCaretPosition}
  />
  <span
    use:popperRef
    on:click={() => {
      showPicker = !showPicker
    }}>😃</span
  >
  <button type="submit">Send</button>
</form>

<span use:popperContent={extraOpts} hidden={!showPicker} id="pickerContainer" />
