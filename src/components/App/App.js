import {useState, useEffect} from 'react';
import './App.css';
import {callApi} from '../Api/Api';

function App() {
  const [inventory, setInventory] = useState([
    {
      title: 'Shoes',
    },
    {
      title: 'Pants',
    },
    {
      title: 'Shirt',
    },
  ]);
  const [cart, setCart] = useState([]);

  const handleAddItem = (item) => {
    const filteredInventory = inventory.filter(inventoryItem => inventoryItem.title !== item.title);
    setInventory(filteredInventory);
    // look into functional version of set state.
    setCart([...cart, item]);
  }

  const handleRemoveItem = (item) => {
    const filteredCart = cart.filter(cartItem => cartItem.title !== item.title);
    setCart(filteredCart);
    setInventory([...inventory, item]);
  }

  const InventoryMarkup = () => {
    return inventory.map((item, index) => {
      return <li key={`${item}-${index}`}>{item.title} <button onClick={() => handleAddItem(item)}>Add to cart</button></li>;
    })
  }

  const CartMarkup = () => {
    return cart.map((item, index) => {
      return <li key={`${item}-${index}`}>{item.title} <button onClick={() => handleRemoveItem(item)}>Remove from cart</button></li>;
    })
  }

  useEffect(() => {
    callApi()
      .then((value) => {
        setInventory(value);
      })
  }, []);


  return (
    <div>
      <h1>Inventory</h1>
      <InventoryMarkup />
      <h1>Cart</h1>
      <CartMarkup />
    </div>
  );
}

export default App;
