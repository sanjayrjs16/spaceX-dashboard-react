import React from 'react'

import { ButtonGroup, MODE } from "baseui/button-group";
import { Button } from "baseui/button";


interface PaginationButtonItems {
    setCurrentPage: any,
    currentPage: number,
    totalPages: number
}
const PaginationButton: React.FC<PaginationButtonItems> = ({ currentPage, totalPages, setCurrentPage}) => {
    return (
        <ButtonGroup
                    overrides={{Root: {style: { width: '60%', padding: "2rem"}}}}
                    mode={MODE.radio}
                    selected={currentPage-1}
                    onClick={(_event, index) => {
                        setCurrentPage(index+1);
                    }}>
            {[...Array(totalPages)].map((item, index) => {
            return  <Button key={index+1} onClick={() => setCurrentPage(index)}>{index + 1}</Button>
            })}
            {console.log("Current page in Pagination is ", currentPage, totalPages)}
      </ButtonGroup>
      
    )
}
export default PaginationButton;