import {client} from '$lib/db'

export async function load ({data}) {
    let posts
    try {
        posts = await client.records.getList('posts', 1, 100)
    } catch (error) {
        console.log(error)
    }
    return {
        posts: posts
    }
}
