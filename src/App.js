import React, { Component } from 'react';
import './App.css';
import { List, Divider, Button, Avatar } from 'antd';
import { Redirect } from 'react-router-dom'
import DataContext from './component/DataContext'
import {
  SmileOutlined,
} from '@ant-design/icons';

class App extends Component {
  state = {
    goToFavorites: false,
    refreshPage: false
  }

  static myContext = DataContext

  goToFavorites = event => {
    console.log('click')
    event.preventDefault()
    this.setState({ goToFavorites: true })
  }

  handleIconClick = (event, item) => {
    console.log(`icon click, id = ${item.id}`)
    const { selectedData } = this.context
    const foundIndex = selectedData.findIndex(element => element.id === item.id)
    console.log(`icon click, foundIndex = ${foundIndex}`)
    this.setState({ refreshPage: true })
    if (foundIndex > -1) {
      selectedData.splice(foundIndex, 1)
    } else {
      selectedData.push(item)
    }
  }

  render() {
    if (this.state.goToFavorites) {
      return <Redirect push to={'favorites'} />
    }
    const { data, selectedData } = this.context
    console.log(`data = ${data}, selectedData = ${selectedData}`)

    return (

      <>
        <Divider orientation="center">Marvel App</Divider>
        <List
          size="small"
          header={<div><Button onClick={this.goToFavorites} type='primary'>Favorites</Button></div>}
          bordered
          dataSource={data}
          renderItem={item => {
            const foundIndex = selectedData.findIndex(element => element.id === item.id)
            
            return <List.Item
              key={item.id}
              actions={[
                <SmileOutlined style={{ color: foundIndex > -1 ? 'red' : 'black' }} />
              ]}
              onClick={(event) => this.handleIconClick(event, item)}>

              <List.Item.Meta
                // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                avatar={<Avatar src={item.thumbnail} />}
                title={item.name}
                description={item.description}

              >

              </List.Item.Meta>

            </List.Item>
          }
          }
        />
      </>
    );
  }
}
App.contextType = DataContext

export default App;