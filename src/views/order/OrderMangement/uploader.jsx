import { colors } from '@material-ui/core';
import React from 'react'
import { forwardRef} from 'react';
import { Uploader,Icon,Alert,Button} from 'rsuite';


import {reqDeleteImg} from '../../api/index'
import 'rsuite/dist/styles/rsuite-default.css'


const FileUploader = ((props)=>{
    const {getUploadeList,orderDetail} = props
    const uploadedResult=[]
    const tmpUpload =orderDetail.uploadList
    const [uploadList,setUploadList]=React.useState((tmpUpload?tmpUpload:null))
    const handleRemove=(file)=>{
        const {name}=file
        const tmpList=uploadList //TODO: tmpList typeof显示的是undefine,需要解决
       
        tmpList.map((file,index)=>{
            if(file.name===name){
                reqDeleteImg(file.serName);
                tmpList.splice(index,1) 
                setUploadList(tmpList)
            }           
        })  
    }
    
    const handleSuccess=(response,file)=>{
        const {url,name}=response.data
        const detail={}
        detail.url=url
        detail.name=file.name
        detail.serName=name
        uploadedResult.splice(-1,0,detail)
        setUploadList(uploadedResult)
        Alert.success('文件上传成功')
    }

 //TODO: 父组件提交直接读取upoloadList,而不用确认按钮
 //TODO: 添加onPreview功能
    return (
    <div>
        <Uploader 
        draggable
        listType='text-picture'
        action="/manage/img/upload"
        accept='image/*,.pdf'
        name='image'
        defaultFileList={(orderDetail.uploadList?orderDetail.uploadList:[])}
        onSuccess={handleSuccess}
        onRemove={handleRemove}
        >
            <button>
                <Icon icon='camera-retro' size="lg" />
            </button>
        </Uploader>
        <Button 
        onClick={()=>getUploadeList(uploadList)} 
        style={{marginLeft:'10%'}}
        appearance="primary"
        >
        确认
        </Button>
        <span style={{marginLeft:'10%', color:'red'}}>* 仅限图片格式,PDF,SKP</span>
    </div>
    )

})

    

export default FileUploader