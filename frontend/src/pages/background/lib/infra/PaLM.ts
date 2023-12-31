import type {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest,
} from "openai";

export async function PaLM({
  input,
  slot,
  chats,
  apiKey,
  onDelta,
}: {
  slot: PaLMSlot;
  chats?: ChatCompletionRequestMessage[];
  input?: string;
  apiKey: string;
  onDelta?: (chunk: string) => unknown;
}): Promise<{ result: string }> {
  const messages: ChatCompletionRequestMessage[] = [];

  if (slot.system) {
    messages.push({
      role: "system",
      content: slot.system,
    });
  }
  if (hasChats(chats)) {
    messages.push(...chats);
  }
  if (input) {
    messages.push({ role: "user", content: input });
  }

  // const response = await fetch("https://api.openai.com/v1/chat/completions", {
  //   headers: {
  //     "Content-Type": "application/json",
  //     // Authorization: `Bearer ${apiKey}`,
  //   },
  //   method: "POST",
  //   body: JSON.stringify({
  //     model: "gpt-3.5-turbo",
  //     max_tokens: slot.maxTokens,
  //     messages,
  //     stream: false,
  //     temperature: slot.temperature,
  //     top_p: slot.topP,
  //     frequency_penalty: slot.frequencyPenalty,
  //     presence_penalty: slot.presencePenalty,
  //   } as CreateChatCompletionRequest),
  // });

  const url = "http://localhost:8080/chat"; // Replace with the actual server URL if needed
  // const urlWithParams = new URL(url);
  // urlWithParams.searchParams.append("human_msg", input || "");

  console.log({ url, input });

  const response = await fetch(
    `http://localhost:8080/chat?human_msg=${JSON.stringify(input)}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );

  console.log({ response });
  if (response.status !== 200) {
    const error = new Error("error");

    throw error;
  }
  const jsonBody = await response.json();
  const result: string = jsonBody.response;
  onDelta?.(result);

  return {
    result,
  };
}

function hasChats(
  chats?: ChatCompletionRequestMessage[]
): chats is ChatCompletionRequestMessage[] {
  return chats !== undefined && chats.length > 0;
}
