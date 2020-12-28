import React from 'react';
import {
    Box,
    Grid,
    makeStyles,
    TextField,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl ,
    FormControlLabel,
    Switch,
    FormGroup,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    Container
  } from '@material-ui/core';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import {useLocation,useNavigate} from 'react-router-dom'
import moment from 'moment'

import FileUploader from './uploader'
import {reqAddUpdateOrder,reqUpdateOrder} from '../../api/index'




const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3),
    },
    paper:{
      width:'100%',
      height:'100%'
    },
    productCard: {
      height: '100%'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    areaId:{
      height:'50%',
      marginBottom:'auto',
      width:'40%'
    },
    input: {
      display: 'none',
    },
  }));

  // const validationSchema = yup.object({
  //   email: yup
  //     .string('Enter your email')
  //     .email('Enter a valid email')
  //     .required('Email is required'),
  //   password: yup
  //     .string('Enter your password')
  //     .min(8, 'Password should be of minimum 8 characters length')
  //     .required('Password is required'),
  // });

const tmpDate = new Date(Date.now())
const resultDate = tmpDate.getFullYear() + "-" + ((tmpDate.getMonth() + 1).toString().padStart(2,'0')) + "-" +                  ((tmpDate.getDate()).toString().padStart(2,'0'))


//TODO: 单号输入的时候需要异步查看数据库,查看并验证是否有重负单号,有则提示并终止.
const OrderManagement = ()=>{  
    const classes = useStyles()
    const [editorState,setEditorState]=React.useState(EditorState.createEmpty())
    // uploadList 是从uploader组件中得到的已上传文件列表
    const [uploadList,setUploadList]=React.useState([])
    
    const location = useLocation()
    const history = useNavigate()
    const orderDetail = (location.state?location.state:false)
    //moment库格式化时间为组件datepick需要的格式
    const orderDate = (orderDetail.date?moment(orderDetail.date).format('YYYY')+'-'+moment(orderDetail.date).format('MM')+'-'+moment(orderDetail.date).format('DD'):false)
    //是否有值的判断,如果没有给一个初始值
    const formik = useFormik({
        initialValues: {
          areaId     : (orderDetail.areaId?orderDetail.areaId:'AA'),
          orderNum   : (orderDetail.orderNum?orderDetail.orderNum:((tmpDate.getDate()).toString().padStart(2,'0')+            (tmpDate.getMonth() + 1).toString().padStart(2,'0')+'2001').toString()),
          quantity   : (orderDetail.quantity?orderDetail.quantity:1),
          thick      : (orderDetail.thick?orderDetail.thick:'1.6mm'),
          date       : (orderDetail.date?orderDate:resultDate),
          lock       : (orderDetail.lock?orderDetail.lock:'G锁'),
          logo       : (orderDetail.logo?orderDetail.logo:false),
          cp         : (orderDetail.cp?orderDetail.cp:false),
          fp         : (orderDetail.fp?orderDetail.fp:false),
          powder     : (orderDetail.powder?orderDetail.powder:false),
          install    : (orderDetail.install?orderDetail.install:false),
          category   : (orderDetail.category?orderDetail.category:''),
          installName: (orderDetail.installName?orderDetail.installName:"张辉"),
          weldName   : (orderDetail.weldName?orderDetail.weldName:"张辉"),
          tigName    : (orderDetail.tigName?orderDetail.tigName:"张辉"),
          gasStrut   : (orderDetail.gasStrut?orderDetail.gasStrut:0),
          price      : (orderDetail.price?orderDetail.price:0)
        },
        



        onSubmit: values => {
          values.uploadList = [...uploadList]
          values.editor=draftToHtml(convertToRaw(editorState.getCurrentContent()))
          values.dbid=(orderDetail._id?orderDetail._id:false)
          //合并uploadList进values,
          //TODO:Editor组件,异步上传values到数据库   
          // console.log(values); 
          reqAddUpdateOrder(values) 
          history('/app/order',{replace:true}) 
                  
        }
      })
    const onEditorStateChange = editorState => setEditorState(editorState)
    
    const getUploadeList =(list)=>{
      setUploadList(list)
    }
    
    return(
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardHeader
            subheader="用来新增和修改订单"
            title="订单管理"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}
            >
              <Grid item md={6} xs={12}>
                <TextField
                  label = "销售点"
                  name  = "areaId"
                  select
                  SelectProps = {{ native: true }}
                  required
                  variant = "outlined"
                  value={formik.values.areaId}
                  onChange={formik.handleChange}
                >
                  <option>AA</option>
                  <option>BWA</option>
                  <option>ENA</option>
                  <option>VGA</option>
                  <option>VEA</option>
                </TextField>
                
                <TextField                
                  label="订单号"
                  name="orderNum"
                  required
                  variant="outlined"
                  style={{marginLeft:'20%'}}
                  value={formik.values.orderNum}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item md={6} xs={12}
              >
                <TextField                
                  label = "数量"
                  name  = "quantity"
                  required
                  select
                  SelectProps = {{ native: true }}
                  variant     = "outlined"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                >
                {[1,2,3,4,5,6,7,8,9].map((item)=>{
                  return(
                    <option>{item}</option>
                  )
                })}
                </TextField>
                <TextField
                id      = "date"
                label   = "交货时间"
                type    = "date"
                variant = "outlined"
                name = "date"
                required
                style        = {{marginLeft:'15%'}}
                defaultValue = {Date.now()}
                className    = {classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.date}
                onChange={formik.handleChange}
              />
              <TextField
                  label="材料厚度"
                  name="thick"
                  select
                  SelectProps={{ native: true }}
                  required
                  style={{marginLeft:'10%'}}
                  variant="outlined"
                  value={formik.values.thick}
                  onChange={formik.handleChange}
                >
                  
                  <option>1.6mm</option>
                  <option>2.0mm</option>
                  <option>2.5mm</option>
                  <option>3.0mm</option>
                  <option>其他</option>
                </TextField>
              
              </Grid>
              <Grid item md={6} xs={12}>
                
                <FormControl component="fieldset" style={{marginLeft:'1px'}}>
                  <FormGroup row>
                  
                    <FormControlLabel
                      control={<Switch  name="logo" />}
                      label="Logo"
                      value={formik.values.logo}
                      onChange={formik.handleChange}
                    />
              
                    <FormControlLabel
                      control={<Switch  name="cp" />}
                      label="花铝"
                      value={formik.values.cp}
                      onChange={formik.handleChange}
                    />
                    <FormControlLabel
                      control={<Switch name="fp" />}
                      label="平铝"
                      value={formik.values.fp}
                      onChange={formik.handleChange}
                    />
                    <FormControlLabel
                      control={<Switch name="powder" />}
                      label="烤漆"
                      value={formik.values.powder}
                      onChange={formik.handleChange}
                    />
                    <FormControlLabel
                      control={<Switch  name="install" />}
                      label="安装"
                      value={formik.values.install}
                      onChange={formik.handleChange}
                    />
                  </FormGroup>

                </FormControl>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  label="产品型号"
                  name="category"
                  variant="outlined"
                  required
                  value={formik.values.category}
                  onChange={formik.handleChange}
                >
                  
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl required className={classes.margin} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-amount">售价</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    labelWidth={60}
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                  />
                
                </FormControl>  
                
              </Grid>
              <Grid item md={6} xs={12}>
              
              <TextField
                  label="焊工姓名"
                  name="weldName"
                  required
                  variant="outlined"
                  select
                  SelectProps={{ native: true }}
                  value={formik.values.weldName}
                  onChange={formik.handleChange}
                >
                  <option>张辉</option>
                  <option>F-方</option>
                  <option>A-宋</option>
                  <option>S-宋</option>
                  <option>H-大侠</option>
                  <option>M-小毛</option>
                  <option>G-顾</option>
                </TextField>
                <TextField
                  required
                  label="TIG焊"
                  name="tigName"
                  variant="outlined"
                  style={{marginLeft:'15%'}}
                  select
                  SelectProps={{ native: true }}
                  value={formik.values.tigName}
                  onChange={formik.handleChange}
                >
                  <option>张辉</option>
                  <option>小李</option>
                  <option>小东</option>
                </TextField>
                <TextField
                  label="安装"
                  name="installName"
                  variant="outlined"
                  style={{marginLeft:'15%'}}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={formik.values.installName}
                  onChange={formik.handleChange}
                >
                  <option>张辉</option>
                  <option>任</option>
                  <option>JSON</option>
                  <option>梁</option>
                  <option>王</option>
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="锁"
                  name="lock"
                  variant="outlined"
                  required
                  select
                  SelectProps={{ native: true }}
                  value={formik.values.lock}
                  onChange={formik.handleChange}
                >
                  <option>G锁</option>
                  <option>T锁</option>
                  <option>B锁</option>
                  <option>鱼尾锁</option>
                  <option>中控接线</option>
                </TextField>
                <TextField                
                  label="撑杆"
                  name="gasStrut"
                  variant="outlined"
                  style={{marginLeft:'10%'}}
                  value={formik.values.gasStrut}
                  onChange={formik.handleChange}  
                />
              </Grid>
              
              <Grid item md={6} xs={12}>              
                  <FileUploader getUploadeList={getUploadeList} orderDetail={orderDetail}/>
              </Grid>
                          
              
            </Grid>
          </CardContent>
          <Divider />
            <Container >
              <Grid item md={12} xs={12}>
                <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={onEditorStateChange}

                />
              </Grid>
            </Container>
            
          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
            <Button
              color="primary"
              variant="contained"
              type="submit"
              
            >
              提交
            </Button>
          </Box>
        </Card>
      </form>
    
    )
}

export default OrderManagement