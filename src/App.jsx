import React, {useState} from "react";
import './App.css';
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Popup from "./components/Popup";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    display: block;
    margin: 0 auto;
    max-width: 740px;
    height: 1314px;
    -webkit-box-shadow: 8px 8px 4px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 8px 8px 4px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 8px 8px 4px 0px rgba(34, 60, 80, 0.2);
`;

function App() {

    const [viewModal, setViewModal] = useState(false);
    const [activeTaskId, setActiveTaskId] = useState(undefined);
    const [tasksFromDB, setTasksFromDB] = useState([]);
    let today = new Date();
    // выбранный день
    const [activeDate, setActiveDate] = useState(today);
    // выбранный час
    const [activeHours, setActiveHours] = useState(today.getHours());
    const [activeNumberTask, setActiveNumberTask] = useState(0);
    // количество милисекунд в одном дне
    const countOfMillisecondsInDay = 24 * 60 * 60 * 1000;
    // возвращение милисекунд из строки
    const converting = (time) => {
        let date = new Date(time);
        return date;
    }

    // открытие модального окна
    function handleOpen() {
        return !!activeTaskId ? setViewModal(true) : null;
    }

    // закрытие модального окна
    function handleClose() {
        setViewModal(false);
    }

    // запрос данных по задачам активного дня (ругается на CORS - необходимо отключать)
    function getTask() {
        // url для работы с json-server
        let url = 'http://localhost:3000/task/?id>' + (activeDate.getTime() - 1) +
            '&id<' + (activeDate.getTime() + countOfMillisecondsInDay)
        fetch('testapi/task.json')
            .then((response) => response.json())
            .then((json) => {
                setTasksFromDB(json);
            })
            .catch(() =>
                console.log('Что-то пошло не так c получением контактов')
            );
    }

    // запись новой задачи в БД (шаблон)
    function postTask() {
        fetch('http://localhost:3000/task', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: {
                "id": 1682730000000,
                "numberTask": 5,
                "time": 1,
                "text": "example3"
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                handleClose();
            })
            .catch(() =>
                console.log('Что-то пошло не так c получением контактов')
            );
    }

    return (
        <Container>
            {viewModal ? <Popup handleClose={handleClose}
                                postTask={postTask}
                                activeDate={activeDate}
                                activeHours={activeHours}
                                tasksFromDB={tasksFromDB}
                                activeNumberTask={activeNumberTask}/> : ''}
            <Header handleOpen={handleOpen}/>
            <Calendar getTask={getTask}
                      activeDate={activeDate}
                      setActiveDate={setActiveDate}
                      converting={converting}
                      countOfMillisecondsInDay={countOfMillisecondsInDay}/>
            <Main activeTaskId={activeTaskId}
                  setActiveTaskId={setActiveTaskId}
                  activeDate={activeDate}
                  tasksFromDB={tasksFromDB}
                  setActiveHours={setActiveHours}
                  setActiveNumberTask={setActiveNumberTask}/>
            <Footer activeTaskId={activeTaskId}/>

        </Container>
    );
}

export default React.memo(App);
