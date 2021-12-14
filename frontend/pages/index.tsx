import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1>Fake Delivery</h1>
          <h3>We do stuff for you</h3>
          <a href="http://localhost:3000/api/auth/login">Log in or Sign up</a>
        </div>
      </main>
    </div>
  );
};

export default Home;
