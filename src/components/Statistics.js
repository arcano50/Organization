import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

import './Statistics.css'

export const Pie = ({data}) =>
  <div className='pie-statistics'>
    <div className='chart-titles'>
      <div>
        <svg width="15" height="15" className='center'>
          <rect width="15" height="15" className='color-blue'/>
        </svg>
        <label className='label-margin'>
          Agradecimientos
        </label>
        <label className='label-margin right'>
          {`(${data[0].value})`}
        </label>
      </div>
      <div>
        <svg width="15" height="15" className='center'>
          <rect width="15" height="15" className='color-green'/>
        </svg>
        <label className='label-margin'>
          Ofrecimiento
        </label>
        <label className='label-margin right'>
          {`(${data[1].value})`}
        </label>
      </div>
      <div>
        <svg width="15" height="15" className='center'>
          <rect width="15" height="15" className='color-red'/>
        </svg>
        <label className='label-margin'>
          Solicitudes
        </label>
        <label className='label-margin  right'>
          {`(${data[2].value})`}
        </label>
      </div>
    </div>
    <div className='pie-container'>
      <PieChart
        data={data}
        lineWidth='30'
        paddingAngle='2'
        label={({ dataEntry }) =>
          `${Math.round((dataEntry.percentage + Number.EPSILON)*10)/10}%`}
        labelPosition={85}
        labelStyle={{
          fontSize:'6px',
          fontFamily: 'sans-serif',
        }}
      />
    </div>
  </div>