<template>
    <div style="align-content:center;text-align:center">
        <h1 style="font-family: 'Inter', sans-serif; font-weight:bold; padding:14px; font-size: large;">Wait for the activity to end</h1>
        <div v-if="isLoaded && submitted">
            <h1 style="padding:14px;">DOWNLOAD THE FILE</h1>
            <input class="button" type="download" value="⭳ Download File" @click="downloadFile">
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
            body_data: '',
            isLoaded: false,
            submitted: false,
        }
    },
    methods:{
        async requestFile(){
            try {
                const response = await axios.get(BASEURL+REQUESTFILE, { params:{ sessionToken: this.sessionToken}})
                this.body_data = response.data
                this.isLoaded = true
            }
            catch (e) {
                alert("There was an error in the network")
            }
            this.submitted = true;                
        },
        downloadFile(){
            
            const csv = this.body_data.body
            if(csv){
                const anchor = document.createElement('a')
                anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
                anchor.target = '_blank'
                anchor.download = 'dataOfSession.csv'
                anchor.click()
            }else{
                alert('Error downloading file')
            }
        }
    },
}
</script>
<style lang="css">
    input[type=download]{
        width: 40%;
        background-color: white;
        color:#f47971;
        padding:14px 20px;
        margin:6px 0;
        border: black;
        border-radius: 4px;
        cursor: pointer;
        font-size: 40px;
        text-align: center;
    }
    input[type=download]:hover{
        background-color: rgb(222, 221, 221);
    }
</style>