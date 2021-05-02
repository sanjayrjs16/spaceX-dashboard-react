import axios from 'axios';
import {useState, useEffect} from 'react';

export default function useApiCall(baseUrl: string, resource: string, query: string){
    let [items, setItems]: any[] = useState([]);
    useEffect(() => {
        axios({url: baseUrl+resource, 
          method: "post",
          data: {
            "query": {},
            "options": {}
          }
        })
        .then((res) => {
          setItems(res.data);
          console.log("Inside useApiCall hook, got the data as ", res.data);
        })
      }, []);
    return items;
}