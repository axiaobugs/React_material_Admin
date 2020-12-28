import React,{useEffect} from 'react'
import {Container,
        Paper,
        makeStyles,
        IconButton
} 
  from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DoneIcon from '@material-ui/icons/Done';
import {useNavigate} from 'react-router-dom'

import {reqOrders} from '../../api/index'
import {columns} from '../../../config/list-conlums'
import {Alert} from 'rsuite'

//TODO:  editor 中的操作跳转函数
//TODO:  异步读取所有数据,方便之后日期排序

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    })




const processStatus=(array)=>{
    let proStatus=""
    const cutted=[0,0,0,0,0]
    const folded=[1,0,0,0,0]
    const welded=[1,1,0,0,0]
    const fitted=[1,1,1,0,0]
    const qualified=[1,1,1,1,0]
    const done=[1,1,1,1,1]
    if(JSON.stringify(array)===JSON.stringify(cutted)){
        proStatus="切板中"
    }else if(JSON.stringify(array)===JSON.stringify(folded)){
        proStatus="折板中"
    }else if(JSON.stringify(array)===JSON.stringify(welded)){
        proStatus="焊接中"
    }else if(JSON.stringify(array)===JSON.stringify(fitted)){
        proStatus="装配中"
    }else if(JSON.stringify(array)===JSON.stringify(qualified)){
        proStatus="质检中"
    }else if(JSON.stringify(array)===JSON.stringify(done)){
        proStatus="准备发货"
    }
    return proStatus
}


//TODO:  getData用useEFFECT
const ListView = () => {
    const classes = useStyles()
    const [rows,setRows]=React.useState([])
    const [page, setPage] = React.useState(0)
    const [pages,setPages]= React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(4)
    let history=useNavigate()

    const pageNum=page+1
    const handleChangePage = (event, newPage) => {
      setPage(newPage)
    }
    //TODO: 增加完成和删除的功能
    //order=areaId,orderNum  obj=file
    function createData(order, deadDate, status,obj ) {
    
        const editor = [(<IconButton 
        aria-label="delete" 
        color="primary" 
        onClick={()=>{
            history('/app/ordermanagement',{state:obj})
             
        }}>
        <MoreHorizIcon />
        
        </IconButton>),
        (<IconButton 
        aria-label="delete" 
        color="secondary"
        onClick={()=>{

        }}>
        <DoneIcon />
        </IconButton>),
        (<IconButton aria-label="delete" color="secondary">
        <DeleteIcon />
        </IconButton>)]
        
        return { order, deadDate, status , editor}
        }
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
    }
    
    const getData=async(pageNum)=>{
       const result = await reqOrders(pageNum,rowsPerPage)
       if(result.status===0){
           setPages(result.data.total)
           return result
       }else if(result.status===1){
           Alert.error("获取列表失败")
       }
          
    }
    
    const rowContents=async()=>{
        const result= await getData(pageNum)
        const arr2=[]
        result.data.list.map(file=>{
            const order=file.areaId+file.orderNum
            const resultDate=Math.ceil((Date.parse(file.date)-Date.now())/1000/60/60/24)
            const {cut,fold,weld,fit,qc}=file
            const arr=[Number(cut),Number(fold),Number(weld),Number(fit),Number(qc)]
            const status = processStatus(arr) 
            arr2.splice(-1,0,createData(order,resultDate,status,file))  
        })         
        setRows(arr2) 
    }
useEffect(()=>{
    rowContents()

},[page])

// TODO: 时间列添加排序功能了个,默认是数据库的读取顺序
    return (
        <Container >
            <Paper className={classes.root}>
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                        const value = row[column.id]
                        return (
                        <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                        )
                    })}
                    </TableRow>
                )
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[4,8]}
            component="div"
            count={pages}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </Paper>

        </Container>
    )
        
    }

export default ListView