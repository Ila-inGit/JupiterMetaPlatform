<template>
  <div v-if="isLoaded">
    <!-- <div class="card text-center">
      <div class="rounded w-max mx-auto bg-green-500 border-green p-5">
        The application is currently running on
        <span class="rounded bg-green-200 p-1"> {{ url }}</span>
      </div>
    </div> -->
    <div v-if="selectedUser">
        <header>
            <div class="header-box">
                <img class="logo" src="@/assets/LogoJupiter.png">
                <div v-show="!nextPage" class="flex-container">
                    <input class="button" type="next" value="→" @click="goToNextPage">
                </div>
                <!--div v-show="nextPage" class="flex-container">
                    <input button class="button" type="back" value="←" @click="goToPreviousPage">
                </div-->
            </div>
        </header>
        <div v-show="nextPage">
            <div>
                <h1 class="title">SELECT OPTIONS AND GENERATE QR CODE</h1>
                    <div id="column" class="column" style="float:left;width: 50%;padding: 10px;">
                        <SetUpForm ref="setupform" @form-submitted ="submitForm" ></SetUpForm>
                    </div>
                    <div id="column" class="column" style="float:right;width: 50%;padding: 10px;">
                        <div class="qr-box">
                            <QrCode ref="child" :session-token="sessionId"></QrCode>
                        </div>
                    </div>
            </div>
        </div>
                
        <div v-show = "!nextPage">
            <h1 class="title">CHOOSE ACTIVITY DETAILS</h1>
                <div id="column" class="column" style="float:left;width: 50%; padding: 10px;">
                    <div class="scene-container">
                        <SceneForm @scene-submitted="addScene"></SceneForm>
                    </div> 
                </div>
                <div id="column" class="column" style="float:left; width: 50%; padding: 10px;">
                    <div class="scene-list-box">
                        <SceneList v-if="scenes.length" :scenes="scenes"></SceneList>
                    </div>
                </div>
        </div> 
   
   
        <!-- <div class="mx-auto rounded w-max border-2 border-black px-6 py-4 mt-5">
            <p class="font-bold">User data</p>
            <p>Name: {{ selectedUser.name }}</p>
            <p>Surname: {{ selectedUser.surname }}</p>
        </div> -->
      <!-- <img class="mx-auto" height="50" :src="qrcode" alt="" /> -->
     
      
    </div>
    <div v-else class="card text-center mt-5">
      <div class="rounded w-max mx-auto bg-red-500 border-green p-5">
        If you see this, you need to open the application from i3hub
        <a class="bg-red-200 p-1 rounded" href="https://hub.i3lab.group"
          >https://hub.i3lab.group</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import QrCode from '~/components/QrCode.vue'
