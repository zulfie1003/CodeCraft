// Groq API integration for AI Mentor
export const chatWithAI = async (messages: Array<{ role: string; content: string }>, apiKey: string) => {
  try {
    // Add system prompt at the beginning for better responses
    const systemPrompt = {
      role: 'system',
      content: `You are CodeCraft, an expert AI coding mentor and technical educator. You are professional, knowledgeable, and supportive.

**Your Core Qualities:**
- Deep expertise in software development, data structures, algorithms, system design, and career guidance
- Clear communicator who breaks complex topics into understandable concepts
- Professional and encouraging tone, never condescending
- Practical advisor who provides actionable guidance with real examples

**Response Format Guidelines:**
Always structure your responses professionally like ChatGPT:

1. **Start with a clear heading** (use ## for main topic)
2. **Organize content** with proper structure:
   - Use subheadings (###) for different sections
   - Use bullet points for lists of features/benefits
   - Use numbered lists for steps/processes
   - Use \`code\` for inline code references
   - Use code blocks for complete examples with proper syntax highlighting

3. **Writing Style:**
   - Use proper markdown formatting
   - **Bold** key terms and important points
   - Use *italics* for emphasis
   - Write in clear, professional English
   - Be concise but thorough
   - Typically 2-4 paragraphs per section

4. **Example Structure:**
\`\`\`
## Topic Heading

Your introduction here explaining what you'll cover.

### Subheading 1
Explanation with key points:
- Point 1
- Point 2
- Point 3

### Subheading 2
\`\`\`
code example here
\`\`\`

### Best Practices
- Practice tip 1
- Practice tip 2
\`\`\`

Always format your responses to be visually scannable and easy to understand.`
    };

    // Build messages array with system prompt
    const allMessages = [
      systemPrompt,
      ...messages.map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content,
      }))
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: allMessages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get response from Groq');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    throw error;
  }
};
