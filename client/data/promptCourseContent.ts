// Course content structure based on promptingguide.ai
export const courseContent = {
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      subsections: [
        { id: "intro-basics", title: "Prompt Engineering Basics" },
        { id: "intro-settings", title: "LLM Settings" },
        { id: "intro-elements", title: "Elements of a Prompt" },
      ],
    },
    {
      id: "techniques",
      title: "Prompting Techniques",
      subsections: [
        { id: "tech-zero-shot", title: "Zero-Shot Prompting" },
        { id: "tech-few-shot", title: "Few-Shot Prompting" },
        { id: "tech-chain-of-thought", title: "Chain-of-Thought Prompting" },
        { id: "tech-self-consistency", title: "Self-Consistency" },
        { id: "tech-generated-knowledge", title: "Generated Knowledge Prompting" },
        { id: "tech-tree-of-thoughts", title: "Tree of Thoughts" },
        { id: "tech-retrieval", title: "Retrieval Augmented Generation" },
        { id: "tech-automatic", title: "Automatic Reasoning and Tool-use" },
        { id: "tech-prompt-chaining", title: "Automatic Prompt Engineer" },
        { id: "tech-active-prompt", title: "Active-Prompt" },
        { id: "tech-directional", title: "Directional Stimulus Prompting" },
        { id: "tech-program-aided", title: "Program-Aided Language Models" },
        { id: "tech-react", title: "ReAct Prompting" },
        { id: "tech-reflexion", title: "Reflexion" },
        { id: "tech-multimodal", title: "Multimodal CoT Prompting" },
        { id: "tech-graph", title: "Graph Prompting" },
      ],
    },
    {
      id: "applications",
      title: "Applications",
      subsections: [
        { id: "app-function-calling", title: "Function Calling" },
        { id: "app-generating-data", title: "Generating Data" },
        { id: "app-synthetic-rag", title: "Generating Synthetic Dataset for RAG" },
        { id: "app-code-generation", title: "Generating Code" },
        { id: "app-graduate-job", title: "Graduate Job Classification" },
        { id: "app-prompt-function", title: "Prompt Function" },
      ],
    },
    {
      id: "prompt-hub",
      title: "Prompt Hub",
      subsections: [
        { id: "hub-classification", title: "Classification" },
        { id: "hub-coding", title: "Coding" },
        { id: "hub-creativity", title: "Creativity" },
        { id: "hub-evaluation", title: "Evaluation" },
        { id: "hub-information", title: "Information Extraction" },
        { id: "hub-image", title: "Image Generation" },
        { id: "hub-mathematics", title: "Mathematics" },
        { id: "hub-question", title: "Question Answering" },
        { id: "hub-reasoning", title: "Reasoning" },
        { id: "hub-text", title: "Text Summarization" },
        { id: "hub-truthfulness", title: "Truthfulness" },
        { id: "hub-adversarial", title: "Adversarial Prompting" },
      ],
    },
    {
      id: "models",
      title: "Models",
      subsections: [
        { id: "model-chatgpt", title: "ChatGPT" },
        { id: "model-code-llama", title: "Code Llama" },
        { id: "model-flan", title: "Flan" },
        { id: "model-gemini", title: "Gemini" },
        { id: "model-gpt4", title: "GPT-4" },
        { id: "model-llama", title: "LLaMA" },
        { id: "model-mistral", title: "Mistral 7B" },
        { id: "model-mixtral", title: "Mixtral" },
        { id: "model-ollama", title: "Ollama" },
        { id: "model-phi2", title: "Phi-2" },
      ],
    },
    {
      id: "risks",
      title: "Risks & Misuses",
      subsections: [
        { id: "risk-adversarial", title: "Adversarial Prompting" },
        { id: "risk-factuality", title: "Factuality" },
        { id: "risk-biases", title: "Biases" },
      ],
    },
    {
      id: "papers",
      title: "Papers",
      subsections: [
        { id: "papers-overview", title: "Overview" },
      ],
    },
    {
      id: "tools",
      title: "Tools",
      subsections: [
        { id: "tools-overview", title: "Overview" },
      ],
    },
    {
      id: "notebooks",
      title: "Notebooks",
      subsections: [
        { id: "notebooks-overview", title: "Overview" },
      ],
    },
    {
      id: "datasets",
      title: "Datasets",
      subsections: [
        { id: "datasets-overview", title: "Overview" },
      ],
    },
    {
      id: "additional",
      title: "Additional Reading",
      subsections: [
        { id: "additional-overview", title: "Overview" },
      ],
    },
  ],
};

