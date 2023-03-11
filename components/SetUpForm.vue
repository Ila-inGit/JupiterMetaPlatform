<template>
            <form class="scene-form" @submit.prevent="onSubmitForm">
                <div class="parameters-box">
                    <label for="maxTimeForActivity" style="font-family: 'Inter', sans-serif; padding:10%;font-size: large;">Max Time for Activity (sec):</label>      
                    <input id="maxTimeForActivity" v-model.number="maxTimeForActivity" type="number" min=0>
                    <br><br>
                    <label for="numberTotalAttempts" style="font-family: 'Inter', sans-serif; padding:11%;font-size: large;">Number of Total Touches:</label>      
                    <input id="numberTotalAttempts" v-model.number="numberTotalAttempts" type="number" min=0 >
                    <br><br>
                    <label for="numberRightAttempts" style="font-family: 'Inter', sans-serif; padding:11%;font-size: large;">Number of Right Touches:</label>      
                    <input id="numberRightAttempts" v-model.number="numberRightAttempts" type="number" min=0 >
                    <br><br><br>
                    <label for="doTutorial" style="font-family: 'Inter', sans-serif; padding:10%;font-size: large;">Do you want to add the tutorial?</label>
                    <input id="doTutorial" v-model="doTutorial" type="checkbox"/>
                    <br><br><br>
                    <input class="button" style="margin-left: 26%;" type="submit" value="SUBMIT AND GENERATE QR"> 
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
        setScenes(scenes) {
            this.scenes= scenes;
        },
        onSubmitForm() {
            if (this.maxTimeForActivity === "" || this.numberRightAttempts === ""
                || this.numberTotalAttempts === "" ) { 
                alert("The form can not have empty fields");
                return;
            }else if(this.numberRightAttempts > this.numberTotalAttempts){
                alert("The number of right attempts must not be greater than the number of total attempts possible!");
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
        flex: auto;
        width:100%;
        margin-top: 1%;
    }

    input[type=submit]{
        width: fit-content;
        background-color: #f47971;
        color:black;
        padding:10px 10px;
   
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