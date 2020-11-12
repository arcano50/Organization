import React, {useState, useEffect} from 'react';
import HN from './components/HierarchyNavigation'
import ComunityServices from './services/ComunityServices';

export default function App() {

  const [data, setVar] = useState({})

  useEffect(() => {
    ComunityServices.getData()
      .then(result =>
      setVar({id: 0, name:'Organizacion', childrenCollection:result.data}))
      .catch(error => console.log(error))
  }, [])
    
  return (
    <div>
      <header>
        {console.log(data)}
        <HN data= {data}/>
      </header>
    </div>
  );
}