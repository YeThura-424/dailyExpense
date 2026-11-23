<template>
  <NuxtLink v-for="transaction in transactions" :key="transaction.id" :to="`/${transaction.type}/${transaction.id}`" class="transaction-row">
    <span :class="['transaction-row-icon', transaction.type === 'expense' ? 'is-expense' : 'is-income']"><Icon :name="transaction.type === 'expense' ? 'ion:arrow-up-outline' : 'ion:arrow-down-outline'" /></span>
    <span class="transaction-row-info"><strong>{{ transaction.categories?.name || transaction.category?.name || transaction.type }}</strong><span>{{ transaction.description }}</span></span>
    <span class="transaction-row-wallet">{{ transaction.wallet?.name }}</span>
    <span :class="['transaction-row-amount', transaction.type === 'expense' ? 'text-[#FD3C4A]' : 'text-[#00A86B]']"><strong>{{ transaction.type === 'expense' ? '−' : '+' }} {{ formatAmount(transaction.amount) }}</strong><small>{{ transaction.wallet?.name }}</small></span>
    <Icon name="ion:chevron-forward" class="transaction-row-chevron" />
  </NuxtLink>
</template>
<script setup>
defineProps({ transactions: { type: Array, required: true } });
</script>
