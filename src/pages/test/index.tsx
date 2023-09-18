import React, { useState } from "react";

import "./index.scss";
const Test = () => {
  const [testMessage, setTestMessage] = useState<string>("scss页面");

  return (
    <div className="test">
      测试页面
      <span className="test-scss">{testMessage}</span>
    </div>
  );
};

export default Test;
