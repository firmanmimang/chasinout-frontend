<template>
  <div class="container">
      <div class="w-full lg:w-1/3">
        <div class="border rounded-lg overflow-hidden">
            <div class="bg-gray-50 py-4 px-4 border-b border-gray-200">
                Login
            </div>
            <div class="p-4">
                <form @submit.prevent="login">
                    <div class="mb-5">
                        <label for="email" class="text-xs uppercase font-medium block mb-2">
                            Email
                        </label>
                        <input v-model="credential.email" type="email" name="email" id="email" class="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-400 h-10 px-4 transition duration-150">
                        <template v-if="errors['email']">
                            <div class="text-red-500 mt-2 text-sm">
                                {{ errors['email'][0] }}
                            </div>
                        </template>
                    </div>
                    <div class="mb-5">
                        <label for="password" class="text-xs uppercase font-medium block mb-2">
                            Password
                        </label>
                        <input v-model="credential.password" type="password" name="password" id="password" class="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-400 h-10 px-4 transition duration-150">
                        <template v-if="errors['password']">
                            <div class="text-red-500 mt-2 text-sm">
                                {{ errors['password'][0] }}
                            </div>
                        </template>
                    </div>
                    <button class="px-4 h-10 rounded-lg focus:ring focus:ring-blue-300 bg-blue-500 hover:bg-blue-600 text-white">Login</button>
                </form>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { reactive, ref } from '@vue/reactivity'

export default {
    setup() {
        const errors = ref([])

        const credential = reactive({
            email:'',
            password:'',
        })

        const login = async () => {
            try{
                await store.dispatch("auth/login", credential)
                router.replace("/")
            } catch(e){
                 errors.value = e.response.data.errors
            }
        }

        return { login, credential, errors }
    }
}
</script>

<style>

</style>