import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Chart from 'chart.js/auto';
import { IconButton } from '@material-ui/core';
import { Equalizer } from '@material-ui/icons';

import { getCompleteTodos } from 'redux/todos/todos-selectors';
import { getForChart } from 'redux/todos/todos-operations';

import Modal from 'components/Modal';

import styles from './ChartBtn.module.scss';

const ChartBtn = ({ todos }) => {
  const [showModal, setShowModal] = useState(false);
  const canvasRef = useRef(null);
  const dispatch = useDispatch();

  const complete = useSelector(getCompleteTodos);
  const notComplete = todos - complete;

  const handleToggleModal = () => setShowModal(!showModal);
  const handleClickBtn = async () => {
    await dispatch(getForChart(4, 0, true));
    handleToggleModal();
  };

  useEffect(() => {
    if (!showModal) return;

    const canvas = canvasRef.current;

    const myChart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Completed', 'Not completed'],
        datasets: [
          {
            label: 'Completed and not completed todos',
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
  }, [showModal]);

  return (
    <>
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <div className={styles.chart}>
            <canvas ref={canvasRef} />
          </div>
        </Modal>
      )}

      <IconButton
        className={styles.chartBtn}
        aria-label="Open chart"
        type="button"
        onClick={handleClickBtn}
        title="Open chart"
        color="primary"
      >
        <Equalizer />
      </IconButton>
    </>
  );
};

export default ChartBtn;
