import React, { useState } from "react";
import reactLogo from "../../assets/react.svg";
import "./index.css";

function Home() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>1231</div>
      <div className="card">
        <button onClick={() => setCount((count: number) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default Home;