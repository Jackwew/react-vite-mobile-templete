import request from "@/utils/request";

export const chatHistory = async () => {
  return request.post("/fig/api/comm/embedding/chats");
};

export const chatIdHistory = async (params: any) => {
  return request.post("/fig/api/comm/embedding/history-chat", params, { contentType: "formData" });
};
