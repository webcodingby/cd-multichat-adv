import styles from './Media.module.scss';
import { FC, useEffect, useState } from 'react'
import {Divider, Modal, ModalFuncProps} from 'antd';
import Button from '@components/Button/Button';
import getClassNames from '@utils/getClassNames';
import { useAppSelector } from '@hooks/useReduxTypedHook';
import {BsImages} from 'react-icons/bs';
import apiSlice, { useDeleteImagesMutation, useUploadImagesMutation } from '@store/slices/apiSlice/apiSlice';
import { useSearchParams } from 'react-router-dom';
import Item from './components/Item/Item';
import {Row, Col} from 'antd';
import {BsPlus} from 'react-icons/bs'
import { useInView } from 'react-intersection-observer';
import {MoonLoader} from 'react-spinners'
import * as L from 'lodash'

interface I extends ModalFuncProps {
  onSendMedia?: (...args:any[]) => any,
}
const tabs = [
  {value: '1', label: 'Аватар', icon: <BsImages/>},
  {value: '2', label: 'Профиль', icon: <BsImages/>},
  {value: '3', label: 'Контент', icon: <BsImages/>},
  {value: '4', label: '18+', icon: <BsImages/>},
  // {value: '5', label: 'Паблик', icon: <BsImages/>},
]

const mock = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
  {id: 7}
]

