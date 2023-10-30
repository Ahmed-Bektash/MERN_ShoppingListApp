import { toast } from 'react-toastify';

export const NOTIFICATION_TYPE ={
    SUCCESS: "success",
    WARN: "warning",
    ERR: "error"
}
export const NotifyUser = (type,message,time=2000,pos='top-right') =>{
    switch (type) {
        case NOTIFICATION_TYPE.SUCCESS:
                toast.success(message,{ autoClose:time,position:pos});
            break;
        case NOTIFICATION_TYPE.WARN:
            toast.warn(message,{ autoClose:time,position:pos});
            break;
        case NOTIFICATION_TYPE.ERR:
            toast.error(message,{ autoClose:time,position:pos});
            break;
        
        default:
            break;
    }
}