import React from 'react'

const Result = ({result}) => {
    if(result==="")
    {
        return <div></div>
    }
    return (
        result==="victory"?<div className='result' style={{background:"green",visibility:'visible'}}>VICTORY</div>:<div className='result' style={{background:"red",visibility:'visible'}}>DEFEAT</div>
    )
}

export default Result