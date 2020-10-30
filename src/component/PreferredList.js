import React, { useContext } from 'react';
import { List, Divider } from 'antd';
import DataContext from './DataContext'


const PreferredList = () => {
    const { selectedData } = useContext(DataContext)
    const handleClick = () => {
        console.log('click')
    }
    console.log(selectedData)
    return (
        <>
            <Divider orientation="center">Favorites</Divider>
                <List
                    size="small"
                    bordered
                    dataSource={selectedData}
                    renderItem={item => <List.Item onClick={handleClick}>{item.name}</List.Item>}
                />
        </>
    );
};

export default PreferredList;