import React from 'react';

import './App.css';

const App = () => (
  <div className='app'>
    <div className="container">
      <h1>Covid Estimator</h1>
      <form>
        <div className="form-group">
          <label htmlFor="population">Population</label>
          <input
            required
            type="number"
            id="population"
            data-population
            placeholder='Enter total population'
            name='population'
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeToElapse">Time To Elapse </label>
          <input
            required
            type="number"
            id="timeToElapse"
            data-reported-cases
            placeholder='Enter time to elapse'
            name='timeToElapse'
          />
        </div>
        <div className="form-group">
          <label htmlFor="period-type">Time To Elapse </label>
          <select name="period-type" id="period-type" data-period-type='["", "days", "weeks", "months"]'>
            <option data-period-type value="days">Days</option>
            <option data-period-typevalue="weeks">Weeks</option>
            <option data-period-type value="months">Months</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="reported-cases">Time To Elapse </label>
          <input
            required
            type="number"
            id="reported-cases"
            data-time-to-elapse
            placeholder='Enter number of reported cases'
            name='reportedCases'
          />
        </div>
        <div className="form-group">
          <label htmlFor="total-hospital-bed">Total Hospital Beds</label>
          <input
            required
            type="number"
            id="total-hospital-bed"
            data-total-hospital-beds
            placeholder='Enter total number of beds'
            name='totalHospitalBed'
          />
        </div>
        <button
          type="submit"
          className='button'
          data-go-estimate
          htmlFor="data-go-estimate"
          name="data-go-estimate"
        >Get Estimate</button>
      </form>
    </div>
  </div>
);

export default App;