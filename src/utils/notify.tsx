import {toast} from 'react-toastify';
import {VscError} from 'react-icons/vsc';
import {AiOutlineCheckCircle,  AiOutlineInfoCircle} from 'react-icons/ai';
import Avatar from '../components/Avatar/Avatar';



type notificationType = 'ERROR' | 'SUCCESS' | 'INFO' | 'AVATAR'


type notificationObjType = {
    icon: React.ReactNode,
    themeColor: string
}

type switchFuncType = (type: notificationType, avatar?: string) => notificationObjType

const switchType:switchFuncType = (type, avatar) => {
    switch(type) {
        case 'ERROR':
            return {
                icon: <VscError color='var(--red_1)'/>,
                themeColor: 'var(--red_1)'
            }
        case 'SUCCESS':
            return {
                icon: <AiOutlineCheckCircle color='var(--green_1)'/>,
                themeColor: 'var(--green_1)'
            }
        case 'INFO':
            return {
                icon: <AiOutlineInfoCircle color='#fff'/>,
                themeColor: '#fff'
            }
        case 'AVATAR':
            return {
                icon: <Avatar isRound size={50} image={avatar}/>,
                themeColor: 'var(--blue_6)'
            }
    }
}

const notify = (text: string | React.ReactNode | number, type: notificationType = 'SUCCESS', avatar?: string) => {
    toast(text, {
        icon: switchType(type, avatar).icon,
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        // pauseOnHover: true,
        draggable: true,
        
        theme: "dark",

        className: 'notify',
        progressStyle: {
            backgroundColor: switchType(type).themeColor
        } ,
        style: {
            borderRadius: 10,
            backgroundColor: 'var(--blue_5)',
            padding: 15,
            fontSize: 20,
            lineHeight: '24px',
            color: 'var(--text)',
        },
    })
}


export default notify;