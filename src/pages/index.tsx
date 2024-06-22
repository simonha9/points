import PointItem from "@/components/PointItem";
import { useState, useEffect, MouseEventHandler } from "react";


export default function Home(props: any) {

  const [data, setData] = useState({ points: 0 });

  const handleDataChange = (delta: number) => {
    updatePoints(delta);
  }

  const updatePoints = async (delta: number) => {
    const total = data.points + delta;
    await fetch("/api/points", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ total }),
    });
    setData({ points: total });
  }

  const addButtonHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const targetElement = event.target as HTMLButtonElement;
    updatePoints(1);
  }

  const subtractButtonHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const targetElement = event.target as HTMLButtonElement;
    updatePoints(-1);
  }


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/points");
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      try {
        const result: number = await response.json();
        setData({ points: result });
      } catch (error) {
        console.error("Error parsing response: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Points: {data.points}</h1>
      <h3>Points System: </h3>
      <br />
      <h4>Add points</h4>
      <div className="flex bg-gray-100">
        <div className="flex-1 grid grid-cols-3 gap-4 p-4">

          <PointItem name="Coding 10min" text="Coding 10min" add={true} points={1} onDataChange={handleDataChange} />
          <PointItem name="Reading Coding blog" text="Reading Coding blog" add={true} points={2} onDataChange={handleDataChange} />
          <PointItem name="Researching" text="Researching" add={true} points={2} onDataChange={handleDataChange} />
          <PointItem name="Bjj" text="Bjj" add={true} points={1} onDataChange={handleDataChange} />
          <PointItem name="Making a list" text="Making a list" add={true} points={2} onDataChange={handleDataChange} />
          <PointItem name="Errands" text="Errands" add={true} points={3} onDataChange={handleDataChange} />
          <PointItem name="Brainstorming" text="Brainstorming" add={true} points={2} onDataChange={handleDataChange} />
          <PointItem name="Stretching" text="Stretching" add={true} points={1} onDataChange={handleDataChange} />
        </div>
      </div>
      <br />
      <h4>Subtract points</h4>
      <div className="flex bg-gray-100">
        <div className="flex-1 grid grid-cols-3 gap-4 p-4">
          <PointItem name="Game" text="Game" add={false} points={5} onDataChange={handleDataChange} />
          <PointItem name="Watching Youtube" text="Watching Youtube" add={false} points={2} onDataChange={handleDataChange} />
          <PointItem name="Social Media" text="Social Media" add={false} points={1} onDataChange={handleDataChange} />
        </div>
      </div>
    </div>
  );
}
