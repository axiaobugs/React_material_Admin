import ajax from './ajax'

const BASE = ''  //localhost:5000


//login
export const reqLogin =  (username, password) => ajax(BASE+'/login', {username, password}, 'POST')
//Add user
export const reqAddUser = (user) =>ajax(BASE+'/manage/user/add', user, 'POST')

//获取一级，二级分类
export const reqCategories = (parentId) =>ajax(BASE+'/manage/category/list', {parentId})

//添加分类
export const reqAddCategories = (categoryName, parentId) =>ajax(BASE+'/manage/category/add', {categoryName,parentId},'POST')

//更新分类
export const reqUpdateCategories = ({categoryId, categoryName}) =>ajax(BASE+'/manage/category/update', {categoryId, categoryName},'POST')

//获取订单分页列表
export const reqOrders = (pageNum, pageSize,index)=>ajax(BASE+'/manage/order/list', {pageNum, pageSize,index})

//订单设置状态(done===0 delete===1)
export const reqOrderDoneDelete = (status,areaId,orderNum)=>ajax(BASE+'/manage/order/set', {status,areaId,orderNum})

//删除图片
export const reqDeleteImg = (name)=>ajax(BASE+'/manage/img/delete',{name},'POST')

//添加
export const reqAddUpdateOrder = (order)=>ajax(BASE+'/manage/order/'+(order.dbid?'update':'add'),order,'POST')

//修改/查看订单详情
export const reqSearchOrder = (areaId,orderNum)=>ajax(BASE+'/manage/order/search',{areaId,orderNum})

