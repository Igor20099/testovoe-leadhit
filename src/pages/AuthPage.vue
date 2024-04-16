<template>
   <div>
      <h1>LeadHead</h1>
      <form class="form">
        <label class="form__label" for="site-id">id сайта</label>
        <input  class="form__input"  type="text" name="site-id" v-model="idInput" @focus="isError = false" >
        <span v-show='isError' class="form__error" >id сайта должен содержать 24 символа</span>
        <button class="form__button" @click.prevent = 'handleAuth'>Войти</button>
      </form>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import axios from "axios";
import {useRouter} from 'vue-router'
const router = useRouter()


const idInput = ref('')
const isError = ref(false)

const handleAuth = async () => {
  if (idInput.value.length === 24) {
    
    const data =  await fetchData()
    console.log(data.data)
    if (data.data.message === 'ok') {
      console.log('Вы вошли')
      localStorage.setItem('leadhit-site-id', '5f8475902b0be670555f1bb3');
      router.push('/analytics')
    }
    isError.value = false
  } else {
    isError.value = true
  }
}

const fetchData = async () => {
 return await axios.get(
      "https://track-api.leadhit.io/client/test_auth",
      {
        headers: {
          'Api-Key': '5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
          'Leadhit-Site-Id': idInput.value
        },
      }
    );

}

</script>


<style scoped>
.form {
  display: flex;
  flex-direction: column;
}

.form__input {
margin-bottom: 8px;
border: 1px solid #808080;
padding: 8px;
}

.form__input_error {
  outline-color: red;
}

.form__error {
  color: red;
  margin-bottom: 8px;
}

.form__button {
  background: #a1a0a0;
}

.form__label {
  align-self: flex-start;
  margin-bottom: 8px;
  font-weight: 700;
}
</style>