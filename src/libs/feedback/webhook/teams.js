

export default async function teamsfeedbackhook(text) {
    try {
        const response = await fetch(process.env.FEEDBACK_TEAMS_HOOK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                text: text
            })
        }).then((res) => res.json())

        console.log(response)
    } catch (error) {
        console.log(error)
    }
}