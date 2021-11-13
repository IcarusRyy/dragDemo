import "./App.css";
import "../node_modules/antd/dist/antd.css";
import React, { useRef, useState } from "react";
import { Button, Input,Select } from "antd";
const {Option } = Select
function App() {
  // 在展示区域要展示的组件
  const [showComponent, setShowComponent] = useState([])
  // 临时存储选择的组件id
  const [tempId, setTempId] = useState([])
  // 容器
  const targetBox = useRef()
  const baseComponent = [
    {
      name:'按钮', id:'btn'
    },
    {
      name:'小输入框', id:'small'
    },
    {
      name:'大输入框',id:'big'
    },
    {
      name:'文本域',id:'area'
    },
    {
      name:'选择器', id:'select'
    }
  ]
  // 基础组件
  const comp = 
    {
      btn: <Button>这是按钮</Button>,
      small: <Input placeholder="这是小输入框"/>,
      big:<Input placeholder="这是大输入框" style={{height:'80px'}}/>,
      area:<Input.TextArea placeholder="这是文本域"/>,
      select: <Select style={{width:'200px'}} placeholder="选择器">
        <Option key={0} value={0}>
          选项一
        </Option><Option key={1} value={1}>
          选项二
        </Option>
      </Select>
    }
  const moveBaseComponent = (e) => {
    // console.log(e.target)
    const compoentType =  e.target.id
    // console.log(compoentType, '选择的基础组件id')
    tempId.push(compoentType)
    setTempId([...tempId])
  }
  
  // 展示基础组件
  const showBaseComponent = (e) => {
    console.log(e.target, 'showBaseComponent')
    // 获取临时存放组件id数组的最后一个
    const tempComponentId = tempId.pop()
    // 清空临时存放数组
    setTempId([...tempId])
    // 在要展示基础组件的数组 添加元素
    showComponent.push(tempComponentId)
    setShowComponent([...showComponent])
  }
  const dragOver =(e) => {
    e.preventDefault()
  }
  const dragEnter  =(e) => {
    e.preventDefault()
  }
  return (
    <div className="App">
      <div className="left-content">
        <h2 style={{textAlign:'center', margin:'10px auto'}}>基础组件</h2>
        <div className="left-content-base-component">
          {baseComponent.map(item=>(
            <div
            className="base-component"
            key={item.id}
            id={item.id}
            draggable={true}
            onDragStart={moveBaseComponent}
          >
            {item.name}
          </div>
          ))}
        </div>
      </div>
      <div className="right-content">
        <h2 style={{textAlign:'center', margin:'10px auto'}}>展示组件</h2>
        <div 
          className="right-content-base-component"
          ref={targetBox}
          // 阻止默认事件用于表明此div是用来展示移动的基础组件的容器
          onDragOver={(e) =>  e.preventDefault()}
          onDragEnter={(e) =>  e.preventDefault()}
          onDrop={showBaseComponent}
        >
          {showComponent.map((item,index)=>(
            <div key={index} style={{margin:"10px auto"}}>
              {comp[item]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
