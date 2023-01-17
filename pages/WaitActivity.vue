<template>
    <div style="align-content:center;text-align:center">
        <h1 class="text-xl mt-5" style="font-weight:bold; padding:14px; font-size: xx-large;">Wait for the activity to end</h1>
        <h2 class="text-xl mt-5" style="font-weight:bold; padding:14px; font-size: x-large;">Hololens will send you a file at the end of the activity</h2>
        <input class="button" type="submit" value="Request File" @click="requestFile">
        <div v-if="isLoaded && submitted">
            <h1 style="padding:14px;">DOWNLOAD THE FILE</h1>
        </div>
        <div v-if="!isLoaded && submitted" >
            <h1 style="padding:14px;">THE SESSION IS NOT DONE, WAIT FOR THE FILE TO BE SENT</h1>
            <!-- <VueJsonCsv class="btn btn-default" :data="json_data" name="DATATORETRIVE.csv">Download file csv</VueJsonCsv> -->
        </div>

    </div>
</template>

<script>
// import {VueJsonCsv} from 'vue-json-csv'
// import http from 'http'
import axios from 'axios'
import {BASEURL, REQUESTFILE} from '~/constants/constants.js'


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
            submitted: false,
        }
    },
    methods:{
        setDataJson(data){
            this.json_data = data
        },
        async requestFile(){
            if(this.submitted == false){
                try {
                    const body = await axios.get(BASEURL+REQUESTFILE)
                    console.log(body)
                }
                catch (e) {
                    console.log(e)
                }
                finally {
                    this.submitted = true
                }
            }
        }
    },
}
</script>
<style lang="css">
    input[type=submit]{
        width: 40%;
        background-color: #4CAF50;
        color:white;
        padding:14px 20px;
        margin:8px 0;
        border:none;
        border-radius: 4px;
        cursor: pointer;
    }
    input[type=submit]:hover{
        background-color: #45A049;
    }
</style>