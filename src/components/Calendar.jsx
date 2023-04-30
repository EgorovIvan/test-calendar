import React, {useEffect, useMemo, useState} from "react";
import styled from "styled-components";

const Wrapper = styled.section`
    width: 100%;
    height: 160px;
    padding: 9px 0 9px 12.1%;
    background-color: #f6f6f6;
    box-sizing: border-box;
    border-top: 3px solid #ebebeb;
    border-bottom: 3px solid #ebebeb;
`;

const ListNames = styled.div`
    width: 100%;
    margin-left: 4px;
    font-family: 'Ropa Sans', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-transform: uppercase;
`;

const DayNames = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 14.1%;
    height: 34px;
    
`;

const ListWeeks = styled.div`
    position: relative;
    display: inline-flex;
    width: 100%;
    height: 58px;
    font-family: 'Ropa Sans', sans-serif;
    font-weight: 500;
    font-size: 32px;
    line-height: 36px;
    overflow: hidden;
`;

const WeekItem = styled.div`
    position: absolute;
    display: grid;
    align-items: center;
    justify-content: center;
    text-align: center;
    grid-template-rows: 58px;
    grid-template-columns: repeat(7, 14.1%);
    width: 100%;
    height: 58px;
`;

const DayNumber = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 58px;
    height: 58px;
    margin: 0 auto;
    border-radius: 28px;
`;

const Navigation = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    width: 100%;
    height: 52px;
    padding: 0 28px 0 22px;
    box-sizing: border-box;
    font-family: 'Ropa Sans', sans-serif;
    font-weight: 500;
    font-size: 28px;
    line-height: 32px;
`;

const Button = styled.button`
    padding: 0;
    border: none;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