import SetUpForm from '~/components/SetUpForm.vue'
import SceneForm from '~/components/SceneForm.vue'
import i3hubMixin from '~/mixins/i3hub.mixin'
export default {
    name: "IndexPage",
    components: {SceneForm,QrCode,SetUpForm},
    mixins: [i3hubMixin],
    data() {
        return {
            isLoaded: false,
            selectedUser: null,
            sessionId: "",
            url: "",
            form: "",
            nextPage: false,
            scenesNames: {
                type: Array,
            },
            scenesDifficulty: {
                type: Array,
            },
            scenes: [],
        };
    },
    async mounted() {
        this.url = window.location.href;
        try {
            this.parsePayload();
            this.selectedUser = this.currentSubjects[0];
            this.sessionId = (await axios.post("/api/session")).data;
            // console.log(this.selectedUser);
            // const qrPayload = {
            //     sessionId: this.sessionId,
            //     user: {
            //         name: this.selectedUser.name,
            //         surname: this.selectedUser.surname,
            //     },
            // };
            // this.qrcode = await QRCode.toDataURL(JSON.stringify(qrPayload));
        }
        catch (e) {
            // console.log(e);
        }
        finally {
            this.isLoaded = true;
        }
    },
    methods: {
        goToNextPage(nextPage){
            if (this.scenes.length === 0) {
                alert('You have to select the tasks for your activity. Please add them before going on.')
            }else{
                this.$refs.setupform.setScenes(this.scenes);
                this.nextPage = true;
            }
        },
        goToPreviousPage(nextPage){
            this.nextPage = false;
        },
        addScene(scene) {
            this.scenes.push(scene);
        },
        submitForm(form) {
            this.scenesNames = [];
            this.scenesDifficulty = [];
            for (let index = 0; index < form.scenes.length; index++) {
                const scene = form.scenes[index];
                switch (scene.name) {
                    case "Elliptic trajectory constant":
                        scene.name = 5;
                        break;
                    case "Elliptic trajectory natural":
                        scene.name = 6;
                        break;
                    case "Eight trajectory natural":
                        scene.name = 7;
                        break;
                    case "Harmonical trajectory natural":
                        scene.name = 8;
                        break;
                    case "Harmonical trajectory constant":
                        scene.name = 9;
                        break;
                    default:
                }
                this.scenesNames.push(scene.name);
                switch (scene.music) {
                    case "No music":
                        if (scene.rhythm === "No rhythm") {
                            if (scene.difficulty === "Easy")
                                scene.music = 0;
                            else if (scene.difficulty === "Medium")
                                scene.music = 1;
                            else if (scene.difficulty === "Difficult")
                                scene.music = 2;
                            this.scenesDifficulty.push(scene.music);
                        }
                        break;
                    case "Synch music":
                        if (scene.rhythm === "No rhythm") {
                            if (scene.difficulty === "Easy")
                                scene.music = 6;
                            else if (scene.difficulty === "Medium")
                                scene.music = 7;
                            else if (scene.difficulty === "Difficult")
                                scene.music = 8;
                            this.scenesDifficulty.push(scene.music);
                        }
                        break;
                    case "Asynch music":
                        if (scene.rhythm === "No rhythm") {
                            if (scene.difficulty === "Easy")
                                scene.music = 12;
                            else if (scene.difficulty === "Medium")
                                scene.music = 13;
                            else if (scene.difficulty === "Difficult")
                                scene.music = 14;
                            this.scenesDifficulty.push(scene.music);
                        }
                        break;
                    default:
                }
                switch (scene.rhythm) {
                    case "Synch rhythm":
                        if (scene.music === "No music") {
                            if (scene.difficulty === "Easy")
                                scene.rhythm = 3;
                            else if (scene.difficulty === "Medium")
                                scene.rhythm = 4;
                            else if (scene.difficulty === "Difficult")
                                scene.rhythm = 5;
                            this.scenesDifficulty.push(scene.rhythm);
                        }
                        break;
                    case "Asynch rhythm":
                        if (scene.music === "No music") {
                            if (scene.difficulty === "Easy")
                                scene.rhythm = 9;
                            else if (scene.difficulty === "Medium")
                                scene.rhythm = 10;
                            else if (scene.difficulty === "Difficult")
                                scene.rhythm = 11;
                            this.scenesDifficulty.push(scene.rhythm);
                        }
                        break;
                    default:
                }
            }
            const formToSave = {
                p: this.sessionId,
                m: form.maxTimeForActivity,
                t: form.numberTotalAttempts,
                r: form.numberRightAttempts,
                d: form.doTutorial,
                o: this.scenesNames,
                sd: this.scenesDifficulty,
            };
            this.form = JSON.stringify(formToSave);
            // alert(JSON.stringify(this.form))
            this.$refs.child.updateQr(this.form);
        }
    },
}
</script>
<style lang="css"> 

    .header-box {
        width: auto;
        height: 175px;
        padding: 28px;
        border: transparent;
        background-color: rgb(222, 222, 222);
        align-content: center;
    }

    .flex-container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: baseline;
    } 

    .logo {
        width: 460px;
        height: 150px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        opacity: 1;
        position: absolute;
        top: 2%;
        overflow: hidden;
    }

    .qr-box{
        width: 100%;
        border: transparent;
        margin-top: 50px;
        height: auto;
    }

    input[type=back]{
        margin-left: 1250px; 
        margin-right: auto;
        display: block;
        background-color: #FCB346;
        box-shadow: 0px 5px 8px 2px rgba(0, 0, 0, 0.199);
        height: 90px;
        width: 90px;
        border-radius: 50%;
        cursor: pointer;
        text-align: center;
        font-size: 60px;
    }

    input[type=back]:hover{
        background-color: #e89b26;
    }

    input[type=next]{
        margin-left: auto; 
        margin-right: 20px;
        display: block;
        background-color: #F47971;
        border: #ff5e52;
        box-shadow: 0px 5px 8px 2px rgba(0, 0, 0, 0.199);
        height: 90px;
        width: 90px;
        border-radius: 50%;
        cursor: pointer;
        text-align: center;
        font-size: 60px;
    }
    
    input[type=next]:hover{
        background-color: #f05348;
    }

  </style>
