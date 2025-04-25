import React from 'react';
import Banner from '../Banner/Banner';
import Books from '../Books/Books';
import { useLoaderData } from 'react-router';
import {Helmet} from 'react-helmet-async';
const Home = () => {
    const data = useLoaderData()
    // console.log(data);
    return (
        <div>
            <Helmet>
                <title>Boi Poka | Home</title>
            </Helmet>
            <Banner></Banner>
            <Books data={data}></Books>
        </div>
    );
};

export default Home;