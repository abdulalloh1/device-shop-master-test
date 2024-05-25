<script
    setup
    lang="ts"
>
import { ref, watch } from "vue";
import { debounce } from 'lodash';
import { useCategoryStore } from "@/store/category.store";

const emit = defineEmits(['filter']);

const categoryStore = useCategoryStore();

const filters = ref({
  model_like: '',
  category_like: null,
})

const debounceFilter = debounce(() => {
  emit('filter', filters.value)
}, 500)

watch(() => filters.value.category_like, () => {
  emit('filter', filters.value)
});
</script>

<template>
  <el-form
      :model="filters"
      label-position="top"
  >
    <el-row :gutter="15">
      <el-col :lg="12">
        <el-form-item label="Модель">
          <el-input
              v-model="filters.model_like"
              clearable
              @input="debounceFilter"
          />
        </el-form-item>
      </el-col>

      <el-col :lg="12">
        <el-form-item label="Категория">
          <el-select
              v-model="filters.category_like"
              placeholder="Выберите категорию"
              clearable
          >
            <el-option
                v-for="category in categoryStore.categories"
                :key="category.id"
                :label="category.name"
                :value="category.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>