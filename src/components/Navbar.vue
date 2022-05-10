<template>
  <div class="border-b lg:py-3">
      <div class="flex flex-col lg:flex-row justify-between">
          <div class="flex justify-between items-center border-b lg:border-b-0 py-4 lg:py-0 px-6 lg:pr-0">
              <router-link exact-active-class="bg-tranparent" class="font-semibold uppercase" to="/">
                Cashinout
              </router-link>

              <button @click="isOn = !isOn" class="block lg:hidden focus:outline-none">
                  <template v-if="isOn">
                    close
                  </template>
                  <template v-else>
                    open
                  </template>
              </button>
          </div>
          <div :class="isOn? 'block': 'hidden'" class="lg:flex flex-col lg:flex-row justify-between lg:items-center w-full px-6 py-4 lg:py-0">
            <div class="flex items-center">
                <router-link :class="className" to="/about">About</router-link>
                <router-link :class="className" to="/cashes">Cashes</router-link>
            </div>
            <div class="flex items-center" v-if="authenticated">
                <router-link :class="className" to="/login">{{user.name}}</router-link>
                <button @click="logout" :class="className" class="focus:outline-none" to="/register">Logout</button>
            </div>
            <div class="flex flex-col lg:flex-row lg:items-center" v-else>
                <router-link :class="className" to="/login">Login</router-link>
                <router-link :class="className" to="/register">Register</router-link>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import store from '@/store'

export default {
    setup() {
        const className = "px-4 py-2"
        const isOn = ref(false)

        const authenticated = computed(()=> store.getters['auth/authenticated'] )
        const user = computed(()=> store.getters['auth/user'] )

        const logout = async () => {
            store.dispatch('auth/logout')
        }
 
        return {
            className,
            isOn,
            authenticated, user,
            logout
        }
    }
}
</script>

<style>

</style>