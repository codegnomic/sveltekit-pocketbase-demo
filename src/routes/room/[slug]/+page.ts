import { client } from "$lib/db"

export async function load({ params, parent }) {
  let error = null
  let posts
  let { rooms } = await parent()

  let [currentRoom] = rooms.filter((room) => room.title == params.slug)

  try {
    if (currentRoom) {
      posts = await client.records.getList("posts", 1, 100, {
        expand: "user",
        filter: `room = "${currentRoom.id}"`,
      })
    }
  } catch (error) {
    console.log(error)
  }

  return {
    posts,
    currentRoom,
  }
}
