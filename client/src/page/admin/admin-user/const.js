const roleData = [
    { key: 'Tư vấn viên', value: 'COUNSELLOR' },
    { key: 'Giám sát viên', value: 'SUPERVISOR' }
]
const initData = {
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: 'COUNSELLOR',
    departmentId: ''
}

const filter = [
    {
        label: { key: 'Chức vụ', value: 'role' },
        data: [
            { key: 'Người dùng', value: 'USER' },
            { key: 'Tư vấn viên', value: 'COUNSELLOR' },
            { key: 'Trưởng khoa', value: 'DEPARTMENT_HEAD' },
            { key: 'Giám sát viên', value: 'SUPERVISOR' }]
    },
    {
        label: { key: 'Trạng thái', value: 'isEnabled' },
        data: [
            { key: 'Hoạt động', value: true },
            { key: 'Không hoạt động', value: false }
        ]
    }
    ,
    {
        label: { key: 'Nghề nghiệp', value: 'Occupation' },
        data: [
            { key: 'Sinh viên', value: 'Sinh Viên' },
            { key: 'Cựu sinh viên', value: 'Cựu sinh viên' },
            { key: 'Học sinh', value: 'Học sinh' },
            { key: 'Phụ huynh', value: 'Phụ huynh' },
        ]
    }
]

const sort = [{
    sortBy: 'fullName',
    key: 'Học & Tên',
    sortType: [
        { key: 'Tăng dần', value: 1 },
        { key: 'Giảm dần', value: -1 }
    ]
},
{
    sortBy: 'role',
    key: 'Chức vụ',
    sortType: [
        { key: 'Tăng dần', value: 1 },
        { key: 'Giảm dần', value: -1 }
    ]
}]

const initParams = {
    search: ['fullName', 'email', 'phoneNumber'],
    keyword: '',
    page: 1,
    size: 5,
    filter: {},
    sort: {
        fullName: 1,
        role: 1,
    }
}

export {
    roleData,
    initData,
    sort,
    filter,
    initParams
}