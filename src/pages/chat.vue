<script setup lang="ts">
import { useUserSession } from "@/stores/userSession";
import { useChat } from "@/composables/useChat";

const userSession = useUserSession();
const { t } = useI18n();
const toast = useToast();

const {
  conversations,
  messages,
  selectedConversationId,
  loadingConversations,
  loadingMessages,
  creatingConversation,
  sendingMessage,
  chatError,
  loadConversations,
  openConversation,
  startConversationWithEmail,
  sendMessage,
} = useChat();

const targetEmail = ref("");
const messageText = ref("");

const activeConversation = computed(() =>
  conversations.value.find(
    (c) => c.conversationId === selectedConversationId.value,
  ),
);

const onStartConversation = async () => {
  try {
    await startConversationWithEmail(targetEmail.value);
    targetEmail.value = "";
  } catch (err: any) {
    toast.add({
      group: "userSignToastGroup",
      severity: "warn",
      summary: "Chat",
      detail: err?.message ?? "Unable to start conversation",
      life: 3000,
    });
  }
};

const onSendMessage = async () => {
  if (!messageText.value.trim()) return;
  try {
    await sendMessage(messageText.value);
    messageText.value = "";
  } catch (err: any) {
    toast.add({
      group: "userSignToastGroup",
      severity: "warn",
      summary: "Chat",
      detail: err?.message ?? "Unable to send message",
      life: 3000,
    });
  }
};
</script>

<template>
  <main>
    <h1>Chat</h1>
    <p v-if="!userSession.session">{{ t("form.message.loggedRequired") }}</p>

    <div v-else class="mt-4 grid gap-4 md:grid-cols-[320px_1fr]">
      <section
        class="border border-surface-300 rounded-md p-3 flex flex-col gap-3"
      >
        <h2 class="font-semibold">New conversation</h2>
        <InputGroup>
          <InputText
            v-model="targetEmail"
            type="email"
            placeholder="User email"
            @keydown.enter="onStartConversation"
          />
          <Button
            :icon="
              creatingConversation ? 'pi pi-spinner pi-spin' : 'pi pi-plus'
            "
            :disabled="creatingConversation || !targetEmail.trim()"
            @click="onStartConversation"
          />
        </InputGroup>

        <Divider />

        <div class="flex items-center justify-between">
          <h2 class="font-semibold">Conversations</h2>
          <Button
            :icon="
              loadingConversations ? 'pi pi-spinner pi-spin' : 'pi pi-refresh'
            "
            text
            rounded
            @click="loadConversations"
          />
        </div>

        <p v-if="!conversations.length" class="text-sm opacity-70">
          No conversations
        </p>

        <div class="flex flex-col gap-2 max-h-96 overflow-auto">
          <button
            v-for="item in conversations"
            :key="item.conversationId"
            type="button"
            class="text-left border rounded-md p-2"
            :class="
              selectedConversationId === item.conversationId
                ? 'border-primary'
                : 'border-surface-300'
            "
            @click="openConversation(item.conversationId)"
          >
            <div class="font-medium">{{ item.otherDisplayName }}</div>
            <div class="text-xs opacity-70">{{ item.otherEmail }}</div>
            <div class="text-xs opacity-60 mt-1 truncate">
              {{ item.lastMessageBody || "No messages yet" }}
            </div>
          </button>
        </div>
      </section>

      <section
        class="border border-surface-300 rounded-md p-3 flex flex-col gap-3 min-h-105"
      >
        <h2 class="font-semibold">
          {{
            activeConversation
              ? activeConversation.otherDisplayName
              : "Select conversation"
          }}
        </h2>

        <p v-if="chatError" class="text-sm text-red-500">{{ chatError }}</p>

        <div
          class="flex-1 border border-surface-200 rounded-md p-3 overflow-auto flex flex-col gap-2"
        >
          <p v-if="loadingMessages" class="opacity-70">Loading messages...</p>
          <p v-else-if="!selectedConversationId" class="opacity-70">
            Select or create a conversation.
          </p>
          <p v-else-if="!messages.length" class="opacity-70">
            No messages yet.
          </p>

          <div
            v-for="message in messages"
            :key="message.id"
            class="max-w-[85%] rounded-md p-2"
            :class="
              message.sender_id === userSession.session.user.id
                ? 'self-end bg-primary text-primary-contrast'
                : 'self-start bg-surface-200'
            "
          >
            <div class="text-sm">{{ message.body }}</div>
            <div class="text-[10px] opacity-70 mt-1">
              {{ $d(new Date(message.created_at), "time") }}
            </div>
          </div>
        </div>

        <InputGroup v-if="selectedConversationId">
          <InputText
            v-model="messageText"
            placeholder="Write a message..."
            @keydown.enter="onSendMessage"
          />
          <Button
            :label="t('words.send')"
            :icon="sendingMessage ? 'pi pi-spinner pi-spin' : 'pi pi-send'"
            :disabled="sendingMessage || !messageText.trim()"
            @click="onSendMessage"
          />
        </InputGroup>
      </section>
    </div>
  </main>
</template>
