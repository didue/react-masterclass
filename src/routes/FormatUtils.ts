
export const numberWithCommas = (n: number | undefined) => {
    if(!n) return 0;
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}