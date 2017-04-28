import React, { Component } from 'react';
import { Table,Input,Modal,Spin,Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MSActions from '../actions';
import _ from 'lodash';
import './index.css';
const Search = Input.Search;

class App extends Component {

    constructor(props,context) {
        super(props)
        this.getColumns = this.getColumns.bind(this);
        this.getDataSource = this.getDataSource.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        const {loadApiData} = this.props.MSActions;
        loadApiData();
    }

    handleOk() {
        const {createHideModal} = this.props.MSActions;
        createHideModal();
    }

    handleCancel() {
        const {createHideModal} = this.props.MSActions;
        createHideModal();
    }

    getColumns(data){
        let columns = [];
        if(data.length){
            let item = data[0];
            for(var key in item){
                columns.push({
                    title: key,
                    dataIndex: key,
                    key: key,
                })
            }
        }
         _.remove(columns, function(n) {
            return n.title === "key";
        });
        return columns;
    }

    getDataSource(data){
        return  data.map(item=>{
            return Object.assign(item,{key:_.uniqueId('ms_')})
        })
    }

    render() {
        const {loadApiData,createShowModal,editShowModal} = this.props.MSActions;
        const {msData,modalState} = this.props;
        const dataSource = this.getDataSource(msData.list);

        let columns = this.getColumns(msData.list);
        columns.push({ 
            title: 'Edit', 
            key: 'edit', 
            render: (text,record) => <a onClick={()=>{
                console.log(record)
                editShowModal(record)
            }}>Edit</a> 
        })

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };

        return (
            <div className="mainContent">
                <div className="toolBar">
                    <Button type="primary" onClick={()=>createShowModal()}>Create</Button>
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
                    rowSelection={rowSelection}
                    dataSource={dataSource} 
                    columns={columns} 
                />
                <Modal title="Basic Modal" visible={modalState.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}>
                    {
                        this.getColumns(msData.list).map(item => {
                            if(item.title !== "key"){
                                return (
                                    <div key={item.key}>
                                        <label>{item.title}</label>
                                        <Input 
                                            value={modalState.record?modalState.record[item.title]:""}
                                        />
                                    </div>
                                )
                            }
                        })
                    }
                </Modal>
            </div>
        )
    }
}

export default connect(state=>{
    return {
        apiData: state.APILoaderState,
        msData: state.MSHelperState,
        modalState: state.ModalState
    }
},dispatch=>{
    return {
        MSActions: bindActionCreators(MSActions,dispatch)
    }
})(App);