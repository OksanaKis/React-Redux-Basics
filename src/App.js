import React from 'react';
import './App.css';
import { addCustomerAction } from './store/customerReducer';
import { removeCustomerAction } from './store/customerReducer';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCustomers} from './asyncActions/customers';

function App() {
    const dispatch = useDispatch();
    const cash = useSelector(state => state.cash.cash);
    const customers = useSelector(state => state.customers.customers);

    const addCash = (cash) => {
      dispatch({type:"ADD_CASH", payload: cash})
    }

    const getCash = (cash) => {
      dispatch({type:"GET_CASH", payload: cash})
    }

    const addCustomer = (name)  => {
      const customer = {
        name,
        id: Date.now(),
      }
      dispatch(addCustomerAction(customer))
    }

    const removeCustomer = (customer) => {
      dispatch(removeCustomerAction(customer.id))
    }

  return (
    <div className="App">
      <div className="cash-block">Баланс: {cash}</div>
      <div className="button-block">
      <button className='btn btn-1' onClick={() => addCash(Number(prompt()))}>Поповнити рахунок</button>
      <button className='btn btn-2' onClick={() => getCash(Number(prompt()))}>Зняти з рахунку</button>
      <button className='btn btn-3' onClick={() => addCustomer(prompt())}>Додати клієнта</button>
      <button className='btn btn-4' onClick={() => dispatch(fetchCustomers())}>Отримувати клієнтів із бази</button>
      </div>
      <div className="customers-block">
        { customers.length > 0 ? 
        <div className="customers-list">
          {customers.map(customer => 
          <div onClick={() => removeCustomer(customer)} style={{fontSize: "2rem", padding: '10px',marginTop:20, border: '1px solid grey'}} key={customer.id}>{customer.name}</div>
          )}
        </div>
        :
        <div style={{fontSize: "2rem", marginTop:20}}>
          Клієнти відсутні!
        </div>
        }
      </div>
    </div>
  );
}

export default App;
