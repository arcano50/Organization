import React, {useState} from 'react';
import HN from './components/HierarchyNavigation'

export default function App() {

  // eslint-disable-next-line
  const [data, setVar] = useState(
    {id:0, name:'Organización', childrenCollection : [
      {id: 1, name: 'Coordinacion Costa Rica',
        memberCollection:[{id:1, name:'Miembro de las fuerzas armadas'}],
        childrenCollection: [
          {id:1, name: 'Zona', 
          memberCollection:[{id:1, name:'Jefferson Antonio', lastname:'Lezcano Arguello',
        cardId:604530085, country:'Costa Rica', state:'Puntarenas', city:'Buenos Aires',
        address:'Altamira, 50 metros este de Asoprola'} ], childrenCollection: [
            {id:1, name: 'Rama de alto rendimiento para misiones',memberCollection:[{id:1, name:'Miembro 1'}], childrenCollection:[
              {id:1, name: 'Grupo 1', memberCollection:[{id:1, name:'Miembro de Grupo A'}]},
              {id:2, name: 'Grupo 2', memberCollection:[{id:1, name:'Miembro de Grupo B'}]}
            ]},
            {id:2, name: 'B2'},
            {id:3, name: 'B3'}]},
          {id:2, name: 'A2',  childrenCollection: [
            {id:1, name: 'B1'},
            {id:2, name: 'B2'},
            {id:3, name: 'B3'}]},
          {id:3, name: 'A3',  childrenCollection: [
            {id:1, name: 'B1'},
            {id:2, name: 'B2'},
            {id:3, name: 'B3'}]}
    ]}], memberCollection:[{id:1, name:'Miembro 1'}]})

  return (
    <div>
      <header>
        <HN data= {data}/>
      </header>
    </div>
  );
}