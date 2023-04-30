import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 95px;
    padding: 0 56px;
    background-color: #f6f6f6;
    border-top: 3px solid #ebebeb;
    box-sizing: border-box;
`;

const Title = styled.div`
    font-family: 'Ropa Sans', sans-serif;
    font-weight: 300;
    font-size: 32px;
    line-height: 40px;
    color: #ff3131; 
    
    &::first-letter {
        text-transform: uppercase;
    }
`;

const Button = styled.button`
    width: 90px;
    height: 40px;
    padding: 0;
    font-family: 'Ropa Sans', sans-serif;
    font-weight: 300;
    font-size: 32px;
    line-height: 40px;
    color: #ff3131; 
    border: none;
    background-color: transparent;
    cursor: pointer;
    
    &::first-letter {
        text-transform: uppercase;
    }
`;


const Footer = ({activeTaskId}) => {
    return (
        <Wrapper>
            <Title>
                today
            </Title>
            {activeTaskId === undefined ? "" : <Button>delete</Button>}

        </Wrapper>
    )
}

export default Footer;
