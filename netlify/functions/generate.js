exports.handler = async function (event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const API_KEY = process.env.API_KEY;

    if (!API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: { message: "Server misconfigured: API_KEY missing" } })
        };
    }

    try {
        const { prompt, model } = JSON.parse(event.body);

        const isGroq = API_KEY.startsWith('gsk_');
        const apiEndpoint = isGroq
            ? 'https://api.groq.com/openai/v1/chat/completions'
            : 'https://api.openai.com/v1/chat/completions';

        // Try multiple Groq models in case of deprecation
        const apiModel = model || (isGroq ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini');

        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: apiModel,
                messages: [
                    { role: "system", content: "You are an expert web developer and designer. Generate a complete, VISUALLY STUNNING single-page website based on the user's prompt. CRITICAL REQUIREMENTS: 1) Include REAL hero images from Unsplash (https://images.unsplash.com/...), 2) Add smooth CSS animations and transitions, 3) Use gradient backgrounds and glassmorphism effects, 4) Create REAL, RELEVANT content - NO lorem ipsum or placeholder text, 5) Make ALL links and buttons use href='#' and onclick='return false' to prevent navigation, 6) Use modern design with shadows, rounded corners, and visual depth. Output ONLY valid HTML code with Tailwind CSS and no markdown blocks." },
                    { role: "user", content: prompt }
                ]
            })
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: { message: error.message } })
        };
    }
};