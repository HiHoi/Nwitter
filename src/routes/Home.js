import React from "react";
import { useState, useEffect } from "react";
import { dbService } from "fbase";
import { addDoc, collection, getDocs } from "firebase/firestore"

const Home = () => {
    const [nweet ,  setNweet] = useState("");

    const getNweets = async () => {
        const dbNweets   = await getDocs(collection(dbService, "nweets"));
        console.log(dbNweets);
    };

    useEffect(() => {
        getNweets();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createAt: Date.now(),
        });
        setNweet("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target : {value},
        } = event;
        setNweet(value);
    };

    return (
        <form onSubmit={onSubmit} >
            <input
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
            />
            <input type="submit" value="Nweet" />
        </form>

    );
};

export default Home;