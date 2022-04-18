import React,{useEffect, useState} from 'react';
import Header from './components/Header';
import Score from './components/Score';
import Result from './components/Result';
import Instructions from './components/Instructions';
import data from './data/data';

function App() {
  const [puzzleSize,setPuzzleSize]=useState(10);
  const [puzzleList,setPuzzleList]=useState(Array(puzzleSize*puzzleSize).fill(null));
  const [level,setLevel]=useState(1);
  const [lives,setLives]=useState(3);
  const [questionNo,setQuestionNo]=useState(1);
  const [objectList,setObjectList]=useState([]);
  const [errorText, setErrorText] = useState("");
  const [result, setResult] = useState("");

  function generateLetters(){
    let newArr=Array(puzzleSize*puzzleSize).fill(null);
    let difficultyFiltered=[],wordList=[];
    difficultyFiltered=data.filter(e => e.difficulty===level);
    for (let i = 0; i < 5; i++) {
      var idx = Math.floor(Math.random() * difficultyFiltered.length);
      wordList.push(difficultyFiltered[idx]);
      difficultyFiltered.splice(idx, 1);
    }
    wordList.forEach(e => {
      let dir=Math.floor(Math.random()*3),coordinate;
      while(true){
        coordinate=Math.floor(Math.random()*puzzleSize*puzzleSize);
        if(isNotBlocked(newArr,dir,coordinate,e.word.length))
          break;
      }
      newArr=insertWord(newArr,dir,coordinate,e.word);
    }
    );
    newArr=fillPuzzle(newArr);
    setPuzzleList(newArr);
    setObjectList(wordList);
    setQuestionNo(1);
  }

  function insertWord(newArr,dir,coordinate,word)
  {
    let length=word.length;
    switch(dir)
    { 
    case 0: 
    for(let i=0;i<length;i++)
    {
      newArr[coordinate+i]=word.charAt(i);
    }
      break;
    case 1:
    for(let i=0;i<length;i++)
    {
      newArr[coordinate+(i*puzzleSize)]=word.charAt(i);
    }
      break;
    case 2: 
    for(let i=0;i<length;i++)
    {
      newArr[coordinate+(i*puzzleSize)+i]=word.charAt(i);
    }
      break;
    default:
    }
    return newArr;
  }

  function isNotBlocked(newArr,dir,coordinate,length){
  //0-across,1-down,2-diagonal
  let row=Math.floor(((coordinate)/puzzleSize));
  let col=(coordinate)%puzzleSize;
  switch(dir)
  {
    case 0: 
    if(col+length>=puzzleSize)
    return false;
    for(let i=0;i<length;i++)
    {
      if(newArr[coordinate+i])
        return false;
    }
      break;
    case 1:
    if(row+length>=puzzleSize)
    return false;
    for(let i=0;i<length;i++)
    {
      if(newArr[coordinate+(i*puzzleSize)])
        return false;
    }
      break;
    case 2: 
    if(row+length>=puzzleSize || col+length>=puzzleSize)
    return false;
    for(let i=0;i<length;i++)
    {
      if(newArr[coordinate+(i*puzzleSize)+i])
        return false;
    }
      break;
    default: 
  }
  return true;
  }

  function fillPuzzle(newArr){
    for(let i=0;i<puzzleSize*puzzleSize;i++)
    {
      if(!newArr[i])
      newArr[i]=String.fromCharCode(65+Math.floor(Math.random()*26));
    }
    return newArr;
  }

  function handleClick(event){
    if(level<4 && lives>0)
    {
    let e=event.target;
    if (!e.classList.contains('correct')) {
      e.classList.toggle("selected");
    }
    }
  }

  function checkAccuracy(){
    let arr=[...document.getElementsByClassName("selected")],type;
    arr.sort((a,b) => a.row-b.row);
    if(arr.length>1)
    {
      let row0=arr[0].getAttribute("row");
      let row1=arr[1].getAttribute("row");
      let col0=arr[0].getAttribute("col");
      let col1=arr[1].getAttribute("col");
      if(row1-row0==1 && col1-col0==0)
      {
        type=1;
      }
      else if(row1-row0==0 && col1-col0==1)
      {
        type=0;
      }
      else if(row1-row0 && col1-col0==1)
      {
        type=2;
      }
      else
        type=3;
    let length=arr.length;

    switch(type)
    { 
    case 0: 
    for(let i=1;i<length;i++)
    {
      if(arr[i].getAttribute("row")-arr[i-1].getAttribute("row")!==0 || arr[i].getAttribute("col")-arr[i-1].getAttribute("col")!==1)
      {
        type=3;
        break;
      }
    }
      break;
    case 1:
    for(let i=1;i<length;i++)
    {
      if(arr[i].getAttribute("row")-arr[i-1].getAttribute("row")!==1 || arr[i].getAttribute("col")-arr[i-1].getAttribute("col")!==0)
      {
        type=3;
      }
    }
      break;
    case 2: 
    for(let i=1;i<length;i++)
    {
      if(arr[i].getAttribute("row")-arr[i-1].getAttribute("row")!==1 || arr[i].getAttribute("col")-arr[i-1].getAttribute("col")!==1)
      {
        type=3;
        break;
      }
    }
      break;
    default:
    }
    }
    else
    type=3;

    arr.forEach(e => {e.classList.toggle("selected")});

    if(type!==3)
    {
      let wordForCheck="";
      arr.forEach((e) => {wordForCheck+=e.innerHTML});
      if(wordForCheck===objectList[questionNo-1].word)
      {
        handleCorrect(arr);
      }
      else
      {
        setErrorText("OOPS ! Wrong Word !");
        document.getElementsByClassName("errorMessage")[0].style.visibility="visible";
        setLives(lives-1);
      }
    }
    else
    {
      setErrorText("OOPS ! Invalid Format ! Please read the instructions <3");
      document.getElementsByClassName("errorMessage")[0].style.visibility="visible";
    }

  }

  function handleCorrect(arr){
    document.getElementsByClassName("errorMessage")[0].style.visibility="hidden";
    arr.forEach(e => {e.classList.toggle("correct")});
    if(questionNo===5)
    {
      setLevel(level+1);
      if(level<3)
      setPuzzleSize(puzzleSize+1);
    }
    else
    {
      setQuestionNo(questionNo+1);
    }
  }

  function handleVictory(){
    let checker=document.getElementById("checker");
    checker.disabled=true;
    setResult("victory");
  }

  function handleDefeat(){
    let checker=document.getElementById("checker");
    checker.disabled=true;
    setResult("Defeat");
  }

  useEffect(() => {
    let arr=[...document.getElementsByClassName("correct")];
    arr.forEach(e => {e.classList.toggle("correct")});
    if(level===4)
    {
      handleVictory();
    }
    else
    generateLetters();
  },[level]);

  useEffect(() => {
    if(lives===0)
    handleDefeat();
  },[lives])
    
  return (
    <div className="App">
    <Header />
    {(objectList.length>0)?<Score questionNo={questionNo} question={objectList[questionNo-1].question} lives={lives} level={level}/>:<div></div>}
    <div className='board' style={{'gridTemplate' : `repeat(${puzzleSize}, 1fr) / repeat(${puzzleSize}, 1fr)`, height: puzzleSize*50, width: puzzleSize*50}}>
      {puzzleList.map((e,i) => <div className='box' onClick={handleClick} row={Math.floor(((i)/puzzleSize))} col={(i)%puzzleSize}>{e}</div>)}
    </div>
    <div>
    <button id='checker' onClick={checkAccuracy} variant="outline-dark">CHECK</button>
    </div>
    <div className="errorMessage" style={{visibility:'hidden'}}>{errorText}</div>
    <div style={{display:"flex"}}>
    <Instructions />
    <Result result={result}/>
    </div>
    </div>
  );
}

export default App;
