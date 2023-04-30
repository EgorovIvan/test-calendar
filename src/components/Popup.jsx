import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, 0.4);
    z-index: 15;
    box-sizing: border-box;
`;

const Modal = styled.div`
    position: fixed;
    gap: 1px;
    width: 625px;
    height: 415px;
    left: 50%;
    top: 450px;
    transform: translate(-50%, -50%);
    border-radius: 40px;
    background-color: #e6e6e7;
    opacity: 1;
    overflow: hidden;
    z-index: 120;
`;

const TaskData = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    // height: 312px;
`;

const Title = styled.div`
    padding: 47px 0 8px 0;
    font-family: 'Ropa Sans', sans-serif;
    font-weight: 600;
    font-size: 39px;
    line-height: 44px;
`;

const Text = styled.div`
    padding: 5px 0 5px 0;
    font-family: 'Ropa Sans', sans-serif;
    font-weight: 500;
    font-size: 30px;
    line-height: 34px;
    
    &::first-letter {
        text-transform: uppercase;
    }
`;

const Input = styled.input`
    width: 550px;
    height: 58px;
    margin: 45px 0 27px 0;
    box-sizing: border-box;
    border: 2px solid #8e8e93;
    font-family: 'Ropa Sans', sans-serif;
    font-weight: 500;
    font-size: 30px;
    line-height: 34px;
    color: #007aff; 
`;

const ButtonList = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Button = styled.button`
    width: 312px;
    height: 100px;
    padding: 0;
    font-family: 'Ropa Sans', sans-serif;
    font-weight: 300;
    font-size: 32px;
    line-height: 40px;
    color: #007aff; 
    border-top: 2px solid #69697d;
    border-bottom: none;
    border-right: none;
    border-left: none;
    background-color: inherit;
    cursor: pointer;
    
    &::first-letter {
        text-transform: uppercase;
    }
`;

const Popup = ({handleClose, 
                   postTask, 
                   activeDate, 
                   activeHours,
                   tasksFromDB,
                   activeNumberTask}) => {
    // вывод текста в popup если задача существует
    function taskText() {
        let findText = tasksFromDB.find(item =>
            item.id === (activeDate.getTime() +
            activeHours * 60 * 60 * 1000) &&
            item.numberTask === activeNumberTask)
        return  !!findText ? findText.text : "https://calendar.com";
    }

        return (
        <Wrapper>
            <Modal>
                <TaskData>
                    <Title>
                        {taskText()}
                    </Title>
                    <Text>enter event time:</Text>
                    <Text>
                        {activeDate.getFullYear() + "-" +
                        (activeDate.getMonth() < 9 ?
                            "0" + (activeDate.getMonth() + 1) :
                            (activeDate.getMonth() + 1)) + "-" +
                        (activeDate.getDate() < 10 ?
                            "0" + activeDate.getDate() :
                            activeDate.getDate()) + " " +
                        (activeHours < 10 ? "0" + activeHours :
                            activeHours) + ":00:00"}
                    </Text>
                    <Input></Input>
                </TaskData>
                <ButtonList>
                    <Button onClick={handleClose}>
                        cancel
                    </Button>
                    <span style={{width: "1.5px", height: "100px", backgroundColor: "#69697d"}}></span>
                    <Button onClick={postTask}>
                        OK
                    </Button>
                </ButtonList>

            </Modal>

        </Wrapper>
    )
}

export default Popup;
