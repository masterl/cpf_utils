module.exports = {
  globals: {
    expect: true
  },
  env: {
    mocha: true
  },
  plugins: [
    'chai-friendly'
  ],
  rules: {
    'no-unused-expressions':               0,
    'chai-friendly/no-unused-expressions': 2
  }
};
