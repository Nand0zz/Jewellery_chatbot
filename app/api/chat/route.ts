import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "",
});

export async function POST(req: Request) {
    try {
        const { messages, systemContext } = await req.json();

        const systemPrompt = `You are a knowledgeable and helpful sales assistant for **Kalyani Fine Jewellery**.
Your goal is to assist customers in finding the perfect jewellery for their special occasions.
You are polite, professional, and enthusiastic.
Use emojis sparingly but effectively to create a warm tone (✨, 💍, 💖).

Context on relevant products based on user's query:
${systemContext || "No specific products found yet based on strict rules, but answer general questions helpfully."}

If the user asks about specific products shown in the context, refer to them.
If the context is empty, ask clarifying questions to understand their needs (occasion, type of jewellery, budget, preferences).
Keep responses concise and encouraging.`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                ...messages.map((msg: any) => ({
                    role: msg.role,
                    content: msg.content,
                })),
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stop: null,
            stream: false,
        });

        return NextResponse.json({
            content: chatCompletion.choices[0]?.message?.content || "I apologize, but I'm having trouble connecting right now. Please try again.",
        });
    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json(
            { error: "Failed to process chat request" },
            { status: 500 }
        );
    }
}
