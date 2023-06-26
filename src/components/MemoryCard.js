import React from 'react';


export default function MemoryCard( {card,handleSelected,disabled,rotated} ) {
  
  const isClicked = () => {
    if(!disabled){
      handleSelected(card)
    }
  }
  
  return (
    <div className="card">
      <div className={rotated ? "rotated":" "} >
        <img className='cardfornt' src={card.path} alt="" />
        <img className='cardback' onClick={isClicked} src="/img/cover.jpeg" alt="" />
      </div>
    </div>
  )
}