import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import Chart from 'chart.js/auto';
import styles from './Charts.module.scss';

const Charts = ({ complete, notComplete }) => {
  const canvasRefPie = useRef(null);
  const canvasRefBar = useRef(null);

  const intl = useIntl();

  useEffect(() => {
    const canvas = canvasRefPie.current;
    const myChart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: [
          intl.formatMessage({ id: 'completed' }),
          intl.formatMessage({ id: 'not_completed' }),
        ],
        datasets: [
          {
            label: intl.formatMessage({ id: 'chart_title' }),
            data: [complete, notComplete],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
          },
        ],
      },
    });

    return () => myChart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete, notComplete]);

  useEffect(() => {
    const canvas = canvasRefBar.current;
    const myChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: [
          intl.formatMessage({ id: 'completed' }),
          intl.formatMessage({ id: 'not_completed' }),
        ],
        datasets: [
          {
            label: intl.formatMessage({ id: 'chart_title' }),
            data: [complete, notComplete],
            backgroundColor: [
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: ['rgb(255, 205, 86)', 'rgb(75, 192, 192)'],
            borderWidth: 1,
          },
        ],
      },
    });

    return () => myChart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete, notComplete]);

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.chart}>
        <canvas id="pie-chart" ref={canvasRefPie} />
      </div>

      <div className={styles.chart}>
        <canvas id="bar-chart" ref={canvasRefBar} />
      </div>
    </div>
  );
};

Charts.propTypes = {
  complete: PropTypes.number.isRequired,
  notComplete: PropTypes.number.isRequired,
};

export default Charts;
