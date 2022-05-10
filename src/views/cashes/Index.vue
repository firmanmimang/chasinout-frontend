<template>
    <div class="container">
        <div class="block lg:flex justify-between">
            <div class="w-full lg:w-8/12 mr-6">
                <div class="w-full mb-8">
                    <div class="bg-gray-200 transform -rotate-2 rounded-2xl">
                        <div class="bg-gradient-to-br from-blue-500 to-light-blue-400 text-white transform rotate-2 rounded-2xl p-6">
                            <label class="block mb-1 uppercase text-xs text-blue-100 font-semibold tracking-wider">Balance</label>
                            <div class="text-3xl font-semibold">
                                Rp {{state.balances}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center -mx-2">
                    <div class="w-full px-2">
                        <div class="bg-gray-200 transform -rotate-3 rounded-2xl">
                            <div class="bg-gradient-to-br from-green-500 to-purple-500 text-white transform rotate-3 rounded-2xl p-6">
                                <label class="block mb-1 uppercase text-xs text-teal-100 font-semibold tracking-wider">Debit</label>
                                <div class="lg:text-3xl font-semibold">
                                    Rp {{state.debit}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full px-2">
                        <div class="bg-gray-200 transform -rotate-3 rounded-2xl">
                            <div class="bg-red-500 bg-gradient-to-br from-red-500 to-yellow-400 text-white transform rotate-3 rounded-2xl p-6">
                                <label class="block mb-1 uppercase text-xs text-red-100 font-semibold tracking-wider">Credit</label>
                                <div class="lg:text-3xl font-semibold">
                                    Rp {{state.credit}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="my-10">
                    <div class="border rounded-lg overflow-hidden">
                        <div class="border-b px-6 py-4 bg-gray-50 block lg:flex items-center justify-between">
                            <div class="mb-1 lg:mb-0">
                                Transactions
                            </div>
                            <form @submit.prevent="filterCashes" class="block lg:flex items-center">
                                <input type="date" v-model="form.begin" class="w-full bg-white rounded px-3 py-2 border mr-2">
                                <input type="date" v-model="form.to" class="w-full bg-white rounded px-3 py-2 border mr-2">
                                <div class="flex lg:inline flex-row-reverse w-full lg:w-11 mt-1 lg:mt-0">
                                    <input type="submit" class="px-3 py-2 rounded bg-gradient-to-br from-blue-500 to-blue-700 text-white cursor-pointer" value="Go">
                                </div>
                            </form>
                        </div>
                        <div class="max-h-112 overflow-y-auto">
                            <template v-for="transaction in state.transactions" :key="transaction.id">
                                <router-link :to="{name: 'cashes.show', params: {slugCash: transaction.slug}}" href="#" class="px-6 py-4 flex justify-between items-center hover:bg-gray-50 border-b">
                                    <span class="flex flex-col">
                                        <span class="text-gray-500 text-xs">{{transaction.when}}</span>
                                        <span>{{transaction.name}}</span>
                                    </span>
                                    <span :class="transaction.isCredit? 'text-red-500' : 'text-green-500'">{{transaction.amount}}</span>
                                </router-link>
                            </template>
                        </div>

                    </div>
                </div>
            </div>
            <div class="w-full lg:w-4/12 lg:ml-4">
                <h1 class="font-semibold text-lg text-gray-800 mb-5">
                    Add Transaction History
                </h1>
                <form @submit.prevent="add">
                    <div class="mb-5">
                        <label for="name" class="text-xs uppercase font-medium block mb-2">Name</label>
                        <input v-model="form.name" type="text" name="name" id="name" autofocus class="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-400 h-9 px-4 transition duration-200">
                        <template v-if="errors['name']">
                            <div class="text-red-500 mt-2 text-sm">
                                {{ errors['name'][0] }}
                            </div>
                        </template>
                    </div>
                    <div class="mb-5">
                        <label for="amount" class="text-xs uppercase font-medium block mb-2">Amount</label>
                        <input v-model="form.amount" type="text" name="amount" id="amount" autofocus class="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-400 h-9 px-4 transition duration-200">
                        <template v-if="errors['amount']">
                            <div class="text-red-500 mt-2 text-sm">
                                {{ errors['amount'][0] }}
                            </div>
                        </template>
                    </div>
                    <div class="mb-5">
                        <label for="when" class="text-xs uppercase font-medium block mb-2">When</label>
                        <input v-model="form.when" type="datetime-local" name="when" id="when" autofocus class="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-400 h-9 px-4 transition duration-200">
                    </div>
                    <div class="mb-5">
                        <label for="description" class="text-xs uppercase font-medium block mb-2">Description</label>
                        <textarea v-model="form.description" type="text" name="description" id="description" autofocus class="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-400 py-4 px-4 transition duration-200">
                        </textarea>
                    </div>
                    <button class="px-4 h-9 rounded-lg focus:ring focus:ring-blue-300 bg-blue-500 hover:bg-blue-600 text-white">Save</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { ref, reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
    setup() {
        const errors = ref([])

        const state = ref([])

        const form = reactive({
            begin: '',
            to: '',

            name: '',
            amount: '',
            when: '',
            description: '',
        })

        const getCashes  = async () => {
            let {data} = await axios.get('api/cash');
            state.value = data
            form.begin = data.firstOfMonth
            form.to = data.now
        }

        const filterCashes = async () => {
            let {data} = await axios.get('api/cash', {
                params: {
                    from: form.begin,
                    to: form.to,
                }
            });
            state.value = data
        }

        const add = async () =>{
            try {
                let response = await axios.post('api/cash/create', form)
                // SUPAYA MASUK TERATAS UNSHIFT
                state.value.transactions.unshift(response.data.cash)

                let {data} = await axios.get('api/cash');
                state.value = data
                form.name = ''
                form.amount = ''
                form.when = ''
                form.description = ''
            } catch (e) {
                errors.value = e.response.data.errors
            }
            
        }

        onMounted(()=>{
            getCashes()
        })

        return{
            state, form, getCashes, add, filterCashes, errors
        }
    }
}
</script>

<style>

</style>