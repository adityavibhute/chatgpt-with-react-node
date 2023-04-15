import openai from 'openai';

export const generateText = async (prompt) => {
  const response = await openai.completions.create({
    engine: 'davinci',
    prompt: prompt,
    maxTokens: 1024,
    n: 1,
    stop: '\n',
  });
  return response.choices[0].text.trim();
}