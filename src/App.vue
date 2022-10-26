<template>
  <div>
    <div class="relative h-10 w-32 pb-1">
      <div class="absolute left-0 top-0 h-16 w-16 header-text text-[24px]">
        Products
      </div>
    </div>

    <div
      class="p-4 grid grid-rows gap-0 flex-col flex items-stretch min-w-screen bg-white rounded-[8px] box-border border-[1px]">
      <div
        class="content-start grid grid-flow-row-dense grid-cols-3 gap-2 py-2">
        <TextField
          class="col-span-2"
          placeholder="Find a product"
          v-model="query" />
        <CustomButton color="#375673">Search</CustomButton>
      </div>
      <div class="grid grid-flow-row-dense grid-cols-11 gap-2 py-2">
        <TextField
          class="col-span-7"
          placeholder="Product Name"
          v-model="product" />
        <CustomButton color="#377364" class="col-span-4" @click="addProduct()"
          >Add Product</CustomButton
        >
      </div>
      <!-- List -->
      <Product
        v-for="(item, index) in paginated"
        :key="index"
        :product="item" />
    </div>
    <!-- Footer -->
    <div class="content-start grid grid-flow-row-dense grid-cols-10 gap-2 py-2">
      <div class="col-span-2 py-2">
        Page <b>1</b> of <b>{{ pageCount }}</b>
      </div>

      <div class="grid grid-cols-6 col-span-6">
        <div class="col-span-2 text-right py-2 pr-2">Sort by</div>
        <div class="col-span-4">
          <Multiselect
            :canClear="false"
            v-model="sortId"
            valueProp="id"
            label="text"
            :options="sortByList">
          </Multiselect>
        </div>
      </div>
      <div class="sm:col-span-2">
        <Multiselect
          :canClear="false"
          v-model="perPage"
          :options="[10, 20, 50, 'All']">
        </Multiselect>
      </div>
    </div>
  </div>
</template>

<script setup>
import Multiselect from '@vueform/multiselect/dist/multiselect'

import { ref, computed, reactive } from 'vue'
import { format } from 'date-fns'
import TextField from './components/TextField.vue'
import CustomButton from './components/CustomButton.vue'
import Product from './components/Product.vue'

import { products } from './products'
import { orderBy, take, reverse, shuffle } from 'lodash'

const query = ref('')
const product = ref('')

const filteredProducts = computed(() =>
  query.value?.length > 0
    ? products.filter(x => x.name.match(query.value))
    : products,
)

const sortId = ref('index')
const sortByList = [
  { id: 'index', text: 'Sort Order Ascending' },
  { id: 'index-desc', desc: true, text: 'Sort Order Descending' },

  { id: 'date', text: 'Date Ascending' },
  { id: 'date-desc', desc: true, text: 'Date Descending' },

  { id: 'status', text: 'Status Ascending' },
  { id: 'status-desc', desc: true, text: 'Status Descending' },
]

const sortBy = computed(
  () => sortByList.find(x => x.id === sortId.value) ?? sortByList[0],
)

const sorted = computed(() => {
  if (sortBy.value.id.match(/index/)) {
    if (sortBy.value.desc) return reverse(filteredProducts.value)
    return filteredProducts.value
  }

  return orderBy(
    filteredProducts.value,
    sortBy.value.id.split('-')[0],
    sortBy.value.desc ? 'desc' : 'asc',
  )
})

const perPage = ref(10)
const paginated = computed(() =>
  perPage.value === 'All' ? sorted.value : take(sorted.value, perPage.value),
)

const pageCount = computed(() => {
  if (filteredProducts.value.length <= perPage.value) return 1
  const remainder = filteredProducts.value.length % perPage.value

  return (
    Math.trunc(filteredProducts.value.length / perPage.value) +
    (remainder > 0 ? 1 : 0)
  )
})

const addProduct = () => {
  console.log(product.value)
  products.push({
    name: product.value,
    image: shuffle(products)[0].image,
    status: shuffle(products).status,
    date: new Date().getTime(),
  })
  product.value = ''
}
</script>

<style scoped>
.header-text {
  font-family: 'Bitter';
}
</style>
<style src="@vueform/multiselect/themes/default.css"></style>
