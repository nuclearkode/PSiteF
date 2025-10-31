'use server';

/**
 * @fileOverview Implements the DiagramBotDemo flow, showcasing the Diagram Weaver AI tool.
 *
 * - diagramBotDemo - A function that demonstrates the Diagram Weaver AI tool.
 * - DiagramBotDemoInput - The input type for the diagramBotDemo function.
 * - DiagramBotDemoOutput - The return type for the diagramBotDemo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagramBotDemoInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate a diagram.'),
});
export type DiagramBotDemoInput = z.infer<typeof DiagramBotDemoInputSchema>;

const DiagramBotDemoOutputSchema = z.object({
  diagram: z.string().describe('A textual representation of the diagram.'),
});
export type DiagramBotDemoOutput = z.infer<typeof DiagramBotDemoOutputSchema>;

export async function diagramBotDemo(input: DiagramBotDemoInput): Promise<DiagramBotDemoOutput> {
  return diagramBotDemoFlow(input);
}

const diagramBotPrompt = ai.definePrompt({
  name: 'diagramBotPrompt',
  input: {schema: DiagramBotDemoInputSchema},
  output: {schema: DiagramBotDemoOutputSchema},
  prompt: `You are a diagramming tool that takes a topic and outputs a textual representation of a diagram related to that topic.\n\nTopic: {{{topic}}}\nDiagram:`,
});

const diagramBotDemoFlow = ai.defineFlow(
  {
    name: 'diagramBotDemoFlow',
    inputSchema: DiagramBotDemoInputSchema,
    outputSchema: DiagramBotDemoOutputSchema,
  },
  async input => {
    const {output} = await diagramBotPrompt(input);
    return output!;
  }
);
