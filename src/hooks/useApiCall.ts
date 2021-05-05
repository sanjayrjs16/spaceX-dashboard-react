import axios from 'axios';
import {useState} from 'react';

import { useQuery } from 'react-query';

export default function useApiCall(baseUrl: string, resource: string, queryParams: string, method: any,  key: string, options?: any, query?: any){
    
    const makeApiCall = async (page: any) => {
                 let data = await  axios({url: baseUrl+resource+queryParams, 
                    method,
                    data: {
                      "query": {...query},
                      "options": {...options}
                    }
                  })
                 
                  return await data.data
  }
  const { status, data, error, isFetching, isPreviousData } = useQuery(
    [key, options.page],
   () => makeApiCall(options.page),
    { keepPreviousData: true, staleTime: 5000 }
  );
  // console.log("inside useApiCall, ", status, data)
    return { status, data, error, isFetching, isPreviousData,};
}