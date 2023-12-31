import "regenerator-runtime/runtime.js";
import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import { SlotStorage } from "@pages/background/lib/storage/slotStorage";
import { ApiKeyStorage } from "@pages/background/lib/storage/apiKeyStorage";
import { PaLM } from "@pages/background/lib/infra/PaLM";
import Logger from "@pages/background/lib/utils/logger";
import {
  sendErrorMessageToClient,
  sendMessageToClient,
} from "@src/chrome/message";
import { QuickChatHistoryStorage } from "@pages/background/lib/storage/quickChatHistoryStorage";
import { exhaustiveMatchingGuard } from "@src/shared/ts-util/exhaustiveMatchingGuard";
import { createNewPaLMSlot } from "@src/shared/slot/createNewPaLMSlot";
import { PROMPT_GENERATE_PROMPT } from "@src/constant/promptGeneratePrompt";

reloadOnUpdate("pages/background");

type RequiredDataNullableInput<T extends Message> = {
  type: T["type"];
  input?: unknown;
  data: Exclude<T["data"], undefined>;
};

chrome.runtime.onConnect.addListener((port) => {
  port.onDisconnect.addListener(() => {
    console.log("Port disconnected");
  });
  port.onMessage.addListener(async (message: Message) => {
    Logger.receive(message);

    const sendResponse = <M extends Message>(
      message: RequiredDataNullableInput<M>
    ) => {
      Logger.send(message);
      sendMessageToClient(port, message);
    };

    try {
      switch (message.type) {
        case "GetSlots": {
          const slots = await SlotStorage.getAllSlots();
          /** add default slot when initialize */
          if (slots.length === 0) {
            const defaultSlot = createNewPaLMSlot({ isSelected: true });
            await SlotStorage.addSlot(defaultSlot);
            slots.push(defaultSlot);
          }
          sendResponse({ type: "GetSlots", data: slots });
          break;
        }
        case "AddNewSlot": {
          await SlotStorage.addSlot(message.input);
          sendResponse({ type: "AddNewSlot", data: "success" });
          break;
        }
        case "SelectSlot": {
          const slots = await SlotStorage.getAllSlots();
          const updatedSlots = slots.map((slot) => ({
            ...slot,
            isSelected: message.input === slot.id,
          }));
          await SlotStorage.setAllSlots(updatedSlots);
          sendResponse({ type: "SelectSlot", data: updatedSlots });
          break;
        }
        case "UpdateSlot": {
          const slots = await SlotStorage.updateSlot(message.input);
          sendResponse({ type: "UpdateSlot", data: slots });
          break;
        }
        case "DeleteSlot": {
          const slots = await SlotStorage.deleteSlot(message.input);
          sendResponse({ type: "DeleteSlot", data: slots });
          break;
        }
        case "GetAPIKey": {
          const apiKey = await ApiKeyStorage.getApiKey();
          sendResponse({ type: "GetAPIKey", data: apiKey });
          break;
        }
        case "SaveAPIKey":
          await PaLM({
            input: "hello",
            apiKey: message.input,
            slot: { type: "PaLM" },
          }).catch((error) => {
            ApiKeyStorage.setApiKey(null);
            throw error;
          });
          await ApiKeyStorage.setApiKey(message.input);
          sendResponse({ type: "SaveAPIKey", data: "success" });
          break;
        case "ResetAPIKey":
          await ApiKeyStorage.setApiKey(null);
          sendResponse({ type: "ResetAPIKey", data: "success" });
          break;
        case "RequestInitialDragGPTStream": {
          const slot = await SlotStorage.getSelectedSlot();
          const apiKey = await ApiKeyStorage.getApiKey();
          const response = await PaLM({
            input: message.input,
            slot,
            apiKey,
            onDelta: (chunk) => {
              sendResponse({
                type: "RequestInitialDragGPTStream",
                data: {
                  result: chunk,
                  chunk,
                },
              });
            },
          });
          sendResponse({
            type: "RequestInitialDragGPTStream",
            data: {
              isDone: true,
              result: response.result,
            },
          });
          break;
        }
        case "RequestOnetimePaLM": {
          const selectedSlot = await SlotStorage.getSelectedSlot();
          const apiKey = await ApiKeyStorage.getApiKey();
          const response = await PaLM({
            input: message.input,
            slot: selectedSlot,
            apiKey,
          });
          sendResponse({
            type: "RequestOnetimePaLM",
            data: response,
          });
          break;
        }
        case "RequestQuickPaLMStream": {
          await QuickChatHistoryStorage.pushChatHistories({
            role: "user",
            content: message.input?.at(-1)?.content ?? "",
          });
          const apiKey = await ApiKeyStorage.getApiKey();
          const response = await PaLM({
            chats: message.input,
            slot: { type: "PaLM" },
            apiKey,
            onDelta: (chunk) => {
              sendResponse({
                type: "RequestQuickPaLMStream",
                data: {
                  result: chunk,
                  chunk,
                },
              });
            },
          });
          await QuickChatHistoryStorage.pushChatHistories({
            role: "assistant",
            content: response.result,
          });
          sendResponse({
            type: "RequestQuickPaLMStream",
            data: { result: response.result, isDone: true },
          });
          break;
        }
        case "RequestDragGPTStream": {
          const apiKey = await ApiKeyStorage.getApiKey();
          const response = await PaLM({
            chats: message.input,
            slot: { type: "PaLM" },
            apiKey,
            onDelta: (chunk) => {
              sendResponse({
                type: "RequestDragGPTStream",
                data: {
                  result: chunk,
                  chunk,
                },
              });
            },
          });
          sendResponse({
            type: "RequestDragGPTStream",
            data: { result: response.result, isDone: true },
          });
          break;
        }
        case "RequestOngoingPaLM": {
          const selectedSlot = await SlotStorage.getSelectedSlot();
          const apiKey = await ApiKeyStorage.getApiKey();
          const response = await PaLM({
            chats: message.input,
            slot: selectedSlot,
            apiKey,
          });
          sendResponse({ type: "RequestOngoingPaLM", data: response });
          break;
        }
        case "RequestGeneratePaLMPrompt": {
          const apiKey = await ApiKeyStorage.getApiKey();
          const response = await PaLM({
            input: message.input,
            slot: {
              type: "PaLM",
              system: PROMPT_GENERATE_PROMPT,
            },
            apiKey,
          });
          sendResponse({
            type: "RequestGeneratePaLMPrompt",
            data: response,
          });
          break;
        }
        case "GetQuickChatHistory": {
          const chats = await QuickChatHistoryStorage.getChatHistories();
          sendResponse({ type: "GetQuickChatHistory", data: chats });
          break;
        }
        case "ResetQuickChatHistory": {
          await QuickChatHistoryStorage.resetChatHistories();
          sendResponse({ type: "ResetQuickChatHistory", data: "success" });
          break;
        }
        default: {
          exhaustiveMatchingGuard(message);
        }
      }
    } catch (error) {
      Logger.warn(error);
      sendErrorMessageToClient(port, error);
    }
  });
});
