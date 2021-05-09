import React, {useState,  useEffect, useRef } from 'react';

//Chart related
import Chartjs from 'chart.js/auto';

//custom hook
import useApiCall from '../../../hooks/useApiCall';

//styling related
import { useStyletron } from "styletron-react";
import {ProgressBarRounded} from 'baseui/progress-bar';


const chartConfig = {
    type: 'doughnut',
    data: {
        labels: [
          'Successul ',
          'Failed ',
        ],
        datasets: []
      },
      options: {
        plugins: {
            title: {
                display: true,
                color: "rgba(24, 120, 217)",
                text: 'Launch Success rate',
                font: {weight: 'bold'},
                fullSize: true,
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
      }
};

interface ChartItems {
  theme: any
}
const Chart:React.FC<ChartItems> = ({theme}) => {
    const [css] = useStyletron();
    const chartContainer = useRef<HTMLCanvasElement>(null);
    const [successCount, setSuccessCount] = useState(0);
    let { status, data, isFetching, isPreviousData, refetch} = useApiCall('https://api.spacexdata.com/v4','/launches/past', '','GET','chart');
    let successNos = 0, newChartConfig ;
    let myChart = new Chartjs() ;
    useEffect(() => {
        if (chartContainer && chartContainer.current && data ) {
            //console.log("data in charts", data.filter((item: any) => {return item.success===true}).length)
        
            const canvas = chartContainer.current
            const ctx = canvas.getContext('2d');
        //console.log("The chart context is", ctx); 
            successNos = data.filter((item: any) => {return item.success===true}).length;
            setSuccessCount(successNos/data.length);
            newChartConfig = JSON.parse(JSON.stringify(chartConfig));
            newChartConfig.data.datasets = [{
            label: 'Launch status',
            data: [successNos, data.length - successNos],
            backgroundColor: [
              "rgb(79, 240, 79, 0.8)",
              'rgba(247, 98, 82, 0.8)',
            ],
            borderColor: ["rgb(207, 255, 207)", "rgba(240, 84, 84)"],
            hoverBackgroundColor: ["rgba(163, 255, 163)", "rgba(255, 0, 0)" ],
            hoverOffset: 4
          }]
       myChart = new Chartjs(ctx, newChartConfig);
         
        }
    
    return () => {
        myChart.destroy();
    }
    }, [chartContainer, data]);

  return (
    
    <div className={css({padding: "0.2rem", display: "flex", flexDirection: "column",alignItems: "center", backgroundColor: theme?"rgba(215, 215, 215, 0.7)":"rgba(0, 0, 0, 0.5)"})}>
        {/* {console.log("data in charts", chartData)} */}
          <ProgressBarRounded progress={successCount} />
       <div>
          <canvas ref={chartContainer} width="250" height="280">
      </canvas>
       </div>
      
    </div>
  );
};

export default Chart;