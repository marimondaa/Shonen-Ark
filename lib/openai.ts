import { OpenAI } from 'openai';

const openai = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

export async function generateTheory(prompt: string) {
    if (!openai) {
        console.warn('OpenAI not configured');
        return null;
    }

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0].message.content;
}
