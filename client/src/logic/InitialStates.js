export const init_item = {
    ItemsArray:[],
 }

 export const init_lists = {
    ListsArray:[],
    loading:false
 }

 export const init_user = {
    isAuth:false, //later get it from cookies,
    token: localStorage.getItem('token')
      ? localStorage.getItem('token')
      : null,
    username: null,
    email: null,
    isLoading:false,
    lists:[]
 }

 export const init_globState = {
     loading:false,
     darkMode:false,
     isMobile: false,
     curr_list:{
      // _id: '64bbbb115d262b05270722da',
      // name:"Groceries",
      // type:"shopping",
      // category:"Shopping"
     },
     //  userLoggedIn:true, //later get it from cookies,
    // userInfo: Cookies.get('userInfo')
    //   ? JSON.parse(Cookies.get('userInfo'))
    //   : null,
    // feature_Config:{ // This is used to enable/disable some features entirely

    // }
 }