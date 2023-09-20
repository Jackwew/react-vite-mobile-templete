import request from "@/utils/request";

export const chatHistory = async () => {
  return await request.post("/fig/api/comm/embedding/chats");
};

export const chatIdHistory = async (params: any) => {
  return await request.post("/fig/api/comm/embedding/history-chat", params, { contentType: "formData" });
};

export const messageMatch = async (params: any) => await request.post("/fig/api/comm/embedding/match", params);
