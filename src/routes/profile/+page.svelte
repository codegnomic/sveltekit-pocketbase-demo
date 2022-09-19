<script>
  import { client } from "$lib/db"
  import { state } from "$lib/stores"

  let profile
  let username

  const handleProfileUpdate = async () => {
    try {
      await client.records.update("profiles", $state.user.user.profile.id, {
        name: username,
      })
      state.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  $: profile = $state.user?.user.profile
</script>

{#if !$state.user}
  <p>
    Please <a href="/login">login</a> to see your profile, or
    <a href="/register">register</a> if you don't yet have an account.
  </p>
{:else if profile}
  <h1>Hello, {profile.name}</h1>

  <form on:submit|preventDefault={handleProfileUpdate}>
    <label for="username">Change username</label>
    <input type="text" name="username" bind:value={username} />
    <button type="submit">Submit</button>
  </form>
{/if}
