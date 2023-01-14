<template >
    <div class="row">
        <div class="column" style="float:left;width: 50%;padding: 10px;" >
            <form class="scene-form" @submit.prevent="onSubmitForm">
                <label for="maxTimeForActivity" style="padding:2%;font-size: large;">Max Time for Activity:</label>      
                <input id="maxTimeForActivity" v-model.number="maxTimeForActivity" type="number" min=0>
                <br><br>
                <label for="numberTotalAttempts" style="padding:2%;font-size: large;">Number of Total Attempts:</label>      
                <input id="numberTotalAttempts" v-model.number="numberTotalAttempts" type="number" min=0 >
                <br><br>
                <label for="numberRightAttempts" style="padding:2%;font-size: large;">Number of Right Attempts:</label>      
                <input id="numberRightAttempts" v-model.number="numberRightAttempts" type="number" min=0 >
                <br><br><br>
                <label for="doTutorial" style="padding:2%;font-size: large;">Do tutorial</label>
                <input id="doTutorial" v-model="doTutorial" type="checkbox"/>
                <br>
                
                <br><br><br>
                <input class="button" type="submit" value="Submit and generate QR"> 
            </form>
        </div>
        
        <div id="column" class="column" style="float:left;width: 50%;padding: 10px;">
            <div>
                <div class="scene-container">
                    <SceneForm @scene-submitted="addScene"></SceneForm>
                    <SceneList v-if="scenes.length" :scenes="scenes"></SceneList>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SceneForm from '~/components/SceneForm.vue';
import SceneList from '~/components/SceneList.vue'
export default {
    components: {SceneForm, SceneList},
    data() {
        return {
            patientID: "",
            maxTimeForActivity: "",
            numberTotalAttempts: "",
            numberRightAttempts: "",
            doTutorial: false,
            scenes: []
        };
    },
    methods: {
        addScene(scene) {
            this.scenes.push(scene);
        },
        onSubmitForm() {
            if (this.maxTimeForActivity === "" || this.numberRightAttempts === ""
                || this.numberTotalAttempts === "" || this.scenes.length === 0) {
                alert("The form can not have empty fields");
                return;
            }
            const form = {
                patientID: this.patientID,
                maxTimeForActivity: this.maxTimeForActivity,
                numberTotalAttempts: this.numberTotalAttempts,
                numberRightAttempts: this.numberRightAttempts,
                doTutorial: this.doTutorial,
                scenes: this.scenes
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