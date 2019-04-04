let menu = {};

/**
 * 키맨 관리
 * @type {{name: string, path: string, icon: string}}
 */
menu.keyman = {
    name: '키맨 관리',
    path: '/keyman',
    icon: 'fa fa-tachometer',
};


/**
 * 고객 관리
 * @type {{name: string, icon: string, children: {}}}
 */
menu.client = {
    name: '고객 관리',
    path: '/client',
    icon: 'fa fa-th',
};

/**
 * 영업 관리
 * @type {{name: string, icon: string, children: {}}}
 */
menu.sales = {
    name: '영업 관리',
    path: '/sales',
    icon: 'fa fa-file-text-o'
};

/**
 * 정산 관리
 * @type {{name: string, icon: string, children: {}}}
 */
menu.balance = {
    name: '정산 관리',
    path: '/balance',
    icon: 'fa fa-user-circle-o'
};

export default menu;

if (process.env.NODE_ENV == 'development') {

    menu.fc = {
        name: 'FC 관리',
        path: '/fc',
        icon: 'fa fa-wrench',
    };
}

