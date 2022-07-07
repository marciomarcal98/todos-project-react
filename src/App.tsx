import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";

import styles from './App.module.scss'
import './scss/global.scss'

export function App() {
  return (
    <div className={styles.wrapper}>
      <Header />

      <main>
        <Tasks />
      </main>
    </div>

  )
}