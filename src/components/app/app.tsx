import React from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { AppSwitchRouter } from '../app-switch-router/app-switch-router';

function App() {

  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.container}>
        <AppSwitchRouter />
      </main>
    </div>
  );
}

export default App;
