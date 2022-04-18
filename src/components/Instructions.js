import React from 'react'

const Instructions = () => {
  return (
    <div className='instruction'>
    <h3 style={{textAlign:"center"}}>INSTRUCTIONS</h3>
    <ul>
        <li>Answer the question given with a word from the grid.</li>
        <li>Words will be given in Right/Down/Diagonal(towards bottom-right) pattern.</li>
        <li>Select the letters and click on 'CHECK'.</li>
        <li>After answering 5 questions, you will proceed to the next level.</li>
        <li>Complete level 3 to beat the game.</li>
        <li>Selecting incorrect words in valid patterns will cost you a life.</li>
        <li>Losing all lives will result in defeat.</li>
    </ul>
    <h3 style={{textAlign:"center"}}>GOOD LUCK !</h3>
    </div>
  )
}

export default Instructions