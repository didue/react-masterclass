import {  useState } from "react";
import { Helmet } from "react-helmet";
import { Switch, Route,useLocation, useParams, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { ICoinInfoData, ICoinPriceData } from "./CoinInterface";
import Price from "./Price";
import Chart from "./Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { numberWithCommas } from "./FormatUtils";
import { useQuery } from "react-query";
import { fetchCoinInfos, fetchCoinTickers } from "./api";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.div`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px 20px;
`;
const Icons = styled.span`
    &:hover{cursor: pointer;}
`;
const Title = styled.h1`
  margin: 0 auto;
  color: ${props => props.theme.accentColor};
  font-size: 48px;
`;
const Loader = styled.span`
    text-align: center;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;
const Tab = styled.span<{$isActive:boolean}>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px; 
    font-weight: 400;
    background-color: rgba(0,0,0,0.5);
    padding: 7px 0px;
    border-radius: 10px;
    a{
        display: block;
        color : ${props => props.$isActive? props.theme.accentColor : props.theme.textColor};
    };
`;


interface RouteParams {
    coinId: string;
}

interface RouteStates {
    name: string;
}

function Coin() {

    const [isLoading, setLoading] = useState(true);
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation<RouteStates>();

    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");

    //React Hooks Ver.
    // const [info, setInfo] = useState<ICoinInfoData>()
    // const [price, setPrice] = useState<ICoinPriceData>();
    
    // useEffect(()=> {
    //     (async () => {
    //         const _coinInfoData = await getCoinDetail(coinId);
    //         const _priceData = await getCoinTickers(coinId); 

    //         setInfo(_coinInfoData);
    //         setPrice(_priceData);
    //         setLoading(false);
    //     })();
    // }, [coinId]);

    //React-Query Ver.
    const {isLoading: infoLoading, data: infoData} = useQuery<ICoinInfoData>(["info", coinId], () => fetchCoinInfos(coinId), {refetchInterval : 30000});
    const {isLoading: tickerLoading, data: priceData} = useQuery<ICoinPriceData>(["tickers", coinId], () => fetchCoinTickers(coinId), {refetchInterval : 30000});
    const loading = infoLoading || tickerLoading;

    return (
        <Container>
          <Helmet>
            <title>
            {`${state?.name? state.name : loading? "Loading..." : infoData?.name } | 
              $${numberWithCommas(Number(priceData?.quotes.USD.price.toFixed(3)))}`}
            </title>
          </Helmet>
        <Header>
            <Icons>
                <Link to="/">
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </Link>
            </Icons>
            <Title>{state?.name? state.name : loading? "Loading..." : infoData?.name }</Title>
        </Header>
        {loading? 
        <Loader>Loading...</Loader>   
        :
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${numberWithCommas(Number(priceData?.quotes.USD.price.toFixed(3)))}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{numberWithCommas(priceData?.total_supply)}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{numberWithCommas(priceData?.max_supply)}</span>
            </OverviewItem>
          </Overview>

        
          <Tabs>
            <Tab $isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab $isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>   
          </Tabs>


          <Switch>
            <Route path={`/:coinId/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </> 
        }
        </Container>
    )
}

export default Coin;