<script lang="ts">
  import { goto } from "$app/navigation"
  import { state } from "$lib/stores"
  let email: String
  let password: String
  let passwordConfirm: String
  let username: String

  const handleSubmit = async () => {
    let payload = {
      email,
      password,
      passwordConfirm,
      username,
    }
    await state.register(payload)
  }

  $: if ($state.user) goto("/")
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="email">Email:</label>
    <input name="email" type="email" bind:value={email} required />
  </div>
  <div>
    <label for="password">Password:</label>
    <input name="password" type="password" bind:value={password} required />
  </div>
  <div>
    <label for="passwordConfirm">Confirm password:</label>
    <input
      name="passwordConfirm"
      type="password"
      bind:value={passwordConfirm}
      required
    />
  </div>
  <div>
    <label for="username">Choose a username:</label>
    <input type="text" name="username" bind:value={username} required />
  </div>

  <button type="submit">Register</button>
</form>

{#if $state.alert}
  <span>{$state.alert}</span>
{/if}
