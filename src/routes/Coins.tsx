import { Link } from "react-router-dom";
import styled from "styled-components";
import { CoinInterface } from "./CoinInterface";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";

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

const CoinList = styled.ul`
`;

const Coin = styled.li`
    background-color: ${props => props.theme.bgColor};
    color : ${props => props.theme.textColor};
    margin-bottom: 10px;
    border: 1px solid ${props => props.theme.textColor};
    border-radius: 15px;
    a{
        display : flex;
        align-items: center;
        padding: 20px;
        transition : color 0.2s ease-in;
    }
    &:hover {
        a{
            color: ${props => props.theme.accentColor}
        }
    }
`;

const Img = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`;

const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px; 
`;

const Loader = styled.span`
    text-align: center;
`;

function Coins() {

    //react hooks version
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoaing] = useState(true);

    // useEffect(()=> {
    //     (async () => {
    //         const _coinData = await getCoins();
    //         setCoins(_coinData);
    //         setLoaing(false);
    //     })();
    // }, []);


    //react-query version
    const {isLoading, data} = useQuery<CoinInterface[]>("allCoins", fetchCoins);


    return (
        <Container>
            <Helmet>
                <title>Coin Tracker</title>
            </Helmet>
            <Header>
                <Title>Coin Tracker</Title>
            </Header>
            {isLoading? 
            <Loader>Loading...</Loader>   
            : 
            <CoinList>
                {data?.slice(0, 100).map((coin) => (
                    <Coin key={coin.id}>
                        <Link to={{
                            pathname : `/${coin.id}`,
                            state : {name : coin.name }
                        }}>
                            <Img src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`} />
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                ))}
            </CoinList>
            }
        </Container>
    )
}

export default Coins;