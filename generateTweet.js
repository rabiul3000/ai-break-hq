require('dotenv').config();

const generateTweetFromTitle = async ({ title, link }) => {
    const { streamText } = await import('ai');
    const { createOpenRouter } = await import('@openrouter/ai-sdk-provider');

    const openrouter = createOpenRouter({
        apiKey: process.env.OPENROUTER_API_KEY,
    });

    const model = openrouter('anthropic/claude-3.5-sonnet:beta'); // Claude 3.5 Sonnet or update model if needed

    const prompt = `
            You are a witty AI social media assistant. Rewrite this article title into an engaging Twitter post (max 280 characters), including:
            - Relevant emojis
            - 2-3 AI-related hashtags
            - A casual but informative CTA
            - If the title is a question, add "🤔" emoji at the end

Title: ${title}
Link: ${link}
`;

    try {
        const result = await streamText({
            model,
            messages: [{ role: 'user', content: prompt }],
            providerOptions: {
                openrouter: {
                    reasoning: {
                        max_tokens: 280,
                    },
                },
            },
        });

        let fullText = '';
        for await (const delta of result.textStream) {
            fullText += delta;
        }

        if (!fullText || fullText.length < 10) {
            throw new Error("AI returned no tweet");
        }

        return fullText.trim();
    } catch (error) {
        console.error("❌ AI generation failed:", error.message);
        throw error;
    }
};

module.exports = generateTweetFromTitle;
