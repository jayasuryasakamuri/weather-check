import React from 'react';
import Radio from '@material-ui/core/Radio';

function TemperatureUnits({ temperatureUnit, setTemperatureUnit }) {

    function handleChange(unit) {
        //pass the selected temperature unit to parent
        setTemperatureUnit(unit);
    }

    return (
        <div className="radio-group">
            <label htmlFor="Celsius">
                <Radio
                    id="Celsius"
                    checked={temperatureUnit === 'C'}
                    value="C"
                    onChange={e => handleChange(e.target.value)}
                    name="temperature-unit"
                    aria-label="Celsius"
                />
                Celsius
            </label>
            <label htmlFor="Fahrenheit">
                <Radio
                    id="Fahrenheit"
                    checked={temperatureUnit === 'F'}
                    value='F'
                    onChange={e => handleChange(e.target.value)}
                    name="temperature-unit"
                    aria-label="Fahrenheit"
                />
                Fahrenheit
            </label>
        </div>
    );
}


export default TemperatureUnits;