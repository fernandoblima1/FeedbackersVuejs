<template>
  <div>

    <div class="flex justify-between">
      <h1 class="text-4xl text-gray-800 font-black">
        Crie uma conta
      </h1>
      <button @click="close" class="text-4xl text-gray-600 focus:ouline-none">
        &times;
      </button>
    </div>
    <div class="mt-16">
      <form @submit.prevent="handleSubmit">
        <label class="block">
          <span class="text-lg font-medium text-gray-800">Nome</span>
          <input type="text" 
          :class="{'border-brand-danger':!!state.name.errorMessage}"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded" 
          placeholder="Insira seu nome"
          v-model="state.name.value">
          <span class="block font-medium text-brand-danger mt-1"
          v-if="!!state.name.errorMessage"> 
            {{ state.name.errorMessage }}
          </span>
        </label>

        <label class="block mt-4">
          <span class="text-lg font-medium text-gray-800">E-mail</span>
          <input type="email" 
          :class="{'border-brand-danger':!!state.email.errorMessage}"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded" 
          placeholder="Insira seu e-mail"
          v-model="state.email.value">
          <span class="block font-medium text-brand-danger mt-1"
          v-if="!!state.email.errorMessage"> 
            {{ state.email.errorMessage }}
          </span>
        </label>

        <label class="block mt-4">
          <span class="text-lg font-medium text-gray-800">Senha</span>
          <input type="password" 
          :class="{'border-brand-danger':!!state.password.errorMessage}"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded" 
          placeholder="Insira sua senha"
          v-model="state.password.value">
          <span class="block font-medium text-brand-danger mt-1"
          v-if="!!state.password.errorMessage"> 
            {{ state.password.errorMessage }}
          </span>
        </label>

        <button :disabled="state.isLoading"
        class="bg-brand-main text-white px-8 py-3 text-2xl mt-10 font-bold rounded-full transition-all duration-150"
        :class="{'opacity-50':state.isLoading}">
        <Icon v-if="state.isLoading" name="loading" class="animate-spin"/>
        <span v-else>Criar conta</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import useModal from '../../hooks/useModal'
import { useField } from 'vee-validate'
import { useRouter } from 'vue-router'
import Icon from '../Icon/index.vue'
import { useToast } from 'vue-toastification'
import {validateEmptyAndLength3, validateEmptyAndEmail} from '../../utils/validators'
import services from '../../services/index'
export default {
  components: {
    Icon
  },
  setup(){
    const router = useRouter()
    const modal = useModal()
    const toast = useToast()


    const {
        value: nameValue, 
        errorMessage: nameErrorMessage
    } = useField('name', validateEmptyAndLength3)

    const {
        value: emailValue, 
        errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)

    const {
        value: passwordValue, 
        errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      name:{
        value: nameValue,
        errorMessage: nameErrorMessage
      },
      email:{
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    },)

    async function login ({ email, password }) {
      const { data, errors } = await services.auth.login({ email, password })
      if (!errors) {
        window.localStorage.setItem('token', data.token)
        router.push({ name: 'feedbacks' })
        modal.close()
      }
      state.isLoading = false
    }

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })
        if (!errors) {
          await login({
            email: state.email.value,
            password: state.password.value
          })
          return
        }
        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao criar a conta')
        }
        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Ocorreu um erro ao criar a conta')
      }
    }
    
    return{
      close: modal.close,
      state,
      handleSubmit,
    }
  }
}
</script>
