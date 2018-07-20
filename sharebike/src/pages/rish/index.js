import React from "react";
import{Card, Button, Modal} from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
export default class Rish extends React.Component {
    state = {
        isShowText:false,
    }
    onEditorStateChange = (editorState)=>{
        this.setState({
            editorState,
          });
    }
    handleClearContent=()=>{
        this.setState({
            editorState:"",
          });
    }
    handlegetHtmlText =()=>{
        this.setState({
            editorState:"",
            isShowText:true
          });
    }
    onContentStateChange=(contentState)=>{
        this.setState({
            contentState,
          });
    }
    render() {
        const {editorState} = this.state;
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleClearContent}>清空文本</Button>
                    <Button type="primary" onClick={this.handlegetHtmlText}>获取html值</Button>
                </Card>
                <Card title="富文本编辑器">
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                    onContentStateChange ={this.onContentStateChange}
                />
            </Card>
            <Modal
                title="富文本"
                visible={this.state.isShowText}
                onCancel={()=>{
                    this.setState({
                        isShowText:false
                    })
                }}
                footer={null}
            >
                {
                   draftToHtml(this.state.contentState)
                }
            </Modal>
            </div>
        )
    }
}