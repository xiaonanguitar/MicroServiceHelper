import React, { Component } from 'react';
import { Table,Input,Modal,Spin,Button,Popconfirm  } from 'antd';
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
        this.change = this.change.bind(this);
    }

    componentDidMount() {
        const {loadApiData} = this.props.MSActions;
        loadApiData();
    }

    handleOk() {
        const {handleOk} = this.props.MSActions;
        const {editorState} = this.props;
        handleOk(editorState);
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

    change(e) {
        console.log(e.target.name);
        console.log(e.target.value);
        const {dispatch,modalState,creatorState} = this.props;
        
        if(modalState.mode === "edit"){
            let record = Object.assign({},modalState.record);
            record[e.target.name] = e.target.value
            dispatch({
                type: "MODIFY",
                record
            })
        }else{
            let record = Object.assign({},creatorState);
            record[e.target.name] = e.target.value
            dispatch({
                type: "CREATEEDITOR",
                record
            })
        }
        
    }

    render() {
        const {loadApiData,createShowModal,editShowModal,deleteRecord} = this.props.MSActions;
        const {msData,modalState,editorState,creatorState,dispatch} = this.props;
        const dataSource = this.getDataSource(msData.list);

        let columns = this.getColumns(msData.list);
        columns.push({ 
            title: 'Actions', 
            key: 'actions', 
            render: (text,record) => 
                <div className="actions">
                    <a onClick={()=>{
                        dispatch({type:"MODIFY",record})
                        editShowModal(record)
                    }}>Edit</a> 
                    <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={()=>deleteRecord(record)}>
                        <a>Delete</a> 
                    </Popconfirm>
                </div>
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
                    <Button type="primary" onClick={
                            ()=>createShowModal()
                        }>Create</Button>
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
                                            value={modalState.mode==="edit"?
                                                editorState[item.title]:creatorState[item.title]}
                                            name={item.title}
                                            onChange={(e)=>this.change(e)}
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
        modalState: state.ModalState,
        editorState: state.EditorState,
        creatorState: state.CreatorState
    }
},dispatch=>{
    return {
        MSActions: bindActionCreators(MSActions,dispatch),
        dispatch: dispatch
    }
})(App);