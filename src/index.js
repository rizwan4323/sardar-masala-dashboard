import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Windmill } from '@windmill/react-ui';
import './assets/css/custom.css';
import './assets/css/tailwind.css';
import './assets/css/tailwind.output.css';
import '@pathofdev/react-tag-input/build/index.css';
import App from './App';
import "./index.css"
import myTheme from './assets/theme/myTheme';
import { AdminProvider } from './context/AdminContext';
import { SidebarProvider } from './context/SidebarContext';
import ThemeSuspense from './components/theme/ThemeSuspense';
 
ReactDOM.render(
  <AdminProvider>
    <SidebarProvider>
      <Suspense fallback={<ThemeSuspense />}>
        <Windmill usePreferences theme={myTheme}>
          <App />
        </Windmill>
      </Suspense>
    </SidebarProvider>
  </AdminProvider>,

  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
