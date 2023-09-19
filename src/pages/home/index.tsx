import { Suspense } from "react";
import { defer, useLoaderData, useNavigate, Await } from "react-router-dom";
import { Space, Toast } from "antd-mobile";
import { AddOutline, FaceRecognitionOutline, SetOutline } from "antd-mobile-icons";
import ChatSVG from "@/assets/images/bot.svg";
import "./index.css";
import { chatHistory } from "@/server";
import dayjs from "dayjs";

function Home() {
  const navigate = useNavigate();
  const chatHistoryList: any = useLoaderData();
  return (
    <div className="home-container">
      <div className="home-header">
        <div className="title-box">
          <span>ChatGPT Next</span>
          <span className="sub-title">Build your own AI assistant.</span>
        </div>
        <div className="bot-svg">
          <img src={ChatSVG} alt="bot" />
        </div>
      </div>
      <div className="home-content">
        <Suspense fallback={<p>loading...</p>}>
          <Await resolve={chatHistoryList.list} errorElement={<p>loader error</p>}>
            {(loaderData) => (
              <>
                {loaderData?.content.map((chat: any) => (
                  <div
                    key={chat.chatId}
                    className="chat-history"
                    onClick={() => navigate(`chat/${chat.chatId}`, { state: chat.firstPrompt })}
                  >
                    <div className="chat-title">{chat.firstPrompt.slice(0, 10)}</div>
                    <div className="chat-desc">
                      <div className="chat-number">{chat.count ?? 20}条聊天记录</div>
                      <div className="chat-time">{dayjs(chat.createTime).format("YYYY-MM-DD HH:mm:ss")}</div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </Await>
        </Suspense>
      </div>
      <div className="home-footer">
        <div className="options">
          <div
            className="options-item"
            onClick={() =>
              Toast.show({
                content: "功能开发中...",
                position: "top",
              })
            }
          >
            <SetOutline fontSize={24} />
          </div>
          <div
            className="options-item"
            onClick={() =>
              Toast.show({
                content: "功能开发中...",
                position: "top",
              })
            }
          >
            <FaceRecognitionOutline fontSize={24} />
          </div>
        </div>
        <div className="new-chat" onClick={() => navigate("/chat/0")}>
          <Space>
            <AddOutline fontSize={16} />
            <span>新的聊天</span>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default Home;

export async function loader() {
  return defer({ list: await chatHistory() });
}
