<script
    setup
    lang="ts"
>
import { useRouter } from "vue-router";
import authUserCache from "@/cache/auth-user.cache.ts";
import authTokenCache from "@/cache/auth-token.cache.ts";

const router = useRouter();

function logOut() {
  authUserCache.clear();
  authTokenCache.clear();
  router.push({ name: 'Login' });
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <el-scrollbar height="100vh">
        <el-menu style="height: 100vh">
            <el-menu-item
                index="1"
                @click="router.push({name: 'Products'})"
            >
              Products
            </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header>
        <h1>Device Shop Master</h1>
        <div class="toolbar">
          <el-dropdown>
            <el-button>
              {{ authUserCache.get() ? JSON.parse(authUserCache.get()!).email : null }}
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logOut">Log out</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss">
.layout-container {
  .el-header {
    display: flex;
    align-items: center;
    position: relative;
    background-color: #fff;
    color: var(--el-text-color-primary);
    box-shadow: 0 0 7px rgba(0,0,0,.1);

    h1 {
      margin-right: auto;
    }
  }

  .el-menu {
    border-right: none;
  }

  .el-main {
    padding: 15px;
  }
}
</style>