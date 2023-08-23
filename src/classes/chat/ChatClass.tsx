type listModifyType = 'INIT' | 'ADD' | 'UPDATE' | 'REMOVE'
type listType = 'CHATS' | 'MESSAGES' | 'LIMITS' | 'INBOX'

class ChatClass {
  public currentChatId:any = null
  public currentChatType: 'CHAT' | 'MAIL' | undefined = undefined 

  public chatMembers: any

  public chatList:any[] = []
  public messagesList:any[] = []
  public limitsList:any[] = []
  public inboxList:any[] = []
  
  public setCurrentChatId = (id: number | string) => {
   this.currentChatId = id;
  }
  public setCurrentChatType = (type: 'CHAT' | 'MAIL') => {
    this.currentChatType = type
  }
  public updateList = ({
    initList,
    setList,
    list,
    listType,
    modifyType
  }: {
    list:any[],
    listType:listType,
    modifyType:listModifyType,
    initList?:any[],
    setList?: (s:any[]) => any
  }) => {
    if(listType === 'CHATS') {
      if(modifyType === 'INIT') {
        this.chatList = list
        setList && setList(this.chatList)
        return this.chatList
      }
      if(modifyType === 'ADD') {
        this.chatList = [...this.chatList, ...list]
        setList && setList(this.chatList)
        return this.chatList
      }
      if(modifyType === 'REMOVE') {
        this.chatList = this.chatList.filter(i => i?.id === list[0]?.id)
        setList && setList(this.chatList)
      }
      if(modifyType === 'UPDATE') {
        const elementIndexInList = this.chatList.find(i => i.id === list[0]?.id)
        if(elementIndexInList !== -1) {
          const m = this.chatList;
          const rm = m.splice(elementIndexInList, 1, list[0])
          this.chatList = [...m]
          setList && setList(this.chatList)
        } else {
          this.chatList = [list[0], ...this.chatList]
          setList && setList(this.chatList)
        }
      }
      return this.chatList
    }
    if(listType === 'LIMITS') {
      if(modifyType === 'INIT') {
        this.limitsList = list
        setList && setList(this.limitsList)
      }
      if(modifyType === 'ADD') {
        this.limitsList = [...this.limitsList, ...list]
        setList && setList(this.limitsList)
      }
      if(modifyType === 'REMOVE') {
        this.limitsList = this.limitsList.filter(i => i?.id === list[0]?.id)
        setList && setList(this.limitsList)
      }
      if(modifyType === 'UPDATE') {
        const elementIndexInList = this.limitsList.find(i => i.id === list[0]?.id)
        if(elementIndexInList !== -1) {
          const m = this.limitsList;
          const rm = m.splice(elementIndexInList, 1, list[0])
          this.limitsList = [...m]
          setList && setList(this.limitsList)
        } else {
          this.limitsList = [list[0], ...this.limitsList]
          setList && setList(this.limitsList)
        }
      }
      return this.limitsList
    }
    if(listType === 'MESSAGES') {
      if(modifyType === 'INIT') {
        this.messagesList = list
        setList && setList(this.messagesList)
      }
      if(modifyType === 'ADD') {
        this.messagesList = [...this.messagesList, ...list]
        setList && setList(this.messagesList)
      }
      if(modifyType === 'REMOVE') {
        this.messagesList = this.messagesList.filter(i => i?.id === list[0]?.id)
        setList && setList(this.messagesList)
      }
      if(modifyType === 'UPDATE') {
        const elementIndexInList = this.messagesList.find(i => i.id === list[0]?.id)
        if(elementIndexInList !== -1) {
          const m = this.messagesList;
          const rm = m.splice(elementIndexInList, 1, list[0])
          this.messagesList = [...m]
          setList && setList(this.messagesList)
        } else {
          this.messagesList = [list[0], ...this.messagesList]
          setList && setList(this.messagesList)
        }
      }
      return this.messagesList
    }
    if(listType === 'INBOX') {
      if(modifyType === 'INIT') {
        this.inboxList = list
        setList && setList(this.inboxList)
      }
      if(modifyType === 'ADD') {
        this.inboxList = [...this.inboxList, ...list]
        setList && setList(this.inboxList)
      }
      if(modifyType === 'REMOVE') {
        this.inboxList = this.inboxList.filter(i => i?.id === list[0]?.id)
        setList && setList(this.inboxList)
      }
      if(modifyType === 'UPDATE') {
        const elementIndexInList = this.inboxList.find(i => i.id === list[0]?.id)
        if(elementIndexInList !== -1) {
          const m = this.inboxList;
          const rm = m.splice(elementIndexInList, 1, list[0])
          this.inboxList = [...m]
          setList && setList(this.inboxList)
        } else {
          this.inboxList = [list[0], ...this.inboxList]
          setList && setList(this.inboxList)
        }
      }
      return this.inboxList
    }
    return [];
  }
  public sendMessage = async ({
    data,
    type
  }: {
    data: any,
    type: 'TEXT' | 'GIFT' | 'PICTURE' | 'STICKER' | 'WINK'
  }) => { 
    if(this.currentChatId) {
      if(this.currentChatType === 'CHAT') {
        switch(type) {
          case 'TEXT': 
            break;
          case 'GIFT':
            break;
          case 'PICTURE':
            break;
          case 'STICKER':
            break;
          case 'WINK':
            break
        }
      }
      if(this.currentChatType === 'MAIL') {
        switch(type) {
          case 'TEXT':
            break;
        }
      }
    }
  }

  public updateChatMembers = (body: 
  {
    selfUser:any, 
    otherUser:any
  }, type: 'ADD' | 'DELETE') => {
    if(type === 'ADD') {
      this.chatMembers = body
      return this.chatMembers;
    }
    if(type === 'DELETE') {
      this.chatMembers = null
      return this.chatMembers
    }
    return this.chatMembers
  }

  
}

export default ChatClass;