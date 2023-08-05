export const init_item = {
    ItemsArray:[],
 }

 export const init_lists = {
    ListsArray:[],
    loading:false
 }

 export const init_user = {
    userLoggedIn:true, //later get it from cookies,
    // userInfo: Cookies.get('userInfo')
    //   ? JSON.parse(Cookies.get('userInfo'))
    //   : null,
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