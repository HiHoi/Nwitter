import React from "react";
import { useState, useEffect } from "react";
import { dbService } from "fbase";
import { addDoc, collection, doc, getDocs } from "firebase/firestore"

const Home = ({userObj}) => {
    const [nweet ,  setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        const dbNweets   = await getDocs(collection(dbService, "nweets"));
        dbNweets.forEach((document) =>{
            const nweetObject = {...document.data(), id: document.id};
            setNweets((prev) => [nweetObject, ...prev]) 
    });
    };

    useEffect(() => {
        getNweets();
    }, []);


    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createAt: Date.now(),
            createId: userObj.uid,
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
        <>
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
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>    
                    </div>
                ))}
            </div>
        </>

    );
};

export default Home;