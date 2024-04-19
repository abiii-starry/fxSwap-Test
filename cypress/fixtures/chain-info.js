// using parameters depends on the chainList map
export const chainList = new Map([
    ["bsc", "BNB Smart Chain"],
    ["arbitrum", "Arbitrum"],
    ["avalanche", "Avalanche"],
    ["fantom", "Fantom"],
    ["polygon", "Polygon"],
    ["mainnet", "Ethereum"]
]);

export const chainBrowser = new Map([
    ["bsc", "bscscan.com"],
    ["arbitrum", "arbiscan.io"],
    ["avalanche", "snowtrace.io"],
    ["fantom", "ftmscan.com"],
    ["polygon", "polygonscan.com"],
    ["mainnet", "etherscan.io"]
]);

export const chainReqArg = new Map([
    ["bsc", "bnb"],
    ["arbitrum", "arbitrum"],
    ["avalanche", "avax"],
    ["fantom", "ftm"],
    ["polygon", "polygon"],
    ["mainnet", "eth"],
    ["metis", "metis"],
    ["cronos", "cronos"],
    ["klaytn", "klaytn"],
    ["okc", "okt"],
    ["optimism", "optimism"]
]);

export const chainCoinSymbol = new Map([
    ["polygon", "MATIC"],
    ["arbitrum", "ETH"],
]);