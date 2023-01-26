import {useState, useEffect} from "react";

function Coin() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [dollar, setDollar] = useState(0);
    const [bitcoin, setBitcoin] = useState(0);
    const [dtob, setDtoB] = useState(false);
    const [price, setPrice] = useState(0);

    useEffect( () => {
        fetch("https://api.coinpaprika.com/v1/tickers")
        .then(response => response.json()
        .then(json => {
            setCoins(json);
            setLoading(false);
        }));
    }, []);

    const fonChange = (event) => {
        if(dtob === false){
            console.log(event.target.valueAsNumber);
            setDollar(event.target.valueAsNumber);
        }
        else{
            setBitcoin(event.target.valueAsNumber);
        }
    };

    const fonClick = () => {
        setDtoB(!dtob);
        setBitcoin(0);
        setDollar(0);
    };

    const fonSelect = (event) => {
        console.log(event.target.value);
        setPrice(event.target.value);
    }

    return (
    <div>
        <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
        {loading ? <strong>Loading...</strong> : 
        <select onChange={fonSelect}>
            {coins.map((item) =>
            <option value={item.quotes.USD.price}>{item.name} ({item.symbol}):
            $({item.quotes.USD.price}) USD</option>)}
        </select>}
        <div>
            <input
                placeholder="Insert US Dollar"
                value = {!dtob ? dollar : bitcoin * price}
                type = "number"
                onChange = {fonChange}
                disabled = {dtob}
            >
            </input>
        </div>
        <div>
            <button onClick={fonClick}>
                Flip!
            </button>
        </div>
        <div>
            <input
                placeholder="Insert Bitcoin"
                value = {!dtob ? dollar/price : bitcoin}
                type = "number"
                onChange = {fonChange}
                disabled = {!dtob}
            >
            </input>
        </div>
    </div>
    )
};

export default Coin;