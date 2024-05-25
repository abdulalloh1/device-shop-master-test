<script
    setup
    lang="ts"
>
import { computed, ref, watch } from "vue";
import type { ProductType } from "@/types/product.type.ts";
import { useCategoryStore } from "@/store/category.store.ts";

type PropsType = {
  modelValue: boolean;
  product: ProductType | null;
}

const props = defineProps<PropsType>();
const emit = defineEmits(['update:modelValue', 'submit']);

const categoryStore = useCategoryStore();

const computedModelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const dialogForm = ref<ProductType>({
  model: '',
  releaseYear: '',
  category: '',
  price: '',
  createdAt: new Date(),
  isVisible: true,
  description: '',
  image: ''
})

function submit() {
  emit('submit', dialogForm.value);
}

watch(computedModelValue, (newValue) => {
  if (newValue) return;

  dialogForm.value = {
    model: '',
    releaseYear: '',
    category: '',
    price: '',
    createdAt: new Date(),
    isVisible: true,
    description: '',
    image: ''
  }
})

watch(() => props.product, (newValue) => {
  if (!newValue) return;

  dialogForm.value = JSON.parse(JSON.stringify(newValue));
})
</script>

<template>
  <el-dialog
      v-model="computedModelValue"
      align-center
  >
    <template #header>
      <h2>{{ props.product ? 'Редактирование продукта' : 'Создать новый продукт' }}</h2>
    </template>

    <el-form
        :model="dialogForm"
        label-position="top"
    >
      <el-form-item label="Модель">
        <el-input v-model="dialogForm.model"/>
      </el-form-item>
      <el-form-item label="Год релиза">
        <el-input v-model="dialogForm.releaseYear"/>
      </el-form-item>
      <el-form-item label="Категория">
        <el-select v-model="dialogForm.category">
          <el-option
              v-for="category in categoryStore.categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Рекомендуемая розничная цена">
        <el-input
            v-model="dialogForm.price"
            :formatter="(value) => `${value}`.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
            suffix-icon="sum"
        >
          <template #append>SUM</template>
        </el-input>
      </el-form-item>
      <el-form-item label="Описание">
        <el-input
            v-model="dialogForm.description"
            type="textarea"
            autosize
        />
      </el-form-item>
      <el-form-item label="Изображение">
        <el-input
            v-model="dialogForm.image"
            placeholder="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
        />
      </el-form-item>
      <img
          v-if="dialogForm.image"
          :src="dialogForm.image"
          alt=""
          height="200px"
      />
      <el-form-item label="Видимость">
        <el-switch v-model="dialogForm.isVisible"/>
      </el-form-item>

      <el-form-item>
        <el-button
            type="primary"
            @click="computedModelValue = false"
        >
          Отмена
        </el-button>
        <el-button
            type="success"
            @click="submit"
        >
          {{ props.product ? 'Сохранить' : 'Создать' }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>