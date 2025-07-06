// 该文件原为 Vuex 配置，已迁移至 Pinia。请使用 Pinia 进行状态管理。
// import Vue from "vue";
// import Vuex from "vuex";
import { initUserPoints } from "../utils/points";
// import { auth, db } from "../plugins/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
// 只在客户端检查auth
if (process.client && !auth) {
  throw new Error(
    "Firebase Auth is not available - check if running on client side"
  );
}
// Vue.use(Vuex);
const store = () => {
  return new Vuex.Store({
    state: {
      userInfo: {},
      isAuthenticated: false,
      memberStatus: false,
      initCoin: 10,
      locales: ["en", "zh"],
      locale: "en",
      querySnapshot: null,
    },
    mutations: {
      SET_TOKEN: (state, token) => {
        state.token = token;
      },

      LOG_OUT: (state) => {
        state.token = null;
      },
      IS_ACTIVETED: (state, isAuthenticated) => {
        state.isAuthenticated = isAuthenticated;
      },
      SET_USER_INFO: (state, userinfo) => {
        state.userInfo = userinfo;
      },
      SET_MEMBER_STATUS: (state, memberStatus) => {
        state.memberStatus = memberStatus;
      },
      SET_COINS: (state, initCoin) => {
        state.initCoin = initCoin;
      },
      SET_LANG(state, locale) {
        if (state.locales.includes(locale)) {
          state.locale = locale;
        }
      },
      SET_PHOTOURL(state, photoURL) {
        state.photoURL = photoURL;
      },
    },
    actions: {
      // 登录
      async Login({ commit }, kedepayObj) {
        try {
          commit("IS_ACTIVETED", true);
          commit("SET_USER_INFO", {
            userId: kedepayObj.localId,
            email: kedepayObj.email,
            displayName: kedepayObj.displayName,
            photoURL: kedepayObj.photoUrl,
          });
          const userExists = await dispatch("checkUserExists", kedepayObj);
          if (!userExists) {
            console.log("User does not exist. Initializing user points.");
            //如果用户未登录过，不存在于数据库中，则初始化积分
            await initUserPoints(kedepayObj.email, kedepayObj.localId);
            commit("SET_COINS", 10);
            localStorage.setItem("initCoin", 10);
          } else {
            // 如果存在，从数据库中读取积分
            // console.log("User already exists. Skipping initialization.");
            // 用户已存在，直接返回用户信息和积分
            const userDoc = this.querySnapshot.docs[0];
            const userData = userDoc.data();
            // console.log(userData, "userData-----userData");
            commit("SET_COINS", userData.points);
            localStorage.setItem("initCoin", userData.points);
            // console.log(userData, "userData---用户存在");
          }
          commit("SET_VIP_STATUS", 2);
          commit("SET_PHOTOURL", kedepayObj.photoUrl);
          localStorage.setItem("isVip", 2);
          localStorage.setItem("photoURL", kedepayObj.photoUrl);
          this.app.encryptAndStoreData(true, "isAuthenticated");
          this.app.encryptAndStoreData(kedepayObj.displayName, "user_name");
          this.app.encryptAndStoreData(kedepayObj.uid, "user_token");
          this.app.encryptAndStoreData(kedepayObj.email, "email");
          this.app.encryptAndStoreData(kedepayObj.localId, "userId");

          return kedepayObj;
        } catch (error) {
          console.error("Login error:", error);
          throw error;
        }
      },
      async checkUserExists(state) {
        try {
          //查询登录的用户是否已在数据库中存在
          const userId = state.state.userInfo.userId;
          const userRef = collection(db, "users");
          const userQuery = query(userRef, where("userId", "==", userId));
          this.querySnapshot = await getDocs(userQuery);

          return !this.querySnapshot.empty;
        } catch (error) {
          console.error("Error checking user existence:", error);
          return false;
        }
      },
      // 退出系统
      LogOut({ commit, state }) {
        return new Promise((resolve, reject) => {
          commit("IS_ACTIVETED", false);
          commit("SET_USER_INFO", {});
          commit("SET_COINS", null);
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("user_name");
          localStorage.removeItem("user_token");
          localStorage.removeItem("email");
          localStorage.removeItem("subscription_end_date");
          localStorage.removeItem("subscription_start_date");
          localStorage.removeItem("initCoin");
          resolve();
        });
      },
      // 初始化，刷新时从本地存储中重新赋值
      // 初始化，刷新时从本地存储中重新赋值
      async InitUser({ commit, state }) {
        console.log(state, "state");

        if (process.client) {
          // const userRef = collection(db, "users");
          // const userQuery = query(userRef, where("userId", "==", userId));
          // this.querySnapshot = await getDocs(userQuery);
          // const userDoc = this.querySnapshot.docs[0];
          // const userData = userDoc.data();
          // console.log(userData, "userData-----userData初始化");
          // commit("SET_COINS", userData.points);
          // localStorage.setItem("initCoin", userData.points);
          const getUser = localStorage.getItem("user_name");
          const getAuth = localStorage.getItem("isAuthenticated");
          const getCoin = localStorage.getItem("initCoin");
          const isVip = localStorage.getItem("isVip");
          const photoURL = localStorage.getItem("photoURL");
          if (getUser) {
            const obj = {
              isVip: isVip,
              photoURL: photoURL,
            };
            commit("SET_USER_INFO", obj);
          }
          if (getAuth) {
            const isAuthenticated = commit("IS_ACTIVETED", isAuthenticated);
          }
          if (getCoin) {
            commit("SET_COINS", getCoin);
            localStorage.setItem("initCoin", getCoin);
          }
        }
      },
    },
    modules: {},
  });
};

export default store;
