<template>
    <div v-if="qrValue" style="padding:5%">
        <!-- <VueQrcodeComponent :text="qrValue"></VueQrcodeComponent> -->
        <h1>If You Scanned the QR code</h1>
        <h2>Click the button below</h2>
        <NuxtLink to="/WaitActivity">Go to activity page</NuxtLink>
    </div>
</template>

<script>
// import VueQrcodeComponent from 'vue-qrcode-component'

export default {
    // components:{VueQrcodeComponent},
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
<style lang="">
</style>