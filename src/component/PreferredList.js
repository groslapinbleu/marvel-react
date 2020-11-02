import React, { useContext } from 'react';
import { List, Divider, Popover, Avatar } from 'antd';
import DataContext from './DataContext'


const PreferredList = () => {
    const { selectedData } = useContext(DataContext)

    
    console.log(selectedData)
    return (
        <>
            <Divider orientation="center">Favorites</Divider>
                <List
                    size="small"
                    bordered
                    dataSource={selectedData}
                    renderItem={item => <List.Item><Popover content={<Avatar size="large" src={item.thumbnail}/>} title={item.description} trigger="hover">{item.name}</Popover></List.Item>}
                />
        </>
    );
};

export default PreferredList;