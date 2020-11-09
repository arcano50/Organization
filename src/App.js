import React, {useState, useEffect} from 'react';
import HN from './components/HierarchyNavigation'
import ComunityServices from './services/ComunityServices';

export default function App() {

  // eslint-disable-next-line
  const [data, setVar] = useState({});

  useEffect(() => {
    console.log("UseEffect");
    ComunityServices.getData().then((value)=> {
      console.log("value");
      console.log(value);
      const organization = {id:0, name:'Organización', childrenCollection : value.data}
      console.log("organization");
      console.log(organization);
      setVar(organization);
    }).catch((err)=>{console.log(err)});
  }, [])

  return (
    <div>
      <header>
        <HN data= {data}/>
      </header>
    </div>
  );
}