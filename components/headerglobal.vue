<template>
  <div>
    <client-only>
      <div class="sidebar-logo-container">
        <div class="sidebar-logo-link">
          <div class="left-logo">
            <img
              :src="logo"
              class="sidebar-logo"
              @click="tohome"
              alt="easy slim"
            />
            <h2 class="sidebar-title" @click="tohome">
              {{ $t("header.title") }}
            </h2>
          </div>
          <!-- <div class="box">
            <el-menu
              :default-active="activeMenu"
              class="el-menu-demo"
              mode="horizontal"
            >
              <el-menu-item index="1">
                {{ $t("footer.menuList[0].title") }}</el-menu-item
              >

              <el-menu-item index="2">
                {{ $t("footer.menuList[1].title") }}</el-menu-item
              >
              <el-menu-item index="3">
                {{ $t("footer.menuList[2].title") }}</el-menu-item
              >
              <el-menu-item index="4">
                {{ $t("footer.menuList[3].title") }}</el-menu-item
              >
              <el-menu-item index="5">
                {{ $t("footer.menuList[4].title") }}</el-menu-item
              >
            </el-menu>
          </div> -->
          <!-- <div
            class="right-login"
            @click="handleGoogleLogin"
            v-loading.fullscreen.lock="googleloading"
          >
            {{ $t("header.login") }}
          </div> -->
          <!-- 语言选择下拉组件 -->

          <!-- <div class="right-coin">
            <el-select
              v-model="locale"
              @change="changeLanguage"
              :placeholder="$t('dialog.selectLanguage')"
              style="width: 150px"
            >
              <el-option
                v-for="lang in availableLanguages"
                :key="lang.value"
                :label="lang.label"
                :value="lang.value"
              ></el-option>
            </el-select>
          </div> -->
          <img
            v-if="photoURL"
            :src="photoURL"
            alt=""
            style="border-radius: 50%; margin-top: 10px"
          />
          <div
            v-show="isAuthenticated"
            class="right-login"
            @click="handleGoogleOut"
          >
            {{ userName }}
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/store/user";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import logoImg from "@/assets/image/logo.png";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const googleloading = ref(false);
const logo = ref(logoImg);
const isAuthenticated = ref(false);
const userName = ref("");
async function handleGoogleOut() {
  if (process.client) {
    try {
      await ElMessageBox.confirm(
        this.$t("dialog.logoutConfirm"),
        this.$t("dialog.logoutTitle"),
        {
          confirmButtonText: this.$t("dialog.okButton"),
          cancelButtonText: this.$t("dialog.cancelButton"),
          type: "warning",
        }
      );
      const auth = getAuth();
      await signOut(auth);
      userStore.logOut();
      ElMessage.success(this.$t("dialog.logoutSuccess"));
    } catch (error) {
      if (error !== "cancel") {
        console.log(error, "error");
      }
    }
  }
}

const photoURL = ref("");
async function handleGoogleLogin() {
  if (process.client) {
    googleloading.value = true;
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await window.focus();
    signInWithPopup(auth, provider)
      .then((result) => {
        googleloading.value = false;
        const user = result.user.reloadUserInfo;
        photoURL.value = user.photoURL;
        userStore.login(user);
      })
      .catch((error) => {
        console.log(error, "error---");
        ElMessage.error(this.$t("dialog.loginFailed"));
        googleloading.value = false;
      });
  }
}
const { locale, setLocale } = useI18n();
const availableLanguages = [
  { value: "en", label: "English" },
  { value: "zh", label: "中文" },
  { value: "pt", label: "Português" },
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" },
  { value: "es", label: "Español" },
  { value: "jp", label: "日本語" },
  { value: "ko", label: "한국어" },
];
if (process.client) {
  const savedLocale = localStorage.getItem("locale");
  if (savedLocale) setLocale(savedLocale);
}

