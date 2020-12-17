import {
    AlertCircle as AlertCircleIcon,
    BarChart as BarChartIcon,
    Lock as LockIcon,
    Settings as SettingsIcon,
    ShoppingBag as ShoppingBagIcon,
    User as UserIcon,
    UserPlus as UserPlusIcon,
    Users as UsersIcon
  } from 'react-feather';


//TODO: 增加name属性 用来navbar中的classname用来控制二级折叠菜单的状态
const items = [
    {
      href: '/app/dashboard',
      icon: BarChartIcon,
      title: '首页'
    },
    {
      href: '/app/customers',
      icon: UsersIcon,
      title: '人员管理',
      children:[{
        href: '/app/customers',
        icon: UsersIcon,
        title: '工人',
      }]
    },
    {
      href: '/app/order',
      icon: ShoppingBagIcon,
      title: '订单',
      children:[{
        href: '/app/ordermanagement',
        icon: UsersIcon,
        title: '订单管理',
      }]
    },
    {
      href: '/app/account',
      icon: UserIcon,
      title: '库存管理'
    },
    {
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Settings'
    },
    // {
    //   href: '/login',
    //   icon: LockIcon,
    //   title: 'Login'
    // },
    // {
    //   href: '/register',
    //   icon: UserPlusIcon,
    //   title: 'Register'
    // },
    // {
    //   href: '/404',
    //   icon: AlertCircleIcon,
    //   title: 'Error'
    // }
  ];

  export default  items