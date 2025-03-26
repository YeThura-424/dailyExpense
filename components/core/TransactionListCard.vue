<template>
  <div v-for="transaction in transactions" :key="transaction.id">
    <nuxt-link :to="`/${transaction.type}/${transaction.id}`"
      class="flex justify-between items-center bg-[#FCFCFC] p-4 rounded-lg mt-2">
      <div class="transaction_type w-3/4 flex gap-x-4">
        <div :class="[
          'transaction_list_icon w-14 h-14 flex justify-center items-center rounded-xl',
          transaction.type == 'expense' ? 'bg-[#FDD5D7]' : 'bg-[#CFFAEA] ',
        ]">
          <img v-if="transaction?.category?.icon" :src="transaction.category.icon" class="w-full h-full rounded-xl" />
          <div v-else class="default-icon">
            <IconHomeExpense v-if="transaction.type == 'expense'" fill="#FDD5D7" />
            <IconHomeIncome v-else fill="#CFFAEA" />
          </div>
        </div>
        <div class="transaction_list_desctiption w-3/4">
          <h1 class="font-semibold text-lg text-[#292B2D] line-clamp-1">
            {{ transaction?.categories?.name }}
          </h1>
          <span class="text-sm text-[#91919F] line-clamp-1">{{
            transaction?.description
          }}</span>
        </div>
      </div>
      <div class="transaction_list_amount w-1/4 text-right">
        <span class="text-sm text-[#91919F] truncate">{{
          transaction.wallet.name
        }}</span>
        <h1 v-if="transaction.type == 'expense'" class="font-semibold text-lg text-[#FD3C4A] truncate">
          {{ getCurrency() }}-{{ transaction.amount }}
        </h1>
        <h1 v-else class="font-semibold text-lg text-[#00A86B] truncate">
          {{ getCurrency() }}+{{ transaction.amount }}
        </h1>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup>
const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});
</script>
