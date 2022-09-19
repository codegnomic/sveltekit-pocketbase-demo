import { client } from "$lib/db"

export async function load() {
    let posts
    try {
        posts = await client.records.getList("posts", 1, 100, {
            expand: "user",
        })
    } catch (error) {
        console.log(error)
    }
    return {
        posts: posts,
    }
}
