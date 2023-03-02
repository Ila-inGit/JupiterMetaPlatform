<template>
    <div v-if="qrValue">
        <div class="row">
            <div class="column">
                <client-only>
                    <vue-qrcode-component :text="qrValue"></vue-qrcode-component>
                </client-only> 
            </div>
            <div class="column">
                <div style="align-content:center;text-align:center">
                    <div v-if="!scanned">
                        <h1 style="padding:2%;font-family: 'Inter', sans-serif;font-weight: bold; font-size: large;">If you have scanned the QR code</h1>
                        <h2 style="padding:2%;font-family: 'Inter', sans-serif;font-size: large;">Click the button below</h2>
                        <input class="button" type="submit" value="✓ Done" @click="qrScanned">
                    </div>
                </div>
                <div v-if="scanned">
                    <WaitActivity :session-token="token"></WaitActivity>
                </div>
            </div>
        </div>
        </div>
</template>

<script>
import WaitActivity from "~/components/WaitActivity.vue"

export default {
    components:{WaitActivity},
    props:{
        sessionToken:{type:String,default:''}
    },
    data(){
        return{
            qrValue: null,
            token: this.sessionToken,
            scanned: false
        }
    },
    methods: {
        updateQr(form) {
            // console.log("the update QR" + form)
            this.qrValue = form;
        },
        qrScanned(){
            this.scanned = true;
        }
    },
}
</script>
<style lang="css">
    *{
        box-sizing: border-box;
    }
    .column{
        float:left;
        width: 50%;
        padding: 10px;
    }
    .row::after{
        content: "";
        display: table;
        clear: both;
    }
  
</style>