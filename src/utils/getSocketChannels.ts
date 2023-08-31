import Pusher, {Options} from 'pusher-js';
import Echo from 'laravel-echo';

export type pusherConfigType = Options & { key: string, encrypted: boolean }
const getSocketChannels = (pusherConfig: pusherConfigType) => {
    const client = new Pusher(pusherConfig.key, pusherConfig)
  
    const channels = new Echo({
      broadcaster: "pusher",
      client: client,
    })
    return channels
}

export default getSocketChannels;