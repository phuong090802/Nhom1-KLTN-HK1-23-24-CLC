const initDepartmentData = {
    departmentName: ''
}

const initParams = {
    search: ['departmentName'],
    keyword: '',
    page: 1,
    size: 5,
    filter: {},
    sort: {
        departmentName: 1,
    },
}

const sort = [{
    sortBy: 'departmentName',
    key: 'Tên khoa',
    sortType: [
        { key: 'Tăng dần', value: 1 },
        { key: 'Giảm dần', value: -1 }
    ]
},
]

const filter = [{
    label: { key: 'Trạng thái', value: 'isActive' },
    data: [
        { key: 'Hoạt động', value: true },
        { key: 'Không hoạt động', value: false }
    ]
}
    ,
]

const itemConst = {
    initParams: {
        search: ['fullName'],
        keyword: '',
        page: 1,
        size: 5,
        filter: {},
        sort: {
            'fullName': 1,
        },
    },
}

export {
    initDepartmentData,
    initParams,
    sort,
    filter,
    itemConst
}