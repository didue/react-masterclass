import { useQuery } from "react-query";
import ReactApexChart from "react-apexcharts";
import { ICoinOHLCData } from "./CoinInterface";
import { fetchOHLCValues } from "./api";
import { numberWithCommas } from "./FormatUtils";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

interface PriceProps {
    coinId: string;
    coinName?: string;
}

function Price({coinId} : PriceProps) {

    const isDark = useRecoilValue(isDarkAtom);
    const {isLoading, data} = useQuery<ICoinOHLCData[]>(
        ["ohlcv", coinId],
        () => fetchOHLCValues(coinId),
        { refetchInterval : 30000 });

    const getSeries: any = () => {
        return data?.map((v) => ({
            x : new Date(+v.time_close * 1000),
            y : [v.open, v.high, v.low, v.close]
        }));
    };

    return (
        <>
        {isLoading?
            "Loading..."
            :
            <ReactApexChart
                type="candlestick"
                height={300}
                series={[
                    {
                        name : 'Price',
                        data : getSeries()
                    }
                ]}
                options={{
                    theme : { mode : isDark? 'dark': 'light' },
                    chart : {
                        background : "transparent",
                        toolbar : { show : false },
                        animations : { enabled : false },
                    },
                    yaxis :  { 
                        show : true,
                        labels : {
                            formatter : (v) => { return `$${numberWithCommas(v)}`}
                        }
                    },
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

export default Price;