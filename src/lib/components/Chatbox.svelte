<script lang="ts">
    import { client } from "$lib/db"
    import { onMount } from "svelte"

    let posts = []

    onMount(async () => {
        try {
            let postRequest = await client.records.getList("posts", 1, 100)
            posts = postRequest.items
            console.log(postRequest)
            client.realtime.subscribe("posts", function (e) {
                console.log(e)
            })
        } catch (err) {
            console.log(err)
        }
    })
</script>

<div class="chatbox">
    {#each posts as post}
        <p>{post.body}</p>
    {/each}
</div>
