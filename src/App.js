import React, { Component } from 'react';
import './App.css';
import { List, Divider, Button, Avatar, Layout, BackTop, Space } from 'antd';
import { Redirect } from 'react-router-dom'
import DataContext from './component/DataContext'
import {
  SmileOutlined,
} from '@ant-design/icons';
import { getAllCharactersAPI } from './service/API'
import Character from './model/Character'
const { Header, Footer, Content } = Layout
const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goToFavorites: false,
      refreshPage: false,
      isLoading: false,
      searchInput: ''
    }
    this.goToFavorites = this.goToFavorites.bind(this);
    this.getMoreData = this.getMoreData.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  // retrieve data from API
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

  // sets state so that we move to favorites page after refresh
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

  // update search field value
  handleInput = (event) => {
    this.setState({ searchInput: event.target.value })
  }

  render() {
    if (this.state.goToFavorites) {
      return <Redirect push to={'favorites'} />
    }
    const { data, selectedData } = this.context
    // console.log(`data = ${data}, selectedData = ${selectedData}`)


    return (


      <Layout>
        <Content>
          <Divider orientation="center">Marvel App</Divider>
          <List
            size="small"
            header={<Space>
              <Button onClick={this.goToFavorites} type='primary'>Favorites</Button>
              {this.state.isLoading
                ? <Button type='primary' loading>Loading Data</Button>
                : <Button onClick={this.getMoreData} type='primary'>Get More Data</Button>
              }
              <label htmlForm="search">Search by name </label>
              <input type="text" value={this.state.searchInput} onChange={this.handleInput}></input>
            </Space>}
            footer={<Space>
              <Button onClick={this.goToFavorites} type='primary'>Favorites</Button>
              {this.state.isLoading
                ? <Button type='primary' loading>Loading Data</Button>
                : <Button onClick={this.getMoreData} type='primary'>Get More Data</Button>
              }
            </Space>}
            bordered
            dataSource={data.filter(character => {
              return character.name.toLowerCase().includes(this.state.searchInput.toLowerCase())
            })}
            renderItem={item => {
              const foundIndex = selectedData.findIndex(element => element.id === item.id)

              return <List.Item
                key={item.id}
                actions={[
                  <SmileOutlined style={{ color: foundIndex > -1 ? 'red' : 'black' }} />
                ]}
                onClick={(event) => this.handleIconClick(event, item)}>

                <List.Item.Meta
                  avatar={<Avatar size="large" src={item.thumbnail} />}
                  title={item.name}
                  description={item.description}
                >

                </List.Item.Meta>

              </List.Item>
            }
            }
          />

        </Content>
        <Footer>
          <BackTop>
            <div style={style}>Up</div>
          </BackTop>
        </Footer>
      </Layout>
    );
  }
}
App.contextType = DataContext

export default App;