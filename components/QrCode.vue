<template>
    <div v-if="qrValue" style="padding:5%">
        <div class="row">
            <div class="column">
                <client-only>
                    <vue-qrcode-component :text="qrValue"></vue-qrcode-component>
                </client-only> 
            </div>
            <div class="column">
                <h1 style="padding:2%;font-size: large;">If You Scanned the QR code</h1>
                <h2 style="padding:2%;font-size: large;">Click the button below</h2>
                <NuxtLink to="/WaitActivity" style="padding:2%;font-size: large; font-weight: bold;">Go to activity page</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            qrValue: null,
        }
    },
    
    methods: {
        updateQr(form) {
            // console.log("the update QR" + form)
            this.qrValue = form
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