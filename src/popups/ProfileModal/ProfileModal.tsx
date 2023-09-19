import getClassNames from '@utils/getClassNames';
import styles from './ProfileModal.module.scss';
import {Modal, ModalFuncProps, Row, Col} from 'antd'
import { FC, useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { useAppSelector } from '@hooks/useReduxTypedHook';
import UserTitle from '@components/UserTitle/UserTitle';
import apiSlice from '@store/slices/apiSlice/apiSlice';
import Item from './components/Item/Item';
import Loader from '@components/Loader/Loader';
import { NavPrev, NavNext } from './components/Nav/navigationControls';

const ProfileModal:FC<ModalFuncProps> = (props) => {
  const {onCancel, open} = props
  const {currentUser, token} = useAppSelector(s => s.mainSlice);
  const [getUser, {isFetching, data, isSuccess}] = apiSlice.endpoints.getUser.useLazyQuery()
  
  const [userData, setUserData] = useState<any>(null)
  const {
    name,
    age,
    online,
    state,
    country,
    profile_photo,
    prompt_careers,
    prompt_finance_states,
    prompt_interests,
    prompt_relationships,
    prompt_sources,
    prompt_targets,
    prompt_want_kids,
    about_self
  } = userData || {}

  useEffect(() => {
    if(token && currentUser) {
      getUser({token, id: currentUser})
    }
  }, [token, currentUser])

  useEffect(() => {
    if(data && !isFetching && isSuccess && open) {
      setUserData(data)
    }
  }, [data, isFetching, isSuccess, open])

  const onClose = () => {
    setUserData(null)
    onCancel && onCancel()
  }

  return (
    <Modal
      {...props}
      className={getClassNames([styles.wrapper, 'modal'])}
      footer={false}
      onCancel={onClose}
      width={800}
      >
      {isFetching && <Loader/>}
      {(!isFetching && isSuccess && userData) && (
        <Row gutter={[20, 20]}>
          {
            profile_photo?.length > 0 && (
              <Col span={12}>
                <Row gutter={[10,10]}>
                  <div className={styles.slider}>
                    <Swiper 
                      className={styles.slider_body}>
                      {
                        profile_photo?.map((i:any) => (
                          <SwiperSlide className={styles.slide}>
                            <div className={styles.img}>
                              <img src={i?.image_url} alt="" />
                            </div>
                          </SwiperSlide>
                        ))
                      }
                      {
                        profile_photo?.length > 1 && (
                          <>
                            <NavPrev/>
                            <NavNext/>
                          </>
                        )
                      }
                    </Swiper>
                  </div>
                </Row>
              </Col>
            ) 
          }
          <Col span={profile_photo?.length > 0 ? 12 : 24}>
            <Row gutter={[5,5]}>
              <Col span={24}>
                <UserTitle
                  name={name}
                  age={age}
                  isOnline={online}
                  state={state}
                  country={country}
                  />
              </Col>
              {
                (prompt_careers && prompt_careers?.length) > 0 && (
                  <Col span={24}>
                    <Item
                      label='Карьера'
                      >
                      {
                        prompt_careers?.map((i:any) => (
                          i?.text
                        ))?.join(',')
                      } 
                    </Item>
                  </Col>
                )
              }
              {
                (prompt_finance_states && prompt_finance_states?.length) > 0 && (
                  <Col span={24}>
                    <Item
                      label='Финансы'
                      >
                      {
                        prompt_finance_states?.map((i:any) => (
                          i?.text
                        ))?.join(',')
                      } 
                    </Item>
                  </Col>
                )
              }
              {
                (prompt_interests && prompt_interests?.length) > 0 && (
                  <Col span={24}>
                    <Item
                      label='Интересы'
                      >
                      {
                        prompt_interests?.map((i:any) => (
                          i?.text
                        ))?.join(',')
                      } 
                    </Item>
                  </Col>
                )
              }
              {
                (prompt_relationships && prompt_relationships?.length) > 0 && (
                  <Col span={24}>
                    <Item
                      label='Отношения'
                      >
                      {
                        prompt_relationships?.map((i:any) => (
                          i?.text
                        ))?.join(',')
                      } 
                    </Item>
                  </Col>
                )
              }
              {/* {
                (prompt_sources && prompt_sources?.length) > 0 && (
                  <Col span={24}>
                    <Item
                      label='Карьера'
                      >
                      {
                        prompt_sources?.map((i:any) => (
                          i?.text
                        ))?.join(',')
                      } 
                    </Item>
                  </Col>
                )
              } */}
              {
                (prompt_targets && prompt_targets?.length) > 0 && (
                  <Col span={24}>
                    <Item
                      label='Цели'
                      >
                      {
                        prompt_targets?.map((i:any) => (
                          i?.text
                        ))?.join(',')
                      } 
                    </Item>
                  </Col>
                )
              }
              {
                (prompt_want_kids && prompt_want_kids?.length) > 0 && (
                  <Col span={24}>
                    <Item
                      label='Дети'
                      >
                      {
                        prompt_want_kids?.map((i:any) => (
                          i?.text
                        ))?.join(',')
                      } 
                    </Item>
                  </Col>
                )
              }
              {
                (about_self && (
                  <Col span={24}>
                    <Item
                      label='О себе'
                      >
                      {about_self}
                    </Item>
                  </Col>
                ))
              }
            </Row>
          </Col>
        </Row>
      )}
    </Modal>
  )
}

export default ProfileModal;