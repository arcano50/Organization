import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryPie } from 'victory';

import './Statistics.css'

export const Pie = ({data}) =>
  <div className='pie-container'>
    <VictoryPie
      padAngle={({ datum }) => datum.y}
      innerRadius={80}
      data={data}
    />
  </div>