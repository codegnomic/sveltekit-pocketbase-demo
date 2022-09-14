<script lang="ts">
    import {state} from '$lib/stores'
    let email: String
    let password: String

    const handleSubmit = async () => {
        try {
            console.log(email, password)
            await state.login(email, password)
        } catch (error) {
            console.log(error)
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <input type="email" name="email" bind:value={email} />
    <input type="password" name="password" bind:value={password} />
    <button type="submit">Login</button>
</form>
