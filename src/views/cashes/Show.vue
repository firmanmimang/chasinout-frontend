<template>
    <div class="container">
        <div class="w-full lg:w-1/2">
            <div class="border rounded-lg overflow-hidden">
                <div class="border-b bg-gray-50 p-4">
                    {{transaction.name}}
                </div>
                <div class="p-4">
                    <div class="mb-4">
                        <label class="uppercase text-gray-500 tracking-wide font-semibold text-xs">Amount</label>
                        <div class="font-semibold">
                            Rp {{transaction.amount}}
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="uppercase text-gray-500 tracking-wide font-semibold text-xs">Stored</label>
                        <div class="leading-relaxed text-gray-800">
                            {{transaction.when}}
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="uppercase text-gray-500 tracking-wide font-semibold text-xs">Description</label>
                        <div class="leading-relaxed text-gray-800">
                            {{transaction.description}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {useRoute} from 'vue-router'
import { onMounted, ref } from '@vue/runtime-core'
import router from '@/router'

export default {
    setup() {
        const route = useRoute()
        let slug = route.params.slugCash

        const transaction = ref([])

        const getTransaction = async () => {
            try {
                let {data} = await axios.get(`api/cash/${slug}`)
                transaction.value = data.data
            } catch (e) {
                router.replace('/cashes')
            }
        }

        onMounted(()=>{
            getTransaction()
        })

        return{
            transaction,
        }
    }
}
</script>