const Media:FC<I> = (props) => {
  const {
    open,
    onCancel,
    onSendMedia,
  } = props
  const {inView, ref} = useInView()
  const {chatData: {dialogUsers, chatType}, token} = useAppSelector(s => s.mainSlice)
  const [selfId, setSelfId] = useState<any>()
  const [params] = useSearchParams()
  const {girl} = dialogUsers || {}
  const [getMedia] = apiSlice.endpoints.getMedia.useLazyQuery()
  const [uploadImages, uploadImagesRes] = useUploadImagesMutation()
  const [deleteImages, deleteImagesRes] = useDeleteImagesMutation()
  const [activeTab, setActiveTab] = useState<any>('')
  const [selectedList, setSelectedList] = useState<any[]>([])
  const [isActive, setIsActive] = useState(false)
  const [page, setPage] = useState(1)
  const [mediaList, setMediaList] = useState<any[]>([])
  const [loadMore, setLoadMore] = useState(false)
  const [uploadLoad, setUploadLoad] = useState(false)
  const [deleteLoad, setDeleteLoad] = useState(false)


  const onClose = () => {
    setSelectedList([])
    onCancel && onCancel()
  }

  useEffect(() => {
    if(params?.get('selfId')) setSelfId(params?.get('selfId'))
  }, [params?.get('selfId')])

  //выбор медиафайлов
  const onSelect = (item: number | string) => {
    if(chatType === 'MAIL') {
      setSelectedList(s => {
        const findIndex = s.findIndex(i => i == item)
        if(findIndex !== -1) {
          const m = [...s];
          const rm = m.splice(findIndex, 1)
          return [...m]
        } else {
          return [...s, item]
        }
      })
    }
    if(chatType === 'CHAT') {
      setSelectedList(s => {
        const findIndex = s.findIndex(i => i == item)
        if(findIndex !== -1) {
          const m = [...s];
          const rm = m.splice(findIndex, 1)
          return [...m]
        } else {
          return [item]
        }
      })
    }
  }

  const getMediaFunc = () => {
    if(girl && open && activeTab && token && page && selfId) {
      setLoadMore(false)
      getMedia({token, body: {page, id: selfId}}).then(res => {
        const {isSuccess, data} = res
        if(data && isSuccess) {
          console.log(data)
          if(page === 1) {
            setMediaList(data)
          }
          if(page > 1) {
            setMediaList(s => [...s, ...data])
          }
        }
      }).finally(() => setLoadMore(false))
    }
  }
  
  //получение медиафайлов
  useEffect(() => {
    getMediaFunc()
  }, [girl, open, page, selfId])

  useEffect(() => {
    setPage(1) 
    if(page === 1) {
      getMediaFunc()
    }
  }, [activeTab, token])

  useEffect(() => {
    if(inView && loadMore) setPage(s => s + 1)
  }, [inView, loadMore])

  const onUploadMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files?.length > 0) {
        const files = [...e.target.files]
        const data = new FormData()
        for(let i = 0; i < files.length; i++) {
            data.append(`image${i}`, files[i])
        }
        data.append('count_image', files?.length.toString())
        data.append('user_id', selfId)
        data.append('category_id', activeTab)
        setUploadLoad(true)
        uploadImages({token, body: data}).finally(() => setUploadLoad(false))
    }
  }

  useEffect(() => {
    const {data, isSuccess, isLoading} = uploadImagesRes
    if(!isLoading && data && isSuccess) {
      if(data?.length > 0) setMediaList(s => [...data?.map((i: any) => ({...i?.original})), ...s])
    }
  }, [uploadImagesRes])

  const onDeleteImages = () => {
    if(selectedList?.length > 0 && token && selfId) {
      Promise.all(selectedList?.map(i => {
          return deleteImages({token, body: {
            image_id: i.id,
            user_id: selfId
          }})
      })).then(res => {
          setMediaList(s => L.without(s, ...selectedList))
      }).finally(() => {
          setDeleteLoad(false)
          setSelectedList([])
      })
    }
  }

  return (  
    <Modal 
      {...props}
      footer={false}
      width={800}
      onCancel={onClose}
      className={getClassNames([styles.wrapper, 'modal'])}>
      <div className={styles.action}>
        <div className={styles.action_part}>
          {
            selectedList?.length > 0 && (
              <Button
                onClick={() => setSelectedList([])}
                variant={'danger'}
                >
                Отменить выбор
              </Button>
            )
          }
          {
            selectedList?.length > 0 && (
              <div className={styles.action_item}>
                <Button
                  variant={'danger'}
                  isLoading={deleteLoad}
                  onClick={onDeleteImages}
                  >
                  Удалить{selectedList.length > 0 ? ':' + selectedList.length : ''}
                </Button>
              </div>
            )
          }
          {
            selectedList?.length < mock?.length && (
              <div className={styles.action_item}>
                <Button
                  onClick={() => setSelectedList(mock?.map(i => i?.id))}
                  >
                  Выбрать все
                </Button>
              </div>
            )
          }
          <div className={styles.action_item}>
            <Button 
              onClick={() => onSendMedia && onSendMedia(selectedList)}
              disabled={selectedList.length === 0}>
              Отправить{selectedList.length > 0 ? ':' + selectedList.length : ''}
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.tabs}>
        {
          tabs.map((i, index) => (
            <div className={styles.tab}>
              <Button
                onClick={() => setActiveTab(i.value)}
                variant={activeTab == i.value ? 'default' : 'dark'}
                >
                {i.label}
                {/* <BsImages style={{marginLeft: 5, lineHeight: '100%'}}/> */}
              </Button>
            </div>
          ))
        }
      </div>
      <div className={styles.body}>
        <Row gutter={[10,10]}>
          <Col span={6}>
            <div className={styles.add}>
              <input 
                onChange={onUploadMedia} 
                value={''} 
                type="file" 
                multiple 
                id='upload-media'/>
              <label 
                htmlFor="upload-media" 
                className={getClassNames([styles.upload, uploadLoad && styles.disable])}>
                {uploadLoad ? <MoonLoader/> : <BsPlus/>}
              </label>
            </div>
          </Col>
          {
            mock?.map(i => (
              <Col
                span={6}
                key={i?.id}
                >
                <Item
                  id={i?.id}
                  onSelect={() => onSelect(i?.id)}
                  isActive={selectedList?.find(f => f == i?.id)}
                  />
              </Col>
            ))
          }
        </Row>
        {loadMore && <div className={styles.load}></div>}
      </div>
    </Modal>
  )
}

export default Media;