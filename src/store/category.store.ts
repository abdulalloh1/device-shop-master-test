import { defineStore } from "pinia";
import categoryApi from "@/api/category.api";
import type { CategoryType } from "@/types/product.type.ts";

type StateType = {
    categories: CategoryType[];
}

export const useCategoryStore = defineStore('category', {
    state: (): StateType => ({
        categories: [],
    }),
    actions: {
        async getCategories() {
            const {data} = await categoryApi.getCategories();
            this.categories = data;
        }
    },
    getters: {
        getCategoryById: (state) => (id: number) => {
            return state.categories.find(category => category.id === id);
        }
    }
})