function geterateRates() {
  return [
    {
      time: new Date(),
      symbol: "EURUSD",
      bid: Math.random() * (1.1236 - 1.123) + 1.123,
      ask: Math.random() * (1.124 - 1.1237) + 1.1237,
    },
    {
      time: new Date(),
      symbol: "GBPUSD",
      bid: Math.random() * (1.2536 - 1.253) + 1.253,
      ask: Math.random() * (1.254 - 1.2537) + 1.2537,
    },
    {
      time: new Date(),
      symbol: "USDJPY",
      bid: Math.random() * (110.256 - 110.234) + 110.234,
      ask: Math.random() * (110.26 - 110.256) + 110.256,
    },
    {
      time: new Date(),
      symbol: "AUDUSD",
      bid: Math.random() * (0.7236 - 0.723) + 0.723,
      ask: Math.random() * (0.724 - 0.7237) + 0.7237,
    },
    {
      time: new Date(),
      symbol: "USDCAD",
      bid: Math.random() * (1.2648 - 1.264) + 1.264,
      ask: Math.random() * (1.265 - 1.2647) + 1.2647,
    },
    {
      time: new Date(),
      symbol: "NZDUSD",
      bid: Math.random() * (0.6536 - 0.653) + 0.653,
      ask: Math.random() * (0.654 - 0.6537) + 0.6537,
    },
  ];
}

module.exports = {
  geterateRates,
};
