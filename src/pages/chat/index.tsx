import { Suspense, useState } from "react";
import { AudioOutline, LeftOutline, LinkOutline, SetOutline, TravelOutline } from "antd-mobile-icons";

import "./index.scss";
import { defer, useLoaderData, useNavigate, Await, useNavigation, useLocation } from "react-router-dom";
import { Space, TextArea, Toast } from "antd-mobile";
import ChatSVG from "@/assets/images/bot.svg";
import ChatUser from "@/assets/images/avt.svg";
import { chatIdHistory } from "@/server";

const Chat = () => {
  const navigate = useNavigate();
  const chatData: any = useLoaderData();
  const location = useLocation();
  const action = [
    {
      id: "setting",
      icon: <SetOutline fontSize={24} />,
      click: () => {
        Toast.show({
          content: "功能开发中...",
          position: "top",
        });
      },
    },
    {
      id: "voice",
      icon: <AudioOutline fontSize={24} />,
      click: () => {
        Toast.show({
          content: "功能开发中...",
          position: "top",
        });
      },
    },
  ];
  const [chatTitle, setChatTitle] = useState<string>(location.state ?? "新的聊天");
  const [inputText, setInputText] = useState<string>("");
  const textChange = (value: string) => {
    setInputText(value);
  };
  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="action-button" onClick={() => navigate(-1)}>
          <LeftOutline fontSize={24} />
        </div>
        <div className="chat-title">
          <div className="title">{chatTitle}</div>
          <div className="chat-total">{chatData?.content?.length ?? 0}条对话</div>
        </div>
        <div className="action-button">
          <LinkOutline fontSize={24} />
        </div>
      </div>
      <div className="chat-content">
        <div className="chat-task">
          <Suspense fallback={<p>loading...</p>}>
            <Await resolve={chatData?.content} errorElement={<p>loader error</p>}>
              {(loaderData) => (
                <>
                  {loaderData.map((item: any) => (
                    <div key={item.id} className="task">
                      <div className={item.userId === -1 ? "avatar" : "avatar user-ava"}>
                        <img src={ChatSVG} alt="bot" />
                      </div>
                      <div className={item.userId === -1 ? "answer ai" : "answer"}>{item.chatContent}</div>
                    </div>
                  ))}
                </>
              )}
            </Await>
          </Suspense>
          <div className="task">
            <div className="avatar user-ava">
              <img src={ChatUser} alt="avt" />
            </div>
            <div className="answer">
              Note that useLoaderData does not initiate a fetch. It simply reads the result of a fetch React Router
              manages internally, so you dont need to worry about it refetching when it re-renders for reasons outside
              of routing.
            </div>
          </div>
          {inputText && (
            <div className="task">
              <div className="avatar user-ava">
                <img src={ChatUser} alt="avt" />
              </div>
              <div className="inputing">正在输入...</div>
              <div className="answer">{inputText}</div>
            </div>
          )}
        </div>
      </div>
      <div className="chat-footer">
        <div className="feature-action">
          {action.map((action) => (
            <div key={action.id} className="action-item" onClick={action.click}>
              {action.icon}
            </div>
          ))}
        </div>
        <div className="text-area">
          <TextArea
            className="area-input"
            placeholder="请输入内容"
            autoSize={{ minRows: 3, maxRows: 15 }}
            onChange={textChange}
          />
          <div className="send-message">
            <Space className="send-button">
              <TravelOutline fontSize={16} />
              <span>发送</span>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

export async function loader({ params }: any) {
  const { chatId } = params;
  if (chatId !== "0") {
    const { content }: any = await chatIdHistory({ chatId });
    return defer({ content });
  }
  return { content: [] };
}
