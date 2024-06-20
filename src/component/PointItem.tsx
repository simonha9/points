import React from 'react'

export interface PointItemProps {
    name: string;
    text: string;
    add: boolean;
    points: number;
    onDataChange: (data: number) => void;
}



const PointItem: React.FC<PointItemProps> = ({ name, text, add, points, onDataChange }) => {

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const targetElement = event.target as HTMLButtonElement;
        const re = /(?<=:.[-+])\d+/gm;
        const points = targetElement.textContent?.match(re) || 0;
        const modifier = add ? 1 : -1;
        console.log("points modifier", points, modifier, targetElement.textContent?.match(re))
        const delta = modifier * +points;
        console.log("points modifier delta", points, modifier, delta);
        await fetch("/api/points", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ delta }),
        });
        onDataChange(delta);
    }


    return (
        <div>
            <button onClick={handleClick} >
                <b>{name}</b>: {add ? '+' : '-'}{points}
            </button>
        </div>
    )
}

export default PointItem