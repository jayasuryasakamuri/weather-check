import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const WeatherCards = ({ weatherData, temperatureUnit }) => {
    const [index, setIndex] = useState(1);
    const [maxIndex, setMaxIndex] = useState('');
    const width = useWindowWidth();

    useEffect(() => {
        //show 3 cards on large devices
        if (width > 767) {
            setMaxIndex(Math.ceil(weatherData.length / 3));
            //onresize of browser window handle cards
            setIndex(1);
        } else {
            //show one card on mobile devices
            setMaxIndex(weatherData.length);
        }
    }, [width, weatherData.length]);

    const previous = () => {
        if (index > 1) {
            setIndex(index => index - 1);
        }
    };

    const next = () => {
        if (index === maxIndex) {
            return;
        }
        setIndex(index => index + 1);
    };

    return (
        <div className='weather-cards-container'>
            <div className="button-group">
                <Button variant="contained" disabled={index === 1} color="primary" onClick={previous} children="Previous" />
                <Button variant="contained" disabled={index === maxIndex} color="primary" onClick={next} children="Next" />
            </div>
            <Carousel index={index}>
                {
                    weatherData.map(function ({ temp, dt_txt }, index) {
                        return (
                            <Card className="child" key={index}>
                                <CardContent>
                                    <div className="title">Temp :</div>
                                    <div>{temp}{temperatureUnit}</div>
                                </CardContent>
                                <CardContent>
                                    <div className="title">Date :</div>
                                    <div>{dt_txt.split(' ')[0]}</div>
                                </CardContent>
                                <CardContent>
                                    <div className="title">Time :</div>
                                    <div>{dt_txt.split(' ')[1]}</div>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </Carousel>
        </div>
    );
};


const Carousel = (props) => {
    const length = props.length || props.children.length;

    return (
        <div className="weather-cards">
            <div className="inner" style={{ transform: `translateX(${(props.index - 1 % length) * -100}%)` }}>
                {props.children}
            </div>
        </div>
    );
};

function useWindowWidth() {
    //used to handle resize of window
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return width;
}

export default WeatherCards;