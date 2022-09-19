<script lang="ts">
  import { goto } from "$app/navigation"
  import { state } from "$lib/stores"
  let email: String
  let password: String

  const handleSubmit = async () => {
    await state.login(email, password)
  }

  $: if ($state.user) goto("/")
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="email">Email:</label><input
      type="email"
      name="email"
      bind:value={email}
    />
  </div>
  <div>
    <label for="password">Password:</label><input
      type="password"
      name="password"
      bind:value={password}
    />
  </div>
  <button type="submit">Login</button>
</form>
{#if $state.alert}
  <span>{$state.alert}</span>
{/if}
