import { useQuery } from "react-query";
import { fetchOHLCValues } from "./api";
import { ICoinOHLCData } from "./CoinInterface";
import ReactApexChart from "react-apexcharts";

interface ChartProps {
    coinId: string;
    coinName?: string;
}

function Chart({ coinId }: ChartProps) {

    const {isLoading, data} = useQuery<ICoinOHLCData[]>(["ohlcv", coinId], () => fetchOHLCValues(coinId), {refetchInterval: 30000});

    return (
        <>
        {isLoading? 
        "Loading.."
        :
        <ReactApexChart 
            type="line" 
            series={[
                {
                    name : 'Price',
                    data : data?.map(price => price.close) as number[],
                }
            ]}
            options={{
                theme : { mode: "dark" },
                stroke : { curve : "smooth", width : 3 },
                chart : { 
                    height : 300, 
                    width : 500,
                    background : "transparent",
                    toolbar : {
                        show : false,
                    },
                    animations : { enabled : false },
                },
                grid : { show : false },
                fill : {type: 'gradient', gradient : {gradientToColors : ['#0fbcf9'], stops :[0,100]} },
                colors : ['#0be881'],
                yaxis :  { show : false },
                xaxis :  { 
                    labels : { show : false }, 
                    axisTicks : {show : false}, 
                    axisBorder : {show: false},
                    categories: data?.map(price => new Date(+price.time_close * 1000).toUTCString()),
                    type : "datetime",
                },
                tooltip : {
                    y : { formatter : (value) => `$ ${value.toFixed(2)}` }
                }
            }}
        />
        }
        </>
    );
}

export default Chart