import React, { useRef, useEffect } from "react";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  let canvas;
  let context;

  useEffect(() => {
    canvas = canvasRef.current;
    context = canvas.getContext("2d");
    context.fillStyle = "#000000";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  const handleFile = (e) => {
    var img = new Image();
    img.onload = function () {
      var iw = img.width;
      var ih = img.height;
      var scale = Math.min(150 / iw, 120 / ih);
      var iwScaled = iw * scale;
      var ihScaled = ih * scale;
      canvas.width = iwScaled;
      canvas.height = ihScaled;
      context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height);
      ///////////////////////////////
      const byteSize = (str) => new Blob([str]).size;
      const result = byteSize(canvas.toDataURL("image/jpeg", 0.8)); // output: 11

      console.log(canvas.toDataURL("image/jpeg", 0.8), result);
    };
    img.src = URL.createObjectURL(e.target.files[0]);
  };

  return (
    <>
      <canvas ref={canvasRef} {...props} style={{display:"none"}}/>
      <input type="file" onChange={handleFile} />
    </>
  );
};

export default Canvas;