const changeLanguage = (lang) => {
  // 获取当前路径和语言
  const currentPath = route.path;
  const currentLang = currentPath.split("/")[1] || "en";

  // 计算新路径
  let newPath = currentPath;

  if (lang === "en") {
    // 切换到英文：移除语言前缀
    if (currentLang !== "en") {
      newPath = currentPath.replace(new RegExp(`^/${currentLang}`), "/");
      // 处理可能产生的双斜杠情况
      newPath = newPath.replace(/\/+/g, "/");
    }
  } else {
    // 切换到其他语言：确保路径有正确前缀
    if (currentLang !== lang) {
      if (currentPath === "/") {
        newPath = `/${lang}`;
      } else {
        newPath = `/${lang}${currentPath}`;
      }
    }
  }

  // 如果路径需要更新
  if (newPath !== currentPath) {
    // 先更新语言状态
    setLocale(lang);
    if (process.client) {
      localStorage.setItem("locale", lang);
    }
    // 然后跳转（使用nextTick确保状态更新完成）
    nextTick(() => {
      window.location.href = newPath;
    });
    return;
  }

  // 如果路径不需要更新，只需更新语言状态
  setLocale(lang);
  if (process.client) {
    localStorage.setItem("locale", lang);
  }
};

function tohome() {
  router.push("/");
}
const menuBg = computed(() => {
  return "linear-gradient(292deg, #ffb7bb, #e67ad1 50%, #7471fb);";
});

// 监听路由变化来同步语言状态
watch(
  () => route.path,
  (newPath) => {
    // 添加一个标志位，避免循环更新
    let isLanguageChangeFromDropdown = false;

    const changeLanguage = (lang) => {
      isLanguageChangeFromDropdown = true; // 标记为"用户主动切换语言"

      const currentPath = route.path;
      const currentLang = currentPath.split("/")[1] || "en";

      let newPath = currentPath;
      if (lang === "en") {
        if (currentLang !== "en") {
          newPath = currentPath.replace(new RegExp(`^/${currentLang}`), "/");
          newPath = newPath.replace(/\/+/g, "/"); // 避免双斜杠
        }
      } else {
        if (currentLang !== lang) {
          newPath = currentPath === "/" ? `/${lang}` : `/${lang}${currentPath}`;
        }
      }

      if (newPath !== currentPath) {
        setLocale(lang);
        if (process.client) localStorage.setItem("locale", lang);
        nextTick(() => {
          window.location.href = newPath; // 同步更新路径
        });
      } else {
        setLocale(lang);
        if (process.client) localStorage.setItem("locale", lang);
      }

      // 重置标志位（防止下次 watch 误判）
      setTimeout(() => {
        isLanguageChangeFromDropdown = false;
      }, 100);
    };
  },
  { immediate: true }
);
</script>

<style lang="less" scoped>
.sidebar-logo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  // background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  z-index: 1000;

  .sidebar-logo-link {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }

  .left-logo {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 85%;
    .sidebar-logo {
      width: 40px;
      height: 40px;
      margin-right: 12px;
    }

    .sidebar-title {
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
      margin: 0;
    }
    img {
      border-radius: 4px;
    }
  }

  .right-login {
    min-width: 80px;
    padding: 8px 16px;
    background: #409eff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 14px;
    margin-left: 10px;

    &:hover {
      background: #66b1ff;
    }
  }

  .right-coin {
    margin-left: 10px;
  }

  img[alt=""] {
    width: 32px;
    height: 32px;
    margin-left: 10px;
  }

  .right-items {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
// .el-menu {
//   background-color: transparent !important;
// }

/deep/ .el-menu--horizontal.el-menu {
  background-color: transparent !important;
  // color: #fff;
  border: none !important;
}
.el-menu {
  min-width: 500px;
  background-color: transparent !important;
}
/deep/ .el-sub-menu {
  display: none !important;
}
/deep/ .el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
  background-color: transparent !important;
}
/deep/ .el-menu-item {
  color: #fff !important;
}
/deep/ .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: transparent !important;
}
</style>
