<template>
   <div>
      <h1>LeadHead</h1>
      <FormComponent @handleAuth="handleAuth"/>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import axios from "axios";
import {useRouter} from 'vue-router'
import FormComponent from '../components/FormComponent.vue';

const router = useRouter()



const handleAuth = async (idInput) => {
  if (idInput.length === 24) {
    const data =  await fetchData()
    if (data.data.message === 'ok') {
      localStorage.setItem('leadhit-site-id', '5f8475902b0be670555f1bb3');
      router.push('/analytics')
    }
    // isError.value = false
  } else {
    // isError.value = true
  }
}

const fetchData = async () => {
 return await axios.get(
      "https://track-api.leadhit.io/client/test_auth",
      {
        headers: {
          'Api-Key': '5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
          'Leadhit-Site-Id': '5f8475902b0be670555f1bb3'
        },
      }
    ).catch((err)=> console.log(err));

}

</script>


<style scoped>

</style>