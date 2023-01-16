import pb from "$db/pocketbase"
import { questions, type IQuestions } from "$db/questions"
import { fail } from "@sveltejs/kit"

import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async function () {
    await pb.collection('users').authWithPassword("asn1998", "123456789")
    const data = await questions.getFullList<IQuestions>(undefined, {
        sort: 'created'
    })

    return {
        questions: structuredClone(data)
    }
}

export const actions: Actions = {
    submit: async ({ request,  }) => {
        const formData = await request.formData();
        const data = {
            "topic": formData.get('topic'),
            "question": formData.get('question')
        };

        try {
            await pb.collection('questions').create(data);
            return { success: true }
        } catch(e) {
            return fail(400, { fail: e })
        }
    },
    reload: async () => {
        try {
            await pb.collection('users').authWithPassword("asn1998", "123456789")
            const data = await questions.getFullList<IQuestions>(undefined, {
                sort: 'created'
            })
    
            return {
                success: true,
                questions: structuredClone(data)
            }
        } catch(e) {
            return fail(400, { fail: e })
        }
    }
}

