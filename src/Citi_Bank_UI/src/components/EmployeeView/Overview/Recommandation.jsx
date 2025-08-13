import React, {useEffect,useState} from 'react';
import Card from './RecommandationCard';
import { useStateContext } from "../../../contexts/ContextProvider";
function Customer() {
    const { selectedCustomerId, recommendation ,selectedCustomerRecommendation, selectedRole, mode} = useStateContext();
  const dummyCards = [
    {
      fee: '$95',
      type: 'Travel Elite',
      cardno: 'XXXX XXXX XXXX 1234',
      valid: '04/42 VALID THRU',
      cvv: '123',
      name: 'Name',
      benefits: [
        '3X points on travel & dining',
        'No foreign transaction fees',
        'Priority Pass lounge access',
        '60K bonus points'
      ],
      gradientFrom: '#7B2FF7', // Purple gradient start
      gradientTo: '#F107A3'    // Purple gradient end
    },
    {
      fee: '$495',
      type: 'Business Pro',
      cardno: 'XXXX XXXX XXXX 5678',
      valid: '12/28 VALID THRU',
      cvv: '456',
      name: 'Name',
      benefits: [
        '4th night free on hotels',
        'Priority Pass Select',
        'Comprehensive travel insurance',
        'Concierge service'
      ],
      gradientFrom: '#00C9FF', // Blue gradient start
      gradientTo: '#92FE9D'    // Blue gradient end
    },
    {
      fee: '$0',
      type: 'Cashback Master',
      cardno: 'XXXX XXXX XXXX 6548',
      valid: '12/32 VALID THRU',
      cvv: '641',
      name: 'Name',
      benefits: [
        '2% cashback on everything',
        'No annual fee',
        'Price rewind protection',
        'Extended warranty'
      ],
      gradientFrom: '#FFB6C1', // Pink gradient start
      gradientTo: '#FF69B4'    // Pink gradient end
    }
  ];
const [cardsData, setCardsData] = useState([]);
function getDummyCardDetails(type) {
  return dummyCards.find(card => card.type === type) || {};
}
const gradientColors = [
  { gradientFrom: '#7B2FF7', gradientTo: '#F107A3' },   // 1: Purple
  { gradientFrom: '#00C9FF', gradientTo: '#92FE9D' },   // 2: Blue
  { gradientFrom: '#FFB6C1', gradientTo: '#FF69B4' }    // 3: Pink
];
useEffect(() => {
  // fetch recommendation as before
  async function fetchData() {
 

  const recommendations = selectedCustomerRecommendation.recommendations;
    
 console.log("data areeeeeeee",recommendations)
    const cards = [1, 2, 3].map(num => {
      const cardType = recommendations[`top_${num}_card`];
      const features = recommendations[`top_${num}_card_features`];
     const fee = '$' + recommendations[`top_${num}_card_annual_fee`];

      const featureList = features.split('\n').map(f => f.trim()).filter(Boolean);

      const dummy = getDummyCardDetails(cardType, dummyCards);

      return {
        type: cardType,
        benefits: featureList,
        fee: fee || '0',
        cardno: dummy.cardno || 'XXXX XXXX XXXX',
        valid: dummy.valid || '--/-- VALID THRU',
        cvv: dummy.cvv || '---',
        name: ' Name',
       // Hardcoded gradients by position
    gradientFrom: gradientColors[num - 1].gradientFrom,
    gradientTo: gradientColors[num - 1].gradientTo

      };
    });

    setCardsData(cards);
  }

  fetchData();
}, []);

  return (
    <div 
  className={`min-h-screen w-full flex border  shadow-lg rounded-xl justify-center ${mode === "dark" ? "bg-[#1D2041] border-gray-700" : "bg-white border-gray-300"}`} 
  style={{marginTop: '-20px'}}
>
    <div className="flex w-full flex-wrap justify-center gap-8">
        {cardsData.map((cardData, index) => (
          <Card key={index} {...cardData} />
        ))}
      </div>
 
    </div>
  );
}

export default Customer;
