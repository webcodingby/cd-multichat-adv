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

const labels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

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
        options={{
          responsive: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: title
            }
          }
        }}
        data={{
          labels,
          datasets: [
            {
              fill: true,
              label: 'Dataset 1',
              data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
              fill: true,
              label: 'Dataset 2',
              data: labels.map(() => faker.datatype.number({ min: 0, max: 700 })),
              borderColor: 'red',
              backgroundColor: 'rgba(red, 0.5)',
            }
          ]
        }}
        />
    </div>
  )
}

export default LineChart;