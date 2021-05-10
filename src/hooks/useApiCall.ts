import axios from 'axios';

import axiosConfig from '../axios/axiosConfig';

import { useQuery } from 'react-query';

export default function useApiCall(baseUrl: string, resource: string, queryParams: string, method: any,  key: string, options?: any, query?: any){
    
    const makeApiCall = async () => {
     let data ;
    //  if(resource.search("query")>=0) {
        data = await  axiosConfig({ url: baseUrl+resource+queryParams, 
                                    method,
                                    data: {
                                      "query": {...query},
                                      "options": {...options}
                                    },
                                  });
                 
        return await data.data
      // }
      // else{
      //   console.log("Not a query route")
      //     data = await  axiosConfig({url: baseUrl+resource+queryParams, 
      //       method,
      //       data: {
      //         "query": {...query},
      //         "options": {...options}
      //       }
      //     })
      //     return await data.data
      //             }
  }
  const { status, data, error, isFetching, isPreviousData, refetch } = useQuery(
    [key],
   () => makeApiCall(),
    { keepPreviousData: true, staleTime: 5000 }
  );
    return { status, data, error, isFetching, isPreviousData, refetch};
}