import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast()
export const toastSuccess = (message) => 
{
    return $toast.success(message)
}

export const toastError = (error) => 
{
    return $toast.error(error)
}
