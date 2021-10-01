import React,{useState} from "react";
import { Icon,  Button,Menu, Table,Form, Header,Segment} from 'semantic-ui-react'
import _ from 'lodash'


export  const View=()=>{
  const pageSize=20
  const [camp_x,setData]=useState([])
  const [campId,setCampID]=useState('')
  const [camp_xPage,setDataPage]=useState([])
  const [cuurentPage,setcurrentPage]=useState(1)
  const fetch_data=()=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ campId: campId })
  };
    fetch("/view",requestOptions).then(response=>response.json().then(data=>{
      setData(data);
      setDataPage(_(data).slice(0).take(pageSize).value())
      }))
  }
  
  
  const pageCount=camp_x?Math.ceil(camp_x.length/pageSize):0;
  if(pageCount===1) return null;
  const pages=_.range(1,pageCount+1);

  const startPage=()=>{
    setcurrentPage(1);
    setDataPage(_(camp_x).slice(0).take(pageSize).value())
  }
  const endPage=()=>{
    setcurrentPage(pageCount);
    const startIndex=(pageCount-1)*pageSize;
    const paginationPost=_(camp_x).slice(startIndex).take(pageSize).value();
    setDataPage(paginationPost)
  }
  const previous=()=>{
    setcurrentPage(cuurentPage===1||pageCount===0?1:cuurentPage-1);
    const startIndex=(pages[cuurentPage]-1)*pageSize;
    const paginationPost=_(camp_x).slice(startIndex).take(pageSize).value();
    setDataPage(paginationPost)
  }
  const next=()=>{
    setcurrentPage(cuurentPage===pageCount||pageCount===0?pageCount:cuurentPage+1);
    const startIndex=(pages[cuurentPage]-1)*pageSize;
    const paginationPost=_(camp_x).slice(startIndex).take(pageSize).value();
    setDataPage(paginationPost)
  }
  

    return (
<div>
<Segment inverted>
<Header as='h1' inverted color='olive'>
    <Icon name='dna' />
    <Header.Content>Scoring and Ranking</Header.Content>
  </Header>
</Segment>
  <br/>
  <br/>
  <Header as='h2' style={{float:'center'}}>
    
    <Header.Content>AD Campaign Site Performance Scoring and Ranking Algorithm</Header.Content>
    <h4>Score and rank the perfomance of a site on a single campaign by accepting  the capmaign Id</h4>
  </Header>
  <div style={{margin: '50px'}} >
      <div style={{float: 'left',width: '50%'}}>
      <Form size='big' style={{float: 'left',width: '50%'}}>
          <Form.Field>
              <label >Campaign ID</label>
              <input onChange={(value) => setCampID(value.target.value)} placeholder='CampaingId' />
          </Form.Field>
          <Button style={{float: 'left',width: '30%'}} onClick={fetch_data} type='submit'>Submit</Button>
      </Form>
      </div>

      
    <Table celled>
    <Table.Header>
      <Table.Row>
      <Table.HeaderCell>Rank</Table.HeaderCell>
        <Table.HeaderCell>Site</Table.HeaderCell>
        <Table.HeaderCell>Impression</Table.HeaderCell>
        <Table.HeaderCell>Engagement</Table.HeaderCell>
        <Table.HeaderCell>Engagement Rate</Table.HeaderCell>
        <Table.HeaderCell>Score</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
        {camp_xPage && camp_xPage.map(camp=>{
            return(
                <Table.Row key={camp.Rank} >
                  <Table.Cell >{camp.Rank}</Table.Cell>
                    <Table.Cell >{camp.Site}</Table.Cell>
                    <Table.Cell >{camp.Impression}</Table.Cell>
                    <Table.Cell>{camp.engagement}</Table.Cell>
                    <Table.Cell>{camp.engRate}</Table.Cell>
                    <Table.Cell>{camp.Score}</Table.Cell>
                </Table.Row>
            )
        })}
        

    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item  onClick={()=>startPage()} as='a' icon>
            <Icon name='chevron left' />
            </Menu.Item>
            
              
     
     <Menu.Item  as='a'  onClick={()=>previous()} >previous</Menu.Item>
     <Menu.Item  as='a'  onClick={()=>next()} >next</Menu.Item>
                
            
        
            <Menu.Item onClick={()=>endPage()}as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
            <Menu.Item  as='a' >Current Page: {cuurentPage}</Menu.Item>
            <Menu.Item  as='a' >Total Page: {pageCount}</Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
    </Table>
    </div>
    </div>
    )
}