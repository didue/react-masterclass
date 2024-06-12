/***
 * react-query를 사용하는 data fetching
 */

const COIN_API_URL = 'https://api.coinpaprika.com/v1/coins';
const TICKER_API_URL = 'https://api.coinpaprika.com/v1/tickers';

//코인 목록 조회
export const fetchCoins = async () => {
    return fetch(COIN_API_URL).then(res => res.json());
}

//코인 상세 정보 조회 
export const fetchCoinInfos = async (coinId: string) => {
    return fetch(`${COIN_API_URL}/${coinId}`).then(res => res.json());
}

//코인 가격 정보 조회
export const fetchCoinTickers = async (coinId: string) => {
    return fetch(`${TICKER_API_URL}/${coinId}`).then(res => res.json());
}