`;

const Calendar = ({getTask,
                      activeDate,
                      setActiveDate,
                      converting,
                      countOfMillisecondsInDay}) => {

    // массив месяцев
    const Months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']

    // количество дней в неделе
    const countDay = 7;

    // количество дней в массиве (предыдущая неделя, настоящая неделя и следуюущая неделя)
    const countDayToArray = 21;
    let today = new Date();
    const [dayId, setDayId] = useState(countDay + (
        today.getDay() === 0 ? 6 : today.getDay() - 1));
    // предыдущий выделенный день
    const [prevDayId, setPrevDayId] = useState(0);
    const [dayData, setDayData] = useState([]);
    // позиции недель
    const [posOne, setPosOne] = useState(-650);
    const [posTwo, setPosTwo] = useState(0);
    const [posThree, setPosThree] = useState(650);
    // флаг для блокировки навигации
    const [flag, setFlag] = useState(true);

    // выделение выбранной даты
    function selectedDay(id) {
        let prevDay = document.getElementById(`${prevDayId}`);
        let day = document.getElementById(`${id}`);
        if (day && prevDay) {
            prevDay.style.backgroundColor = "#f6f6f6";
            prevDay.style.color = "#030303";
            day.style.backgroundColor = "#ff3131";
            day.style.color = "#ffffff";
            let date = new Date(dayData[id].getFullYear(),
                dayData[id].getMonth(), dayData[id].getDate());
            setActiveDate(date);
            setPrevDayId(id);
            getTask();
        }
    }

    // заполнения массива дат
    function fill(n, m) {
        //расчет дня недели
        let dayOfWeek = converting(activeDate).getDay() === 0 ? 6 :
            converting(activeDate).getDay() - 1;
        for (let i = n; i < n + countDay; i++) {
            if (dayData[i] === undefined) {
                setDayData(arr =>
                    [...arr, converting(activeDate - (dayOfWeek - i + 7) * countOfMillisecondsInDay)]);
            } else {
                setDayData(items =>
                    items.map((item, index) =>
                        index === i ?
                            converting(activeDate - (dayOfWeek) * countOfMillisecondsInDay +
                                (i + m) * countOfMillisecondsInDay) :
                            item
                    )
                );
            }
        }
    }

    // отображение недели
    function week(n) {
        try {
            return dayData &&
                dayData.slice(n, n + countDay).map((date, i) =>
                    <DayNumber onClick={() => selectedDay(i + n)} key={i + n} id={i + n}>
                        {converting(date).getDate()}
                    </DayNumber>
                )
        } catch (error) {
            console.log(error);
        }
    }

    // анимация(перемещения на предыдущую неделю)
    function prev() {
        setFlag(false);
        let elem_1 = document.querySelector("#week_1");
        let elem_2 = document.querySelector("#week_2");
        let elem_3 = document.querySelector("#week_3");
        let IntervalId = setInterval(frame, 10);
        let pos = 0;
        let one = posOne;
        let two = posTwo;
        let three = posThree;

        function frame() {
            if (pos === 650) {
                setPosOne(posOne + 650);
                setPosTwo(posTwo + 650);
                setPosThree(posThree + 650);
                // выделение дня при переходе на другую страницу
                if ((dayId - countDay) < 0) {
                    setDayId(countDayToArray + dayId - countDay);
                } else {
                    setDayId(dayId - countDay);
                }

                clearInterval(IntervalId);
                if (one === 1300) {
                    setPosOne(-650);
                    elem_1.style.left = posOne + 'px';
                    fill(0, (-countDay) * 2);
                    setFlag(true);
                }
                if (two === 1300) {
                    setPosTwo(-650);
                    elem_2.style.left = posTwo + 'px';
                    fill(countDay, (-countDay) * 3);
                    setFlag(true);
                }
                if (three === 1300) {
                    setPosThree(-650);
                    elem_3.style.left = posThree + 'px';
                    fill(countDay * 2, (-countDay) * 4);
                    setFlag(true);
                }
            } else {
                pos += 2;
                one += 2;
                two += 2;
                three += 2;

                elem_1.style.left = one + 'px';
                elem_2.style.left = two + 'px';
                elem_3.style.left = three + 'px';
            }
        }
    }

    function handlePrev(){
        return !!flag ? prev() : '';
    }

    // анимация(перемещения на следующую неделю)
    function next() {
        setFlag(false);
        let elem_1 = document.querySelector("#week_1");
        let elem_2 = document.querySelector("#week_2");
        let elem_3 = document.querySelector("#week_3");
        let IntervalId = setInterval(frame, 10);
        let pos = 0;
        let one = posOne;
        let two = posTwo;
        let three = posThree;

        function frame() {
            if (pos === -650) {
                setPosOne(posOne - 650);
                setPosTwo(posTwo - 650);
                setPosThree(posThree - 650);
                // выделение дня при переходе на другую страницу
                if ((dayId + countDay) > 20) {
                    setDayId(dayId + countDay - countDayToArray);
                } else {
                    setDayId(dayId + countDay);
                }

                clearInterval(IntervalId);
                if (one === -1300) {
                    setPosOne(650);
                    elem_1.style.left = posOne + 'px';
                    fill(0, 14);
                    setFlag(true);
                }
                if (two === -1300) {
                    setPosTwo(650);
                    elem_2.style.left = posTwo + 'px';
                    fill(countDay, 7);
                    setFlag(true);
                }
                if (three === -1300) {
                    setPosThree(650);
                    elem_3.style.left = posThree + 'px';
                    fill(countDay * 2, 0);
                    setFlag(true);
                }
            } else {
                pos -= 2;
                one -= 2
                two -= 2
                three -= 2

                elem_1.style.left = one + 'px';
                elem_2.style.left = two + 'px';
                elem_3.style.left = three + 'px';
            }
        }
    }

    function handleNext(){
        return !!flag ? next() : '';
    }

    useMemo(() => {
        fill(0, 0);
        fill(countDay, 0);
        fill(countDay * 2, 0);
    }, [])

    useEffect(() => {
        selectedDay(dayId);
    }, [dayId])

    return (
        <Wrapper>
            <ListNames>
                <DayNames>m</DayNames>
                <DayNames>t</DayNames>
                <DayNames>w</DayNames>
                <DayNames>t</DayNames>
                <DayNames>f</DayNames>
                <DayNames>s</DayNames>
                <DayNames>s</DayNames>
            </ListNames>
            <ListWeeks>
                <WeekItem id="week_1" style={{left: "-650px"}}>
                    {week(0)}
                </WeekItem>
                <WeekItem id="week_2" style={{left: "0px"}}>
                    {week(countDay)}
                </WeekItem>
                <WeekItem id="week_3" style={{left: "650px"}}>
                    {week(countDay * 2)}
                </WeekItem>
            </ListWeeks>
            <Navigation>
                <Button onClick={handlePrev} id="prev">
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="#ff3131">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                </Button>
                {Months[converting(activeDate).getMonth()] + ' ' + converting(activeDate).getFullYear()}
                <Button onClick={handleNext} id="next">
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="#ff3131">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                </Button>
            </Navigation>
        </Wrapper>
    )
}

export default Calendar;