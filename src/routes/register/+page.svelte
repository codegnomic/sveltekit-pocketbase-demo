<script lang="ts">
    import { state } from "$lib/stores"
    let email: String
    let password: String
    let passwordConfirm: String

    const handleSubmit = async () => {
        try {
            let res = await state.register(email, password, passwordConfirm)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <input name="email" type="email" bind:value={email} />
    <input name="password" type="password" bind:value={password} />
    <input
        name="passwordConfirm"
        type="password"
        bind:value={passwordConfirm}
    />
    <button type="submit">Register</button>
</form>
