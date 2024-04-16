<template>
  <form class="form">
        <label class="form__label" for="site-id">id сайта</label>
        <input  class="form__input"  type="text" name="site-id" v-model="idInput" @focus="isError = false" >
        <span v-show='isError' class="form__error" >id сайта должен содержать 24 символа</span>
        <button class="form__button" @click.prevent = "$emit('handleAuth',idInput)">Войти</button>
      </form>
</template>

<script setup>
import {ref} from 'vue'

const idInput = ref('')
const isError = ref(false)


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