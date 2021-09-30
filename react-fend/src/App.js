import React, {useEffect, useState} from 'react'
import { Button, TextArea } from 'semantic-ui-react';

import './App.css';
import { View } from './components/view';

function App() {
  const [camp_x,setData]=useState([])
  const [campId,setCampID]=useState('')
  const fetch_data=()=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ campId: campId })
  };
    fetch("/view",requestOptions).then(response=>response.json().then(data=>{
      setData(data);
      }))
  }
  return (
    <div className="App">

      <TextArea onChange={(value) => setCampID(value.target.value)}></TextArea>
      <Button onClick={fetch_data}>submit</Button>

      <View camp_x={camp_x}/> 
    </div>
  );
}

export default App;
