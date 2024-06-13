/***
 * react-query를 사용하는 data fetching
 */

const BASE_URL = 'https://api.coinpaprika.com/v1';
const NICO_API_URL = 'https://ohlcv-api.nomadcoders.workers.dev';

//코인 목록 조회
export const fetchCoins = async () => {
    return fetch(`${BASE_URL}/coins`).then(res => res.json());
}

//코인 상세 정보 조회 
export const fetchCoinInfos = async (coinId: string) => {
    return fetch(`${BASE_URL}/coins/${coinId}`).then(res => res.json());
}

//코인 가격 정보 조회
export const fetchCoinTickers = async (coinId: string) => {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then(res => res.json());
}

//코인 OHLC(Open/High/Low/Close) 시간 및 가격 정보 조회
export const fetchOHLCValues = async (coinId: string) => {

    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60*60*24*7*2;   //2 weeks ago

    return fetch(`${NICO_API_URL}?coinId=${coinId}&start=${startDate}&end=${endDate}`).then(res => res.json());
    // return fetch(`${OHLC_API_URL}/?coinId=${coinId}`).then(res => res.json());
}