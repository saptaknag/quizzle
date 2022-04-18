import React from 'react'

const Score = ({question, questionNo, lives, level}) => {
  return (
    <div className='score'>
    {level<4?<div className='leveldiv'>LEVEL : {level}</div>:<div></div>}
    <div className='question'>{questionNo}. {question}</div>
    <div className='livesdiv'>LIVES REMAINING : {lives}</div>
    </div>
  )
}

export default Score