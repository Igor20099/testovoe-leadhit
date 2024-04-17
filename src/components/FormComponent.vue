<template>
  <form class="form">
    <label class="form__label" for="site-id">id сайта</label>
    <input
      class="form__input"
      type="text"
      name="site-id"
      v-model="inputId"
      @focus="$store.commit('showError', false)"
    />
    <span v-show="$store.state.isError" class="form__error"
      >id сайта должен содержать 24 символа</span
    >
    <button
      class="form__button"
      @click.prevent="$store.dispatch('handleAuth', inputId)"
    >
      Войти
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const inputId = ref("");
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 320px;
}

.form__input {
  margin-bottom: 16px;
  border: 1px solid #808080;
  padding: 8px;
  background-color: #fff;
  color: #000;
}

.form__input_error {
  outline-color: red;
}

.form__error {
  color: red;
  margin-bottom: 8px;
}

.form__button {
  background: #9500fc;
}

.form__label {
  align-self: flex-start;
  margin-bottom: 8px;
  font-weight: 700;
}
</style>
