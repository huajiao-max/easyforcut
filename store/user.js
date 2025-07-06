import { defineStore } from 'pinia'
import { initUserPoints } from '../utils/points'
import { useNuxtApp } from '#app'
import { collection, query, where, getDocs } from 'firebase/firestore'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
    isAuthenticated: false,
    memberStatus: false,
    initCoin: 10,
    locales: ['en', 'zh'],
    locale: 'en',
    querySnapshot: null,
    token: null,
    photoURL: '',
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    logOut() {
      this.token = null
      this.isAuthenticated = false
      this.userInfo = {}
      this.initCoin = null
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user_name')
      localStorage.removeItem('user_token')
      localStorage.removeItem('email')
      localStorage.removeItem('subscription_end_date')
      localStorage.removeItem('subscription_start_date')
      localStorage.removeItem('initCoin')
    },
    setIsAuthenticated(isAuthenticated) {
      this.isAuthenticated = isAuthenticated
    },
    setUserInfo(userinfo) {
      this.userInfo = userinfo
    },
    setMemberStatus(memberStatus) {
      this.memberStatus = memberStatus
    },
    setCoins(initCoin) {
      this.initCoin = initCoin
    },
    setLang(locale) {
      if (this.locales.includes(locale)) {
        this.locale = locale
      }
    },
    setPhotoURL(photoURL) {
      this.photoURL = photoURL
    },
    // 登录
    async login(kedepayObj) {
      try {
        this.setIsAuthenticated(true)
        this.setUserInfo({
          userId: kedepayObj.localId,
          email: kedepayObj.email,
          displayName: kedepayObj.displayName,
          photoURL: kedepayObj.photoUrl,
        })
        const userExists = await this.checkUserExists(kedepayObj)
        if (!userExists) {
          await initUserPoints(kedepayObj.email, kedepayObj.localId)
          this.setCoins(10)
          localStorage.setItem('initCoin', 10)
        } else {
          const userDoc = this.querySnapshot.docs[0]
          const userData = userDoc.data()
          this.setCoins(userData.points)
          localStorage.setItem('initCoin', userData.points)
        }
        this.setPhotoURL(kedepayObj.photoUrl)
        localStorage.setItem('photoURL', kedepayObj.photoUrl)
        localStorage.setItem('isVip', 2)
        // 你可以根据需要添加更多本地存储
        return kedepayObj
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    async checkUserExists(kedepayObj) {
      try {
        const userId = kedepayObj.localId
        const { $firebase } = useNuxtApp()
        const db = $firebase.db
        const userRef = collection(db, 'users')
        const userQuery = query(userRef, where('userId', '==', userId))
        this.querySnapshot = await getDocs(userQuery)
        return !this.querySnapshot.empty
      } catch (error) {
        console.error('Error checking user existence:', error)
        return false
      }
    },
    // 初始化，刷新时从本地存储中重新赋值
    initUser() {
      if (process.client) {
        const getUser = localStorage.getItem('user_name')
        const getAuth = localStorage.getItem('isAuthenticated')
        const getCoin = localStorage.getItem('initCoin')
        const isVip = localStorage.getItem('isVip')
        const photoURL = localStorage.getItem('photoURL')
        if (getUser) {
          const obj = {
            isVip: isVip,
            photoURL: photoURL,
          }
          this.setUserInfo(obj)
        }
        if (getAuth) {
          this.setIsAuthenticated(true)
        }
        if (getCoin) {
          this.setCoins(getCoin)
          localStorage.setItem('initCoin', getCoin)
        }
      }
    },
  },
}) 