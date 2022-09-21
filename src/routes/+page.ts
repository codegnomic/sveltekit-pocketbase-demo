import { client } from "$lib/db"

export async function load({ parent }) {
  let posts
  let { rooms } = await parent()
  let room = "j954g1mwqasynk5"

  let [currentRoom] = rooms.filter((room) => room.id == room)

  try {
    posts = await client.records.getList("posts", 1, 100, {
      expand: "user",
      filter: `room = "${room}" `,
    })
  } catch (error) {
    console.log(error)
  }
  return {
    posts,
    rooms,
    currentRoom,
  }
}
