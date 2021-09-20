import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Chart from 'chart.js/auto';
import { IconButton, Button } from '@material-ui/core';
import { Equalizer, PieChart } from '@material-ui/icons';

import { getCompleteTodos } from 'redux/todos/todos-selectors';
import { getForChart } from 'redux/todos/todos-operations';

import Modal from 'components/Modal';
import { translate } from 'i18n';

import styles from './ChartBtn.module.scss';

const ChartBtn = ({ todos }) => {
  const [showModalPie, setShowModalPie] = useState(false);
  const [showModalBar, setShowModalBar] = useState(false);
  const [openBtns, setOpenBtns] = useState(false);
  const canvasRef = useRef(null);
  const dispatch = useDispatch();

  const complete = useSelector(getCompleteTodos);
  const notComplete = todos - complete;

  const handleToggleOpenBtns = () => setOpenBtns(!openBtns);

  const handleToggleModal = type => {
    switch (type) {
      case 'pie':
        setShowModalPie(!showModalPie);
        break;
      case 'bar':
        setShowModalBar(!showModalBar);
        break;

      default:
        break;
    }
  };

  const handleClickBtn = async type => {
    await dispatch(getForChart(4, 0, true));
    handleToggleModal(type);
    handleToggleOpenBtns();
  };

  useEffect(() => {
    if (!showModalPie) return;

    const canvas = canvasRef.current;
    const myChart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Completed', 'Not completed'],
        // labels: [translate('completed'), translate('not_completed')],
        datasets: [
          {
            label: 'Completed and not completed todos',
            // label: translate('chart_title'),
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
  }, [showModalPie]);

  useEffect(() => {
    if (!showModalBar) return;

    const canvas = canvasRef.current;
    const myChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Completed', 'Not completed'],
        // labels: [translate('completed'), translate('not_completed')],
        datasets: [
          {
            label: 'Completed and not completed todos',
            // label: translate('chart_title'),
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
  }, [showModalBar]);

  return (
    <>
      {showModalPie && (
        <Modal onClose={() => handleToggleModal('pie')}>
          <div className={styles.chart}>
            <canvas ref={canvasRef} />
          </div>
        </Modal>
      )}

      {showModalBar && (
        <Modal onClose={() => handleToggleModal('bar')}>
          <div className={styles.chart}>
            <canvas ref={canvasRef} />
          </div>
        </Modal>
      )}

      <Button
        className={styles.chartBtn}
        type="button"
        variant="contained"
        color="primary"
        onClick={handleToggleOpenBtns}
      >
        {/* Charts */}
        {translate('charts')}
      </Button>
      {openBtns && (
        <div className={styles.btnsWrapper}>
          <IconButton
            aria-label="Open chart"
            type="button"
            onClick={() => handleClickBtn('pie')}
            title="Open chart"
            color="primary"
          >
            <PieChart />
          </IconButton>

          <IconButton
            aria-label="Open chart"
            type="button"
            onClick={() => handleClickBtn('bar')}
            title="Open chart"
            color="primary"
          >
            <Equalizer />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default ChartBtn;
