import { Fragment, useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

function App() {

  const [cartIsShown, setcartIsShown] = useState(false)

  const cartShownHandler = () =>{
    setcartIsShown(true)
  }

  const hideCartHandle = () => {
    setcartIsShown(false)
  }

  return (
    <Fragment>
      {cartIsShown && <Cart onClose={hideCartHandle} />}
      <Header onCartShown={cartShownHandler}/>
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
