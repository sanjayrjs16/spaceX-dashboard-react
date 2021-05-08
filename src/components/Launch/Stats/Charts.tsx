import React, {useState,  useEffect, useRef } from 'react';

//Chart related
import Chartjs from 'chart.js/auto';

//custom hook
import useApiCall from '../../../hooks/useApiCall';

//styling related
import { useStyletron } from "styletron-react";


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
                text: 'Success rate',
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
  
    let { status, data, isFetching, isPreviousData, refetch} = useApiCall('https://api.spacexdata.com/v4','/launches/past', '','GET','chart');
    let successNos, newChartConfig ;
    let myChart = new Chartjs() ;
    useEffect(() => {
        if (chartContainer && chartContainer.current && data ) {
            console.log("data in charts", data.filter((item: any) => {return item.success===true}).length)
        
        const canvas = chartContainer.current
        const ctx = canvas.getContext('2d');
        console.log("The chart context is", ctx); 
            successNos = data.filter((item: any) => {return item.success===true}).length;
            newChartConfig = JSON.parse(JSON.stringify(chartConfig));
            newChartConfig.data.datasets = [{
            label: 'Launch status',
            data: [successNos, data.length - successNos],
            backgroundColor: [
              "rgb(8, 212, 29, 0.8)",
              'rgba(255, 0, 0, 0.8)',
            ],
            borderColor: ["rgb(3, 105, 18)", "rgba(102, 2, 32)"],
            hoverBackgroundColor: ["rgba(61, 255, 3)", "rgba(255, 0, 0)" ],
            hoverOffset: 4
          }]
       myChart = new Chartjs(ctx, newChartConfig);
         
        }
    
    return () => {
        myChart.destroy();
    }
    }, [chartContainer, data]);

  return (
    
    <div className={css({backgroundColor: theme?"rgba(215, 215, 215, 0.5)":"rgba(0, 0, 0, 0.7)"})}>
        {/* {console.log("data in charts", chartData)} */}
        <canvas ref={chartContainer} width="250" height="250">
        {status === 'loading' || (isFetching )? "Loading" : status === 'error' ? (
                   <p>"An Error"</p>
                  ) :""}
      </canvas>
    </div>
  );
};

export default Chart;