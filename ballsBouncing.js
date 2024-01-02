import React, { useState, useEffect, useRef } from 'react';

const Ball = ({ x, y, dx, dy, radius, color }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    };

    const update = () => {
      if (x + dx > width - radius || x + dx < radius) {
        dx = -dx;
      }
      if (y + dy > height - radius || y + dy < radius) {
        dy = -dy;
      }
      x += dx;
      y += dy;
    };

    const animate = () => {
      update();
      draw();
      requestAnimationFrame(animate);
    };

    animate();
  }, [x, y, dx, dy, radius, color]);

  return <canvas ref={canvasRef} />;
};

const App = () => {
  const [balls, setBalls] = useState([]);

  useEffect(() => {
    const numBalls = 5;
    const newBalls = [];
    for (let i = 0; i < numBalls; i++) {
      const ball = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        dx: Math.random() * 10 - 5,
        dy: Math.random() * 10 - 5,
        radius: 20,
        color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
      };
      newBalls.push(ball);
    }
    setBalls(newBalls);
  }, []);

  return (
    <div>
      {balls.map((ball, index) => (
        <Ball key={index} {...ball} />
      ))}
    </div>
  );
};

export default App;
