//LISTS
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PermMediaIcon from '@mui/icons-material/PermMedia';


export const ITEM_TYPES = {
    CHECKLIST: "checklist",
    SHOPPING:"shopping",
    NOTES:"notes",
}
export const LIST_TYPES = {
    SHOPPING:"Shopping",
    TRAVEL:'Travel',
    MEDIA: "Media",
    TODO:"Todo",
}

export const item_types_list = [ITEM_TYPES.SHOPPING, //has shopping features like inc/dec ..etc
                    ITEM_TYPES.NOTES, //checklist with notes
                    ITEM_TYPES.CHECKLIST //simple checklist
                    ]

export const list_categories = [
    {
        name:'Shopping',
        icon:<ShoppingBagIcon />,

    }, 
    {
        name:'Travel',
        icon:<AirplaneTicketIcon />,

    },
    {
        name:'Media',
        icon:<PermMediaIcon />,


    },
    {
        name:'Todo',
        icon:<FormatListBulletedIcon />,

    }
]

export const list_names = [

                        {
                            name:'Grocieries',
                            category:list_categories[0].name,
                            type: item_types_list[0]
                    
                        },
                        {
                            name:'Gifts',
                            category:list_categories[0].name,
                            type: item_types_list[0]
                    
                        },
                        {
                            name:'Clothes',
                            category:list_categories[0].name,
                            type: item_types_list[1]
                    
                            
                        },
                        {
                            name:'Movies to watch with wife',
                            category:list_categories[2].name,
                            type: item_types_list[2]
                    
                            
                        },
                        {
                            name:'Books I have read',
                            category:list_categories[2].name,
                            type: item_types_list[1]
                    
                            
                        },
                        {
                            name:'Travel prep',
                            category:list_categories[1].name,
                            type: item_types_list[1]
                    
                            
                        },
                        {
                            name:'Travel destinations',
                            category:list_categories[1].name,
                            type: item_types_list[2]
                    
                            
                        },
                        {
                            name:'Main to do',
                            category:list_categories[3].name,
                            type: item_types_list[2]
                    
                            
                        }
                    ]


export const PAGE_REF = {
    LOGIN: "Login",
    SIGNUP: "Signup",
    MAIN: "MainPage",
    DASHBOARD: "Dashboard",
    LISTS_NAV: "ListofLists",
    CONFIRM_DEL: "ConfirmDelete",
    ERROR:"Error Page",
    CHANGE_PASS:"CHANGE_PASS",
}

export const BUTTON_SHAPE ={
    ICON: "icon",
    BLOCK: "block"
}


export const LOCAL_STORAGE_KEYS = {
    TOKEN: "token",
    PREV_LIST : "prev_list",
    CURR_LIST: "curr_list",
}

export const ICONS = {
    COPY: 'copy',
    DEL:'delete',
    INCREASE: 'increase',
    DECREASE: 'decrease',
    DONE: 'done',
    EDIT:'edit',
    NA:'not_available',


}

