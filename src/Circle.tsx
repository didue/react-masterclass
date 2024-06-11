import { useState } from "react";
import styled from "styled-components"

interface ContainerProps {
    bgColor: string;
    borderColor: string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${props => props.bgColor};
    border-radius: 100px;
    border: 1px solid ${props => props.borderColor};
    display: flex;
    justify-content: center;
    align-items: center;
`

interface CircleProps {
    bgColor: string;
    borderColor?: string;
}
 
function Circle({bgColor, borderColor}: CircleProps) {

    const [counter, setCounter] = useState(1);

    return (
        <Container bgColor={bgColor} borderColor={borderColor ?? "white"}>
        </Container>
    )
}

export default Circle


interface playerShape {
    name: string;
    age: number;
}

const sayHello = (playerObj: playerShape) => `Hello, ${playerObj.name}. You are ${playerObj.age} old.`;

sayHello({name: "didue", age: 31});
