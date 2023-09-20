import { Suspense, useEffect, useRef, useState } from "react";
import { AudioOutline, LeftOutline, LinkOutline, SetOutline, TravelOutline } from "antd-mobile-icons";
import { v4 as uuidv4 } from "uuid";
import "./index.scss";
import { defer, useLoaderData, useNavigate, Await, useLocation } from "react-router-dom";
import { Space, TextArea, Toast } from "antd-mobile";
import ChatSVG from "@/assets/images/bot.svg";
import ChatUser from "@/assets/images/avt.svg";
import { chatIdHistory, messageMatch } from "@/server";

interface chatProps {
  id: string;
  content: string;
  userId: number;
}
const Chat = () => {
  const contentRef: any = useRef(null);
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
  const [chatTitle] = useState<string>(location.state ?? "新的聊天");
  const [inputText, setInputText] = useState<string>("");
  const [chatList, setChatList] = useState<any[]>([]);
  const textChange = (value: string) => {
    setInputText(value);
  };

  const sendMessage = async () => {
    setChatList((pre) => [...pre, { id: uuidv4(), userId: 1, content: [{ id: uuidv4, content: inputText }] }]);
    setInputText("");
    const { content }: any = await messageMatch({ bizCode: "FRUIT_CATEGORY_INFO", prompt: inputText });
    if (content.length) {
      const chatArr: chatProps[] = content.map((item: any) => ({
        id: uuidv4(),
        userId: -1,
        content: item.blockDTO?.paragraphs ?? [],
      }));
      setChatList((prev) => [...prev, ...chatArr]);
    } else {
      setChatList((pre) => [
        ...pre,
        { id: uuidv4(), userId: -1, content: [{ id: uuidv4, content: "这个问题我暂时还不会呢，换个问题试试吧！" }] },
      ]);
    }
  };

  const handleHeightChange = () => {
    if (!contentRef.current) return;
    contentRef.current.scrollTop = contentRef.current?.scrollHeight ?? 0;
  };

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver(handleHeightChange);
    observer.observe(contentRef.current);

    return () => {
      if (contentRef.current && observer) {
        observer.unobserve(contentRef.current);
      }
    };
  }, [inputText, chatList]);

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
      <div className="chat-content" ref={contentRef}>
        <Suspense fallback={<p>loading...</p>}>
          <Await resolve={chatData?.content} errorElement={<p>loader error</p>}>
            {(loaderData) => (
              <>
                {loaderData.map((item: any) => {
                  const { chatContentBlock } = item;
                  return (
                    <div key={item.id} className="task">
                      {item.userId === -1 ? (
                        <div className="avatar">
                          <img src={ChatSVG} alt="bot" />
                        </div>
                      ) : (
                        <div className="avatar user-ava">
                          <img src={ChatUser} alt="avt" />
                        </div>
                      )}
                      {item.userId === -1 ? (
                        <div className="answer ai">
                          {chatContentBlock.paragraphs.map((art: any) => (
                            <div key={art.id}>{art.content}</div>
                          ))}
                        </div>
                      ) : (
                        <div className="answer">{item.chatContent}</div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </Await>
        </Suspense>
        {chatList.map((list: any) => (
          <div key={list.id} className="task">
            {list.userId === -1 ? (
              <div className="avatar">
                <img src={ChatSVG} alt="bot" />
              </div>
            ) : (
              <div className="avatar user-ava">
                <img src={ChatUser} alt="avt" />
              </div>
            )}
            <div className={list.userId === -1 ? "answer ai" : "answer"}>
              {list.content.map((art: any) => (
                <div key={art.id}>{art.content}</div>
              ))}
            </div>
          </div>
        ))}
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
            value={inputText}
            className="area-input"
            placeholder="请输入内容"
            autoSize={{ minRows: 3, maxRows: 15 }}
            onChange={textChange}
          />
          <div className="send-message">
            <Space className="send-button" onClick={sendMessage}>
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
