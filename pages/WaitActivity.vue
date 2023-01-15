<template>
    <div style="align-content:center;text-align:center">
        <h1 class="text-xl mt-5" style="font-weight:bold; padding:14px; font-size: xx-large;">Wait for the activity to end</h1>
        <h2 class="text-xl mt-5" style="font-weight:bold; padding:14px; font-size: x-large;">Hololens will send you a file at the end of the activity</h2>
        <div v-if="isLoaded">
            <h1 style="padding:14px;">Wait.....</h1>
        </div>
        <div v-else >
            <h1 style="padding:14px;">Wait....</h1>
            <!-- <VueJsonCsv class="button btn-default" :data="json_data" name="DATATORETRIVE.csv">Download file csv</VueJsonCsv> -->
        </div>

    </div>
</template>

<script>
// import {VueJsonCsv} from 'vue-json-csv'

export default {
    name: "WaitActivityPage",
    // components:{VueJsonCsv},
    data(){
        return{
            json_data: [
                {
                    name: "Data to retrive",
                    data: 'bleash'
                }
            ],
            isLoaded: false,
        }
    },
    methods:{
        setDataJson(data){
            this.json_data = data
        }
    },
}
</script>