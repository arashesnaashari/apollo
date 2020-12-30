import React from "react";

function App() {
  const canvasRef = React.useRef(null);

  return (
    <canvas
      ref={canvasRef}
      width="200"
      height="200"
      onClick={(e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        // implement draw on ctx here
      }}
    />
  );
}

export default App;
