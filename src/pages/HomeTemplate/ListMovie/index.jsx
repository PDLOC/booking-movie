import { useState, useEffect } from "react";
import Movie from "./../_components/Movie";
import axios from "axios";

export default function ListMovie() {
    const [state, setState] = useState([{
        loading: false,
        data: null,
        error: null,
    }]);

    useEffect(() => {
        /**Cách 1 gọi API REACTJS */
        // const fetchData = () => {
        //     const promise = axios({
        //         method: "GET",
        //         url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
        //         headers: {
        //             TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MiIsIkhldEhhblN0cmluZyI6IjE4LzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTY4OTYwMDAwMCIsIm5iZiI6MTc2MTMyNTIwMCwiZXhwIjoxNzg5ODM3MjAwfQ.wzN71RMWnzxytkHIOECJCmKqVyDD-AylZWuEairOdiM"
        //         }
        //     });

        //     promise
        //         .then(result => {
        //             console.log(result);

        //         })
        //         .catch(err => {
        //             console.log(err);
        //         });
        // };
        // fetchData();

        /** Cách 2 
         * Call trực tiếp từ state
         * 
        */
        const fetchData = async () => {
            try {
                // pending => update loading true
                setState({
                    loading: true,
                    data: null,
                    error: null,
                });
                const result = await axios({
                    method: "GET",
                    url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
                    headers: {
                        TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MiIsIkhldEhhblN0cmluZyI6IjE4LzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTY4OTYwMDAwMCIsIm5iZiI6MTc2MTMyNTIwMCwiZXhwIjoxNzg5ODM3MjAwfQ.wzN71RMWnzxytkHIOECJCmKqVyDD-AylZWuEairOdiM"
                    }
                });
                const listPhim = result.data.content;
                setState({
                    loading: false,
                    data: listPhim,
                    error: null,
                });
            } catch (error) {
                console.log(error);
                setState({
                    loading: false,
                    data: null,
                    error: error,
                });
            }
        };
        fetchData();

    }, []);

    const renderListMovie = () => {
        const { data } = state;
        if (data) {
            return <Movie key={data.maPhim} movie={data} />
        }
        if (state.loading) return <p>Loading....</p>
    }

    return (
        <div className="container w-4/5 mx-auto mt-5">
            {renderListMovie()}
        </div>
    )
}
