import React from "react";
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
export  const View=({camp_x})=>{
    return (
    <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Site</Table.HeaderCell>
        <Table.HeaderCell>Impression</Table.HeaderCell>
        <Table.HeaderCell>Engagement</Table.HeaderCell>
        <Table.HeaderCell>Engagement Rate</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
        {camp_x && camp_x.map(camp=>{
            return(
                <Table.Row key={camp.Site} >
                    <Table.Cell >{camp.Site}</Table.Cell>
                    <Table.Cell >{camp.Impression}</Table.Cell>
                    <Table.Cell>{camp.engagement}</Table.Cell>
                    <Table.Cell>{camp.engRate}</Table.Cell>
                </Table.Row>
            )
        })}
        

    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
    </Table>
    )
}