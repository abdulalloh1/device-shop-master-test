<script
    setup
    lang="ts"
>
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { FormInstance, FormRules } from "element-plus";
import { AuthResponseType, AuthPayloadType } from "@/types/auth.type.ts";
import authApi from "@/api/auth.api.ts";
import authTokenCache from "@/cache/auth-token.cache.ts";
import axios, { AxiosError } from "axios";
import { toast } from "vue3-toastify";
import authUserCache from "@/cache/auth-user.cache.ts";

const router = useRouter();

const formRef = ref(null);
const registrationForm = ref({
  email: "",
  password: "",
});
const rules = reactive<FormRules<AuthPayloadType>>({
  email: [
    { required: true, message: "Please input email", trigger: "blur" },
    { type: "email", message: "Please input correct email", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (valid) {
      await authApi.register(registrationForm.value)
          .then(({ data }: AuthResponseType) => {
            authTokenCache.set(data.accessToken);
            authUserCache.setStringified(data.user);
            router.push({ name: 'Home' });
          })
          .catch((error: AxiosError | Error) => {
            toast.error(axios.isAxiosError(error) ? error.response?.data : error.message);
          });
    }
  })
}
</script>

<template>
  <div class="auth">
    <h1 class="auth__title">Registration</h1>
    <el-form
        ref="formRef"
        :model="registrationForm"
        :rules="rules"
        class="auth__form"
        label-position="top"
    >
      <el-form-item
          label="Email"
          prop="email"
          label-width="120px"
      >
        <el-input
            v-model="registrationForm.email"
        />
      </el-form-item>
      <el-form-item
          label="Password"
          prop="password"
          label-width="120px"
      >
        <el-input
            v-model="registrationForm.password"
            type="password"
            show-password
        />
      </el-form-item>
      <el-form-item>
        <div class="auth__action-btns">
          <el-button
              type="info"
              @click="router.push({
                name: 'Login'
              })"
          >
            Go to Login page
          </el-button>
          <el-button
              type="primary"
              @click="submitForm(formRef!)"
          >
            Submit
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>