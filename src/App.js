import React, { Component } from 'react';
import './App.css';
import { List, Divider, Button, Avatar, Spin } from 'antd';
import { Redirect } from 'react-router-dom'
import DataContext from './component/DataContext'
import {
  SmileOutlined,
} from '@ant-design/icons';
import { getAllCharactersAPI } from './service/API'
import Character from './model/Character'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goToFavorites: false,
      refreshPage: false,
      isLoading: false
    }
    this.goToFavorites = this.goToFavorites.bind(this);
    this.getMoreData = this.getMoreData.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  // retrieve data
  async getData() {
    this.setState({ isLoading: true })
    try {
      const { data } = this.context

      const allChars = await getAllCharactersAPI(this.context.offset, (data) => console.log(data))
      // console.log(`allChars = ${allChars}`)
      const dataset = allChars.data
      // console.log(`dataset = ${dataset}`)
      const results = dataset.results
      // console.log(`results = ${results}`)
      results.map(character => console.log(character))
      results.forEach((c) => data.push(new Character(c.id, c.name, c.description, `${c.thumbnail.path}.${c.thumbnail.extension}`)))
      this.setState({ refreshPage: true })
      this.context.dataLoadedOnceFromAPI = true
      this.context.offset = this.context.offset + results.length
      this.setState({ isLoading: false })
    } catch (error) {
      console.log(error)
    }
  }

  // get initial data from MArvel API when component is mounted
  async componentDidMount() {
    if (!this.context.dataLoadedOnceFromAPI) {
      await this.getData()
    }
  }


  goToFavorites = event => {
    event.preventDefault()
    this.setState({ goToFavorites: true })
  }

  async getMoreData() {
    console.log('getMoreData')
    await this.getData()
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
    // console.log(`data = ${data}, selectedData = ${selectedData}`)

    return (

      <>
        <Divider orientation="center">Marvel App</Divider>
        <List
          size="small"
          header={<div>
            <Button onClick={this.goToFavorites} type='primary'>Favorites</Button>
          </div>}
          footer={<div>
            <Button onClick={this.goToFavorites} type='primary'>Favorites</Button>
            <Button onClick={this.getMoreData} type='primary'>Get More Data</Button>
            {this.state.isLoading ?<Spin size="large" /> : null}
          </div>}
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