import { useEffect, useState } from "react";
import "./board.css";
import { clear } from "console";

interface BoardProps {
    columns: number,
    rows: number,
}

interface Piece {
    shape: boolean[][],
    x: number,
    y: number,
}

export default function Board({ columns, rows }: BoardProps) {
    const [board, setBoard] = useState<boolean[][]>(
        Array.from({ length: rows }, () => Array(columns).fill(false))
    );

    const [piece, setBoardPiece] = useState<Piece>({
        shape: [[true, true], [true], [true]],
        x: 0,
        y: 0
    });

    const clearBoard = (board:boolean[][]) => {
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                board[i][j] = false;
            }
        }
    }

    const setPosition = (piece:Piece, x:number,y:number) => {
        let newBoard = [...board];
        clearBoard(newBoard);
        for(let i = 0; i < piece.shape.length; i++) {
            for(let j = 0; j < piece.shape[i].length; j++) {
                const boardX = x + i;
                const boardY = y + j;

                if(boardX >= 0 && boardX < newBoard[0].length && boardY >= 0 && boardY < newBoard.length) {
                    newBoard[boardY][boardX] = piece.shape[i][j];
                }
            }
        }
        setBoard(newBoard);
    }

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, piece: Piece) => {
        console.log("Dragging...")
        event.dataTransfer.setData("piece", JSON.stringify(piece));
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();      
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const boardX = event.currentTarget.className.split(' ')[1]      
        const boardY = event.currentTarget.className.split(' ')[2] 
        console.log("Setting at: ", boardX, boardY)
        setPosition(piece, parseInt(boardY), parseInt(boardX))
    }

    useEffect(() => {
        setPosition(piece, 0, 0);
    }, [piece]);

    return (
        <div className="board">
            {board.map((col, colIndex) => (
                <div key={colIndex} className="col">
                    {col.map((row, rowIndex) => (
                        <div
                            key={`${rowIndex} ${colIndex}`}
                            className={`cell ${colIndex} ${rowIndex} ${row ? 'filled' : ''}`}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            {piece.shape.map((_piece, index) => (
                                <div
                                    key={index}
                                    draggable
                                    onDragStart={(event) => handleDragStart(event, piece)}
                                    
                                    className={`pieceCell`}
                                    style={{
                                        width: '50px', // Set width and height or other styles to make the draggable piece visible
                                        height: '50px',
                                    
                                        /* Add other necessary styling */
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}