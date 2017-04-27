import React, { Component } from 'react';
import { Table,Input,Modal,Spin,Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MSActions from '../actions';
import './index.css';
const Search = Input.Search;

class App extends Component {

    constructor(props,context) {
        super(props)
    }

    render() {
        const {loadApiData} = this.props.MSActions;
        const dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }];

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        }];
        return (
            <div className="mainContent">
                <div className="toolBar">
                    <Button type="primary" onClick={()=>loadApiData()}>Create</Button>
                    <span style={{display:'inline-block',width:'10px',height:'10px'}}></span>
                    <Button type="primary">Delete</Button>
                    <span style={{display:'inline-block',width:'10px',height:'10px'}}></span>
                    <Search
                        placeholder="input search text"
                        style={{ width: 200 }}
                        onSearch={value => console.log(value)}
                    />
                </div>
                <Table 
                    size="middle"
                    dataSource={dataSource} 
                    columns={columns} 
                />
            </div>
        )
    }
}

export default connect(null,dispatch=>{
    return {
        MSActions: bindActionCreators(MSActions,dispatch)
    }
})(App);