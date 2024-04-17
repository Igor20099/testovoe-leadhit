<template>
  <h1>Аналитика</h1>
  <h2>Аналитика во визитам</h2>
  <ChartComponent :data="dataVisits" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { data } from "../utils/data";
import ChartComponent from "../components/ChartComponent.vue";

const router = useRouter();

const dataVisits = ref([]);
dataVisits.value = data;
onMounted(() => {
  if (!localStorage.getItem("leadhit-site-id")) {
    router.push("/");
  }
});
</script>
