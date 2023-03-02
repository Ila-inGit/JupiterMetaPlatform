<template >
            <form class="scene-form" @submit.prevent="onSubmitForm">
                <div class="parameters-box">
                    <label for="maxTimeForActivity" style="font-family: 'Inter', sans-serif; padding:70px;font-size: large;">Max Time for Activity:</label>      
                    <input id="maxTimeForActivity" v-model.number="maxTimeForActivity" type="number" min=0>
                    <br><br>
                    <label for="numberTotalAttempts" style="font-family: 'Inter', sans-serif; padding:50px;font-size: large;">Number of Total Attempts:</label>      
                    <input id="numberTotalAttempts" v-model.number="numberTotalAttempts" type="number" min=0 >
                    <br><br>
                    <label for="numberRightAttempts" style="font-family: 'Inter', sans-serif; padding:49px;font-size: large;">Number of Right Attempts:</label>      
                    <input id="numberRightAttempts" v-model.number="numberRightAttempts" type="number" min=0 >
                    <br><br><br>
                    <label for="doTutorial" style="font-family: 'Inter', sans-serif; padding: 50px;font-size: large;">Do you want to add the tutorial?</label>
                    <input id="doTutorial" v-model="doTutorial" type="checkbox"/>
                    <br><br><br>
                    <input class="button" type="submit" value="SUBMIT AND GENERATE QR"> 
            </div>
        </form>   
</template>

<script>

export default {
    data() {
        return {
            patientID: "",
            maxTimeForActivity: "",
            numberTotalAttempts: "",
            numberRightAttempts: "",
            doTutorial: false,
            scenes: [],
        };
    },
    methods: {
        addScene(scene) {
            this.scenes.push(scene);
        },
        onSubmitForm() {
            if (this.maxTimeForActivity === "" || this.numberRightAttempts === ""
                || this.numberTotalAttempts === "" ) { 
                alert("The form can not have empty fields");
                return;
            }
            const form = {
                patientID: this.patientID,
                maxTimeForActivity: this.maxTimeForActivity,
                numberTotalAttempts: this.numberTotalAttempts,
                numberRightAttempts: this.numberRightAttempts,
                doTutorial: this.doTutorial,
                scenes: this.scenes,
            };
            this.$emit("form-submitted", form);
            this.name = "";
            this.music = "";
            this.difficulty = "";
            this.rhythm = "";
            this.doTutorial = false;
            this.scenes = [];
        }
    },
}
</script>
<style lang="css">
    @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
    
    .parameters-box {
        width: 700px;
        height: 500px;
        align-content: center;
        border: black;
        margin-left: 25px;
        margin-top: 10px;
    }

    input[type=submit]{
        width: 35%;
        background-color: #f47971;
        color:black;
        padding:10px 10px;
        margin:0px 100px;
        border-radius: 45px;
        cursor: pointer;
        font-family:'Inter', sans-serif; /*'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif*/
        font-size: 16px;
        font-weight: bolder;
    }
    input[type=submit]:hover{
        background-color: #f05348;
    }
    input[type=number], select{
        width: 30%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
    input[type=checkbox]{
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        scale:150%;
    }
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