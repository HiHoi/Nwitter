import { authService, dbService } from "fbase";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    //useHistory => useNavigate(v6)
    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName});
        }
    };

    //필터링 관련 자료
    // const getMyNweets = async () => {
    //     const nweets = await dbService
    //     .collection("nweets")
    //     .where("creatorId", "==", userObj.uid)
    //     .orderBy("createdAt", "asc")
    //     .get();

    //     console.log(nweets.docs.map((doc) => doc.data()));
    // };

    // useEffect(() => {
    //     getMyNweets();
    // }, []);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                onChange={onChange} 
                type="text" 
                placeholder="Display name" 
                value={newDisplayName}
                ></input>
                <input type="submit" value="Update Profile"></input>
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;