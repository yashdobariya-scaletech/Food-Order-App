import {useState} from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CardProvider from './Store/CardProvider';

function App() {

  const [cartIsShown, setcartIsShown] = useState(false)

  const cartShownHandler = () =>{
    setcartIsShown(true)
  }

  const hideCartHandle = () => {
    setcartIsShown(false)
  }

  return (
    <CardProvider>
      {cartIsShown && <Cart onClose={hideCartHandle} />}
      <Header onCartShown={cartShownHandler}/>
      <main>
        <Meals />
      </main>
    </CardProvider>
  );
}

export default App;
