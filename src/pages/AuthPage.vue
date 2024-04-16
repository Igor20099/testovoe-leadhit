<template>
   <div>
      <h1>LeadHit</h1>
      <FormComponent @handleAuth="handleAuth"/>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import axios from "axios";
import {useRouter} from 'vue-router'
import FormComponent from '../components/FormComponent.vue';
import { URL, API_KEY, SITE_ID } from '../utils/consts';

const router = useRouter()

const handleAuth = async (idInput) => {
  if (idInput.length === 24) {
    const data =  await fetchData()
    if (data.data.message === 'ok') {
      localStorage.setItem('leadhit-site-id', SITE_ID);
      router.push('/analytics')
    }
    // isError.value = false
  } else {
    // isError.value = true
  }
}

const fetchData = async () => {
 return await axios.get(URL
      ,
      {
        headers: {
          'Api-Key': API_KEY,
          'Leadhit-Site-Id': SITE_ID
        },
      }
    ).catch((err)=> console.log(err));

}

</script>


<style scoped>

</style>