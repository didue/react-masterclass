import axios from "axios";

const COIN_API_URL = 'https://api.coinpaprika.com/v1/coins';
const TICKER_API_URL = 'https://api.coinpaprika.com/v1/tickers';

//코인 목록 조회
export const getCoins = async () => {
    try{
        const response = await axios.get(COIN_API_URL);
        
        return await response.data.slice(0, 100);
    }catch (err) {
        console.error("error : ", err);
    }
}

//코인 상세 정보 조회
export const getCoinDetail = async (coinId: string) => {
    try{
        const response = await axios.get(`${COIN_API_URL}/${coinId}`);
        
        return await response.data;
    }catch (err) {
        console.error("error : ", err);
    }
}


//코인 상세 정보 조회
export const getCoinTickers = async (coinId: string) => {
    try{
        const response = await axios.get(`${TICKER_API_URL}/${coinId}`);
        
        return await response.data;
    }catch (err) {
        console.error("error : ", err);
    }
}