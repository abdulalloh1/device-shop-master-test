<script
    lang="ts"
    setup
>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="not-found-container">
    <el-card class="box-card">
      <div
          slot="header"
          class="clearfix"
      >
        <span>Page Not Found</span>
      </div>
      <div class="text-center">
        <el-image
            src="https://i.imgur.com/qIufhof.png"
            fit="contain"
            style="width: 300px; height: 300px;"
        />
        <h1>404</h1>
        <p>Sorry, the page you are looking for doesn't exist.</p>
        <el-button
            type="primary"
            @click="router.push({ name: 'Home' })"
        >
          Go Home
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f5f5f5;
}

.text-center {
  text-align: center;
}

h1 {
  font-size: 6rem;
  margin: 20px 0;
}

p {
  font-size: 1.2rem;
  margin: 20px 0;
}
</style>