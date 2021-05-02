import axios from 'axios';
import {useState, useEffect} from 'react';

import { useQuery } from 'react-query';

export default function useApiCall(baseUrl: string, resource: string, query: string, key: any, page: any){
    let [items, setItems]: any[] = useState([]);
    const makeApiCall = async (page: any) => {
                 let data = await  axios({url: baseUrl+resource, 
                    method: "post",
                    data: {
                      "query": {},
                      "options": {}
                    }
                  })
                  setItems(await data.data)
                  return await data.data
  }
  const { status, data, error, isFetching, isPreviousData } = useQuery(
    [key, page],
   () => makeApiCall(page),
    { keepPreviousData: true, staleTime: 5000 }
  );
  console.log("inside useApiCall, ", status, data)
    return { status, data, error, isFetching, isPreviousData, items };
}