<template>
  <h1>Аналитика</h1>
  <h2>Аналитика во визитам</h2>
  <ChartComponent :data="data"/>
</template>

<script setup>
import {onMounted, ref, shallowRef} from 'vue'
import {useRouter} from 'vue-router'
import { data } from '../utils/data';
import ChartComponent from '../components/ChartComponent.vue';

const router = useRouter()

onMounted(() => {
    if (!localStorage.getItem('leadhit-site-id')) {
   router.push('/')
}

})
</script>

<style scoped>
</style>