export  const columns = [
    { id: 'order', label: '订单号', minWidth: 130, align: 'center',},
    { id: 'deadDate', label: '距离截止时间', minWidth: 100, align: 'center' },
    {
      id: 'status',
      label: '状态',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'editor',
      label: '操作',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
  ]

