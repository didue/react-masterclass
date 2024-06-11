import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCoinDetail, getCoinTickers } from "./service";
import { ICoinInfoData, ICoinPriceData } from "./CoinInterface";

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
    margin: 20px;
`;
const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
`;
const Loader = styled.span`
    text-align: center;
`;

interface RouteParams {
    coinId: string;
}

interface RouteStates {
    name: string;
}


function Coin() {

    const [loading, setLoading] = useState(true);
    const { coinId } = useParams<RouteParams>();
    const [info, setInfo] = useState<ICoinInfoData>()
    const [price, setPrice] = useState<ICoinPriceData>();
    const { state } = useLocation<RouteStates>();
    
    
    useEffect(()=> {
        (async () => {
            const _coinInfoData = await getCoinDetail(coinId);
            const _priceData = await getCoinTickers(coinId); 
            
            console.log(_coinInfoData);
            console.log(_priceData);
            
            

            setInfo(_coinInfoData);
            setPrice(_priceData);
        })();
    }, []);

    return (
        <Container>
        <Header>
            <Title>{state.name || "Loading..."}</Title>
        </Header>
        {loading? 
        <Loader>Loading...</Loader>   
        :
        <span></span> 
        }
        </Container>
    )
}

export default Coin;