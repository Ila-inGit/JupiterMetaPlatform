<template>
    <div v-if="qrValue" style="padding:5%">
        <VueQrcodeComponent :text="qrValue"></VueQrcodeComponent>
    </div>
</template>

<script>
import VueQrcodeComponent from 'vue-qrcode-component'

export default {
    components:{VueQrcodeComponent},
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