// Content data for each section
export const contentData: Record<string, { title: string; content: string }> = {
  "intro-basics": {
    title: "Prompt Engineering Basics",
    content: `Prompt engineering is a relatively new discipline for developing and optimizing prompts to efficiently use language models (LMs) for a wide variety of applications and research topics. Prompt engineering skills help to better understand the capabilities and limitations of large language models (LLMs).

Researchers use prompt engineering to improve the capacity of LLMs on a wide range of common and complex tasks such as question answering and arithmetic reasoning. Developers use prompt engineering to design robust and effective prompting techniques that interface with LLMs and other tools.

Prompt engineering is not just about designing and developing prompts. It encompasses a wide range of skills and techniques that are useful for interacting and developing with LLMs. It's an important skill to interface, build with, and understand capabilities of LLMs. You can use prompt engineering to improve safety of LLMs and build new capabilities like augmenting LLMs with domain knowledge and external tools.

Motivated by the high interest in developing with LLMs, we have created this new prompt engineering guide that contains all the latest papers, advanced prompting techniques, learning guides, model-specific prompting guides, lectures, references, new LLM capabilities, and tools related to prompt engineering.`,
  },
  "intro-settings": {
    title: "LLM Settings",
    content: `When working with prompts, you interact with the LLM via an API or directly. You can configure a few parameters to get different results for your prompts.

**Temperature**: The lower the temperature, the more deterministic the results. Increasing temperature leads to more randomness and diverse outputs.

**Top P**: Nucleus sampling technique to control determinism. Lower values select confident responses, higher values enable more diverse outputs.

**Max Length**: Manage the number of tokens generated to prevent long responses and control costs.

**Stop Sequences**: Strings that stop the model from generating tokens, helping control response length and structure.

**Frequency Penalty**: Reduces word repetition by penalizing tokens based on their frequency in the response.

**Presence Penalty**: Prevents phrase repetition by applying equal penalty to all repeated tokens.`,
  },
  "intro-elements": {
    title: "Elements of a Prompt",
    content: `A prompt can contain the following elements:

- **Instruction**: A specific task or instruction you want the model to perform
- **Context**: External information or additional context for better responses
- **Input Data**: The input or question you want a response for
- **Output Indicator**: The type or format of the output

You don't need all four elements, and the format depends on the task at hand.

**General Tips for Designing Prompts:**

1. **Start Simple**: Begin with simple prompts and iterate based on results
2. **The Instruction**: Use clear commands like "Write", "Classify", "Summarize", "Translate"
3. **Specificity**: Be detailed and descriptive about the desired task and outcome
4. **Avoid Impreciseness**: Be specific and direct in your instructions
5. **To do or not to do**: Say what to do instead of what not to do`,
  },
  "tech-zero-shot": {
    title: "Zero-Shot Prompting",
    content: `Large language models like GPT-4 and Claude 3 can perform tasks in a "zero-shot" manner, meaning the prompt doesn't contain examples or demonstrations. The model directly performs the task based on the instruction alone.

**Example:**
Prompt: "Classify the text into neutral, negative or positive. Text: I think the vacation is okay. Sentiment:"
Output: "Neutral"

The model understands sentiment classification without any examples. This capability comes from instruction tuning and RLHF (reinforcement learning from human feedback).

When zero-shot doesn't work well, it's recommended to provide demonstrations, leading to few-shot prompting.`,
  },
  "tech-few-shot": {
    title: "Few-Shot Prompting",
    content: `Few-shot prompting provides demonstrations in the prompt to enable in-context learning. The demonstrations condition the model for better performance on complex tasks.

**Example:**
A "whatpu" is a small, furry animal native to Tanzania. An example of a sentence that uses the word whatpu is:
We were traveling in Africa and we saw these very cute whatpus.

To do a "farduddle" means to jump up and down really fast. An example of a sentence that uses the word farduddle is:

Output: "When we won the game, we all started to farduddle in celebration."

The model learns from just one example (1-shot). For difficult tasks, increase demonstrations (3-shot, 5-shot, 10-shot, etc.).

**Limitations**: Standard few-shot prompting isn't perfect for complex reasoning tasks, requiring more advanced techniques like chain-of-thought prompting.`,
  },
  "tech-chain-of-thought": {
    title: "Chain-of-Thought Prompting",
    content: `Chain-of-thought (CoT) prompting enables complex reasoning through intermediate reasoning steps. Combine it with few-shot prompting for better results on tasks requiring reasoning.

**Example:**
The odd numbers in this group add up to an even number: 4, 8, 9, 15, 12, 2, 1.
A: Adding all the odd numbers (9, 15, 1) gives 25. The answer is False.

The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1.
A: Adding all the odd numbers (15, 5, 13, 7, 1) gives 41. The answer is False.

**Zero-shot CoT**: Add "Let's think step by step" to the prompt for automatic step-by-step reasoning without examples.

This emergent ability appears in sufficiently large language models and dramatically improves reasoning performance.`,
  },
  "tech-self-consistency": {
    title: "Self-Consistency",
    content: `Self-consistency is an advanced technique that samples multiple diverse reasoning paths and selects the most consistent answer. It improves chain-of-thought prompting by generating multiple reasoning paths instead of just one.

The key idea is to sample multiple outputs using temperature > 0, then select the most frequent or consistent final answer. This approach helps mitigate the randomness in single-path reasoning and improves accuracy on complex reasoning tasks.`,
  },
  "tech-generated-knowledge": {
    title: "Generated Knowledge Prompting",
    content: `Generated knowledge prompting involves generating relevant knowledge first, then using that knowledge to answer questions or complete tasks. This two-step approach helps models leverage their parametric knowledge more effectively.

The technique is particularly useful for commonsense reasoning tasks where the model needs to recall and apply world knowledge. By explicitly generating the knowledge first, the model can then use it more reliably in subsequent reasoning steps.`,
  },
  "tech-tree-of-thoughts": {
    title: "Tree of Thoughts",
    content: `Tree of Thoughts (ToT) is a framework that generalizes chain-of-thought prompting and encourages exploration over thoughts that serve as intermediate steps for problem solving. It enables language models to perform deliberate decision making by considering multiple reasoning paths.

ToT maintains a tree of thoughts, where each thought is a coherent language sequence that serves as an intermediate step toward solving a problem. This approach allows the model to self-evaluate progress through intermediate thoughts and make deliberate choices, enabling look-ahead and backtracking for global exploration.`,
  },
  "tech-retrieval": {
    title: "Retrieval Augmented Generation (RAG)",
    content: `Retrieval Augmented Generation combines language models with external knowledge retrieval. The system first retrieves relevant documents or information from a knowledge base, then uses that information to generate more accurate and informed responses.

RAG is particularly effective for:
- Reducing hallucinations by grounding responses in retrieved facts
- Incorporating up-to-date information beyond the model's training data
- Providing citations and sources for generated content
- Handling domain-specific knowledge that wasn't in training data

The typical RAG pipeline: Query → Retrieve relevant documents → Generate response using retrieved context.`,
  },
};
