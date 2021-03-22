import axios from 'axios';
import {useState, useEffect} from 'react';

export default function useApiCall(query: string){
    let [items, setItems]: any[] = useState([]);
    useEffect(() => {
        axios.get('https://api.spacexdata.com/v3/launches?limit=12&sort=launch_year&order=desc')
        .then((res) => {
          setItems(res.data);
          console.log(res.data);
        })
      }, []);
    return items;
}