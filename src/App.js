import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import MemoryCard from './components/MemoryCard';



const cardlist = [
  {"path":"./img/1.jpeg" , matched:false},
  {"path":"./img/2.jpeg" , matched:false},
  {"path":"./img/3.jpeg" , matched:false},
  {"path":"./img/4.jpeg" , matched:false},
  {"path":"./img/5.jpeg" , matched:false},
  {"path":"./img/6.jpeg" , matched:false},
  {"path":"./img/7.jpeg" , matched:false},
  {"path":"./img/8.jpeg" , matched:false},

]


function App() {
  
  const [cards,setCards] = useState([]);
  const [selectedOne,setSelectedOne] = useState(null);
  const [selectedTwo,setSelectedTwo] = useState(null);
  const [disabled,setDisabled] = useState(false);

  const resetStates = () => {
    setTimeout(() => {
      setSelectedOne(null);
      setSelectedTwo(null);
      setDisabled(false);
      
    }, 1000);
  }

  const prepareCards = () => {
    
    const sortedCards = [...cardlist,...cardlist ]
      .sort(() => {return 0.5 - Math.random()})
      .map((card) => ({...card,id:Math.random()}));
    
      setCards(sortedCards);
      setSelectedOne(null);
      setSelectedTwo(null);

  }
  
  const handleSelected = (card) => {
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card)
    
  }

  useEffect(() => {
    prepareCards();
  },[]);

  useEffect(() => {
    if(selectedOne && selectedTwo){
      setDisabled(true);
      if(selectedOne.path === selectedTwo.path){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.path === selectedOne.path){
              return {...card,matched: true}
            } else {
              return card;
              

            }
            
          })
        })
        resetStates();
      }else{
        resetStates();
      }
    }

  },[selectedOne,selectedTwo]);

  return (
    <div className="continer">
      <h1>Memory App</h1>
      <button style={{cursor:'pointer'}} onClick={prepareCards}>Oyunu Başlat</button>
      <div className="card-grid">
        {
          cards.map(card => (
            <MemoryCard 
              card={card} 
              key={card.id} 
              handleSelected={handleSelected}
              disabled={disabled}
              rotated = {card === selectedOne || card === selectedTwo || card.matched}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
