import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  // Determine if this is a copy generation request
  const lastMessage = messages[messages.length - 1];
  const isCopyGeneration = lastMessage.content.includes("ad copy") || 
                          lastMessage.content.includes("cold email") ||
                          lastMessage.content.includes("Generate") ||
                          lastMessage.content.includes("Create compelling");

  let systemPrompt = "You are a helpful AI assistant";
  
  if (isCopyGeneration) {
    if (lastMessage.content.includes("ad copy")) {
      systemPrompt = `You are an expert B2C copywriter specializing in creating compelling ad copy. 
      Your responses should be:
      - Concise and engaging
      - Conversion-focused
      - Tailored to the specific platform and audience
      - Include compelling headlines and clear calls-to-action
      - Use persuasive language that drives action
      - Format the response clearly with headlines, body copy, and CTAs`;
    } else if (lastMessage.content.includes("cold email")) {
      systemPrompt = `You are an expert B2C email marketer specializing in cold email outreach.
      Your responses should be:
      - Personal and relevant to the recipient
      - Include a clear value proposition
      - Have a compelling subject line
      - Include a specific call-to-action
      - Be concise but valuable
      - Use a professional yet approachable tone
      - Format as a complete email with subject line and body`;
    }
  }

  const result = await streamText({
    model: openai("gpt-4o"),
    messages: convertToCoreMessages(messages),
    system: systemPrompt,
  });

  return result.toDataStreamResponse();
}
