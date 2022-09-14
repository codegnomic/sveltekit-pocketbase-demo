import {client} from '$lib/db'
import type { Actions} from '@sveltejs/kit'
export const actions: Actions = {
    default: async (event) => {
        let data = await event.request.formData()
        try { 
            const user = await client.users.create({
                email: data.get('email'),
                password: data.get('password'),
                passwordConfirm: data.get('passwordConfirm')
            })
            console.log(user) 
        } catch (error) { 
            console.log(error.data)
        }
    }
}
