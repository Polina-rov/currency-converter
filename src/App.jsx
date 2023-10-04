import React, { useState } from 'react';
import { Block } from './Block';
import './index.scss';
import { useEffect } from 'react';

const URL =
  'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_AERNRPxrf4YOLwCgqqslzb9tDhT3mrVWGvjhNaYB&base_currency=USD';

function App() {
  const [currency1, setCurrency1] = useState(0);
  const [currency2, setCurrency2] = useState(0);
  const [currencies, setCurrencies] = useState({});
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');

  function handleChangeValue1(value) {
    const price = value / currencies[fromCurrency];
    const result = price * currencies[toCurrency];
    setCurrency1(value);
    setCurrency2(result);
  }
  function handleChangeValue2(value) {
    const result = (currencies[fromCurrency] / currencies[toCurrency]) * value;
    setCurrency2(value);
    setCurrency1(result);
  }

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setCurrencies(response.data);
      });
  }, []);

  useEffect(() => {
    handleChangeValue1(currency1);
  }, [fromCurrency, currency1]);

  useEffect(() => {
    handleChangeValue2(currency2);
  }, [toCurrency, currency2]);

  return (
    <div className="App">
      <Block
        value={currency1}
        currency={fromCurrency}
        onChangeValue={handleChangeValue1}
        onChangeCurrency={setFromCurrency}
      />
      <Block
        onChangeValue={handleChangeValue2}
        value={currency2}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
      />
    </div>
  );
}

export default App;
