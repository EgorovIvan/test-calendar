import React, {useState} from "react";
import styled from "styled-components";

const Wrapper = styled.section`
    position: relative;
    display: inline-flex;
    width: 100%;
    height: 900px;
    padding: 0px 0 0px 10px;
    margin: 0;
    box-sizing: border-box;
    background-color: #ffffff;
    overflow: scroll;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    } 
`;

const TimeList = styled.div`
    display: grid;
    align-items: center;
    justify-content: center;
    text-align: center;
    grid-template-rows: repeat(24, 80px);
    grid-template-columns: 80px;
    gap: 1px;
    width: 80px;
    background-color: #ffffff;
`;

const TimeItem = styled.div`
    font-family: 'Ropa Sans', sans-serif;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #c0c0c0;
    box-sizing: border-box;
`;

const TaskList = styled.div`
    display: grid;
    align-items: center;
    justify-content: center;
    text-align: center;
    grid-template-rows: repeat(24, 80px);
    grid-template-columns: repeat(7, 14.2%);
    gap: 1px;
    width: 100%;
    height: 1942px;
    margin: 38px 0 0 0;
    background-color: #e6e6e6;
    border-top: 2px solid #e6e6e6;
`;

const TaskItem = styled.div`
    width: 98%;
    height: 78px;
    padding: 4px;
    font-family: 'Ropa Sans', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    background-color: #ffffff; 
    box-sizing: border-box;
    border: 3px solid #ffffff;
`;

const Main = ({activeTaskId,
                  setActiveTaskId,
                  activeDate,
                  tasksFromDB,
                  setActiveHours,
                  setActiveNumberTask}) => {

    const numberHours = 24;
    let timestamps = [];
    const [prevBackgroundColor, setPrevBackgroundColor] = useState("#ffffff");

    // отображение временных отметок
    function time() {
        try {
            for (let i = 0; i < numberHours; i++) {
                timestamps.push(i);
            }
            return timestamps &&
                timestamps.map((time, i) =>
                    <TimeItem key={"time" + i}
                              id={"time" + (time < 10 ? 0 : "") + time.toString()}>
                        {time < 10 ? 0 : ""}
                        {time}:00
                    </TimeItem>
                )
        } catch (error) {
            console.log(error);
        }
    }

    // выделение задачи
    function selectTask(id) {
        let prevTask = document.getElementById(`${activeTaskId}`);
        let task = document.getElementById(`${id}`);
        let color = window.getComputedStyle(task).backgroundColor
        setPrevBackgroundColor(color)
        if (!!activeTaskId) {
            prevTask.style.backgroundColor = prevBackgroundColor;
        }
        task.style.backgroundColor = "#b3b7ff";
        setActiveTaskId(id);
        setActiveHours(+task.getAttribute('data-row'));
        setActiveNumberTask(+task.getAttribute('data-col'))
    }

    // отображение задач
    function tasks() {
        try {
            let tasks = [];
            let taskTime = activeDate.getTime()
            for (let i = 0; i < 24; i++) {
                let timeArray = [];
                for (let j = 0; j < 7; j++) {
                    timeArray.push(taskTime);
                }
                tasks.push(timeArray);
                taskTime = taskTime + 3600000;
            }

            return tasks &&
                tasks.map((row, i) =>
                    row.map((task, j) => {
                            // поиск задачи в базе данных и ее вывод
                            let find = tasksFromDB.find(item => item.id === task && item.numberTask === j)
                            if (find) {
                                return <TaskItem onClick={() => selectTask("task_" + i + "_" + j)}
                                                 style={{backgroundColor: "#ebecff"}}
                                                 key={"task_" + i + "_" + j}
                                                 id={"task_" + i + "_" + j}
                                                 data-row={i}
                                                 data-col={j}
                                ></TaskItem>
                            } else {
                                return <TaskItem onClick={() => selectTask("task_" + i + "_" + j)}
                                                 key={"task_" + i + "_" + j}
                                                 id={"task_" + i + "_" + j}
                                                 data-row={i}
                                                 data-col={j}
                                ></TaskItem>
                            }
                        }
                    )
                )
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Wrapper>
            <TimeList>
                {time()}
            </TimeList>
            <TaskList>
                {tasks()}
            </TaskList>
        </Wrapper>
    )
}

export default Main;