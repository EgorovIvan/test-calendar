import React from "react";
import styled from 'styled-components';


const Wrapper = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 150px;
    padding: 0 8.1%;
    box-sizing: border-box;
    background-color: #ffffff;
`;

const Title = styled.div`
    width: 320px;
    font-family: 'Ropa Sans', sans-serif;
    font-weight: 300;
    font-size: 38px;
    line-height: 46px;
    text-transform: capitalize;
`;

const Button = styled.button`
    width: 44px;
    height: 44px;
    border: none;
    color: inherit;
    background-color: transparent;
    text-transform: capitalize;
    cursor: pointer;
`;

const Header = ({handleOpen}) => {
    return (
        <Wrapper>
            <Title>
                interview calendar
            </Title>
            <Button onClick={handleOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <polygon fill="#ff3131"
                             points="440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240"
                    />
                </svg>
            </Button>
        </Wrapper>
    )
}

export default Header;