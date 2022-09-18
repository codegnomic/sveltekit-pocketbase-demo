<script>
    import { state } from "$lib/stores"

    const handleSignOut = async () => {
        try {
            await state.signOut()
        } catch (error) {
            console.log(error)
        }
    }
</script>

<nav>
    <a href="/"><button>Home</button></a>
    {#if $state.user}
        <a href="/profile"><button>Profile</button></a>
        <button on:click={handleSignOut}>Sign Out</button>
    {:else}
        <a href="/login"><button>Login</button></a>
        <a href="/register"><button>Register</button></a>
    {/if}
</nav>
