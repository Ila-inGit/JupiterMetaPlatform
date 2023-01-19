<template>
    <div style="align-content:center;text-align:center">
        <h1 class="text-xl mt-5" style="font-weight:bold; padding:14px; font-size: xx-large;">Wait for the activity to end</h1>
        <div v-if="isLoaded && submitted">
            <h1 style="padding:14px;">DOWNLOAD THE FILE</h1>
            <input class="button" type="submit" value="Download File" @click="downloadFile">
        </div>
        <div v-if="!isLoaded && submitted" >
            <h1 style="padding:14px;">THE SESSION IS NOT DONE, WAIT FOR THE FILE TO BE SENT</h1>
        </div>
        <div v-if="!isLoaded">
            <input class="button" type="submit" value="Request File" @click="requestFile">
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {BASEURL, REQUESTFILE} from '~/constants/constants.js'


export default {
    name: "WaitActivityPage",
    props:{
        sessionToken:{type:String,default:''}
    },
    data(){
        return{
            json_data: '',
            isLoaded: false,
            submitted: false,
        }
    },
    methods:{
        setDataJson(data){
            this.json_data = data
        },
        async requestFile(){
            try {
                const response = await axios.get(BASEURL+REQUESTFILE, { params:{ sessionToken: this.sessionToken}})
                this.json_data = response.data
                this.isLoaded = true
            }
            catch (e) {
                console.log(e)
            }
            this.submitted = true;                
        },
        downloadFile(){
            const csv = 'Put,Data,Of,File\n'
            const anchor = document.createElement('a')
            anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
            anchor.target = '_blank'
            anchor.download = 'dataOfSession.csv'
            anchor.click()
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