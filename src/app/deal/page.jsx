"use client";
import React, { useState, useEffect } from "react";
import { request, getLogin } from "@/utils/request";
import { get } from "lodash-es";

export default function page() {
  const [connId, setConnId] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 创建 WebSocket 连接
    const newSocket = new WebSocket("wss://ws.okx.com:8443/ws/v5/public");
    setSocket(newSocket);
    let login = getLogin();
    let payload = {
      op: "login",
      args: [
        {
          ...login,
        },
      ],
    };
    newSocket.onopen = () => {
      const subscribeMessage = payload;
      newSocket.send(JSON.stringify(subscribeMessage));
    };
    newSocket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      console.log(event, "onmessage");
      if (data["code"] == 0 && data["event"] == "login") {
        setConnId(data["connId"]);
      }
    };
    newSocket.onerror = (error) => {
      console.log(error, "error");
    };

    return () => {
      // 组件卸载时关闭 WebSocket 连接
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);

  function clickHandle() {
    console.log("点击了");
    if (socket && socket.readyState === 1) {
      socket.send(
        JSON.stringify({
          op: "subscribe",
          args: [
            {
              channel: "tickers",
              instId: "BTC-USDT",
            },
          ],
        })
      );
    }
  }

  return (
    <div>
      page
      <button onClick={clickHandle}>点击</button>
    </div>
  );
}
//
