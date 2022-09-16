<script>
    import Chatbox from "$lib/components/Chatbox.svelte"

    export let data
</script>

<Chatbox posts={data.posts.items} />
