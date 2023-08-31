import styles from './LineChart.module.scss';
import { FC } from 'react'
import { faker } from '@faker-js/faker';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartType,
  ChartComponent,
} from 'chart.js';
import { TypedChartComponent } from 'react-chartjs-2/dist/types';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

interface I {
  title?: string,
  options?:any,
  data?:any
}

const LineChart:FC<I> = ({
  title = 'Title'
}) => {
  return (
    <div className={styles.wrapper}>
      <Line
          className={styles.chart}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: title,
                color: '#fff',
                font: {
                  size: 20,
                },
              },
            },
          }}
          data={{
            labels,
            datasets: [
              {
                fill: true,
                label: 'Dataset 2',
                data: labels.map(() => faker.number.int({min: 400, max: 700})),
                borderColor: 'rgb(255,202,66)',
                backgroundColor: 'rgba(255,202,66, .5)',
                showLine: true,
                tension: 0.4,
              },
              {
                fill: true,
                label: 'Dataset 1',
                data: labels.map(() => faker.number.int({min: 500, max: 1000})),
                borderColor: 'rgb(85, 222, 169)',
                backgroundColor: 'rgba(85, 222, 169, .5)',
                tension: 0.4
              },
            ]
          }}
          />
    </div>
  )
}

export default LineChart;