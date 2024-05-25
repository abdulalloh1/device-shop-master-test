<script
    setup
    lang="ts"
>
import { ref, watch } from "vue";
import { toast } from "vue3-toastify";
import axios from "axios";
import { Check, Close } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import productApi from "@/api/product.api.ts";
import { parseLinkHeaderAndGetLastPage } from "@/utils/json-api-utils.ts";
import { useCategoryStore } from "@/store/category.store.ts";
import { ProductType } from "@/types/product.type.ts";
import ProductFilters from "@/components/Product/ProductFilters.vue";
import ProductDialog from "@/components/Product/ProductDialog.vue";

const categoryStore = useCategoryStore();

const products = ref<ProductType[]>([]);
const currentPage = ref<number>(1);
const totalPages = ref<number>(10);
const perPage = ref<number>(1);

const isDialogOpen = ref<boolean>(false);
const selectedProduct = ref<ProductType | null>(null);

async function getProducts(filters = {}) {
  const { data, headers } = await productApi.getProducts({
    _page: currentPage.value,
    _limit: perPage.value,
    ...filters
  })
  products.value = data;
  totalPages.value = parseLinkHeaderAndGetLastPage(headers.link);
}

async function deleteProduct(id: number) {
  ElMessageBox.confirm('Вы уверены, что хотите удалить этот продукт?', 'Подтверждение', {
    confirmButtonText: 'Да',
    cancelButtonText: 'Нет',
  })
      .then(async () => {
        try {
          await productApi.deleteProduct(id);
          toast.success('Продукт успешно удален');
          await getProducts();
        } catch (error) {
          toast.error(axios.isAxiosError(error) && error.response?.data);
        }
      })
}

function applyFilters(filters: any) {
  getProducts(filters)
}

function handlePageChange(page: number) {
  currentPage.value = page;
  getProducts();
}

function handlePerPageChange(number: number) {
  perPage.value = number;
  currentPage.value = 1;
  getProducts();
}

function updateProductHandler(product: ProductType) {
  selectedProduct.value = product;
  isDialogOpen.value = true;
}

async function submitForm(form: ProductType) {
  try {
    if (selectedProduct.value?.id) {
      await productApi.updateProduct(selectedProduct.value.id, form);
      toast.success('Продукт успешно обновлен');
    } else {
      await productApi.createProduct(form);
      toast.success('Продукт успешно создан');
    }
    isDialogOpen.value = false;
    await getProducts();
  } catch (error) {
    toast.error(axios.isAxiosError(error) ? error.response?.data : (error as Error).message);
  }
}

Promise.all([
  getProducts(),
  categoryStore.getCategories()
])

watch(isDialogOpen, (newValue) => {
  if (newValue) return;

  selectedProduct.value = null;
})
</script>

<template>
  <div class="products">

    <ProductFilters @filter="applyFilters"/>

    <el-button
        type="primary"
        class="products__create-btn"
        @click="isDialogOpen = true"
    >
      Создать новый продукт
    </el-button>

    <el-table
        :data="products"
        style="width: 100%"
    >
      <el-table-column
          type="index"
          label="№"
      />
      <el-table-column
          prop="image"
          label="Изображение"
      >
        <template #default="{ row }">
          <img
              :src="row.image"
              alt=""
              width="70px"
          />
        </template>
      </el-table-column>
      <el-table-column
          prop="model"
          label="Модель"
      />
      <el-table-column
          prop="releaseYear"
          label="Год релиза"
      />
      <el-table-column
          prop="category"
          label="Категория"
      >
        <template #default="{ row }">
          {{ categoryStore.getCategoryById(row.category)?.name }}
        </template>
      </el-table-column>
      <el-table-column
          prop="price"
          label="Рекомендуемая розничная цена"
      />
      <el-table-column
          prop="createdAt"
          label="Дата добавления"
      >
        <template #default="{ row }">
          {{ new Date(row.createdAt).toLocaleDateString() }}
        </template>
      </el-table-column>
      <el-table-column
          prop="visibility"
          label="Видимость"
      >
        <template #default="{ row }">
          <el-icon>
            <check v-if="row.isVisible"/>
            <close v-else/>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column label="Действия">
        <template #default="{ row }">
          <div>
            <el-button
                icon="edit"
                type="primary"
                @click="updateProductHandler(row)"
            />
            <el-button
                type="danger"
                icon="delete"
                @click="deleteProduct(row.id)"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        v-model:page-size="perPage"
        :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, sizes"
        :current-page="currentPage"
        :page-count="totalPages"
        @current-change="handlePageChange"
        @size-change="handlePerPageChange"
    />

    <ProductDialog
        v-model="isDialogOpen"
        :product="selectedProduct"
        @submit="submitForm"
    />
  </div>
</template>