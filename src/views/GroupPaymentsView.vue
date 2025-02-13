<template>
  <div class="mx-3">
    <div class="card w-full text-center mb-4">
      <h2 class="text-3xl font-bold">Pagos Grupales</h2>
    </div>
    <DataTableGroupPayments/>
  </div>
</template>

<script setup>
import DataTableGroupPayments from "@/components/payments/DataTableGroupPayments.vue";
</script>