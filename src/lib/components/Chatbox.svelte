<script lang="ts">
    import { client } from "$lib/db"
    import { onMount } from "svelte"
    import ChatInput from "./ChatInput.svelte"

    export let posts

    async function fetchPosts() {
        const postsData = await client.records.getList("posts", 1, 100, {
            expand: "user",
        })
        posts = postsData.items
    }

    onMount(() => {
        client.realtime.subscribe("posts", function (e) {
            fetchPosts()
        })
    })
</script>

<div class="chatbox">
    {#each posts as post}
        <div>
            <span>{post["@expand"].user.name}: </span>
            <p class="post-body">{post.body}</p>
        </div>
    {/each}
</div>

<ChatInput />

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
