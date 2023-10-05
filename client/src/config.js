//LISTS
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PermMediaIcon from '@mui/icons-material/PermMedia';

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

export const list_types = ['shopping', //has shopping features like inc/dec ..etc
                    'notes', //checklist with notes
                    'checklist' //simple checklist
                    ]

export const list_names = [

                        {
                            name:'Grocieries',
                            category:list_categories[0].name,
                            type: list_types[0]
                    
                        },
                        {
                            name:'Gifts',
                            category:list_categories[0].name,
                            type: list_types[0]
                    
                        },
                        {
                            name:'Clothes',
                            category:list_categories[0].name,
                            type: list_types[1]
                    
                            
                        },
                        {
                            name:'Movies to watch with wife',
                            category:list_categories[2].name,
                            type: list_types[2]
                    
                            
                        },
                        {
                            name:'Books I have read',
                            category:list_categories[2].name,
                            type: list_types[1]
                    
                            
                        },
                        {
                            name:'Travel prep',
                            category:list_categories[1].name,
                            type: list_types[1]
                    
                            
                        },
                        {
                            name:'Travel destinations',
                            category:list_categories[1].name,
                            type: list_types[2]
                    
                            
                        },
                        {
                            name:'Main to do',
                            category:list_categories[3].name,
                            type: list_types[2]
                    
                            
                        }
                    ]


export const PAGE_REF = {
    LOGIN: "Login",
    SIGNUP: "Signup",
    MAIN: "MainPage",
    DASHBOARD: "Dashboard",
    LISTS_NAV: "ListofLists",
    CONFIRM_DEL: "ConfirmDelete",
    
}

export const BUTTON_SHAPE ={
    ICON: "icon",
    BLOCK: "block"
}