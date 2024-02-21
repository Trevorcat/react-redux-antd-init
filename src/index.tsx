import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import store from './redux/store';

import zh_CN from 'antd/es/locale/zh_CN';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider key="cn" locale={zh_CN}>
        <Router>
          <App />
        </Router>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

