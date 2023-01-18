<template>
  <div v-if="isLoaded">
    <!-- <div class="card text-center">
      <div class="rounded w-max mx-auto bg-green-500 border-green p-5">
        The application is currently running on
        <span class="rounded bg-green-200 p-1"> {{ url }}</span>
      </div>
    </div> -->
    <div v-if="selectedUser">
        <h1 class="text-xl mt-5" style="font-weight:bold; padding:14px; font-size: xx-large;">Fill the form for the session</h1>
        <!-- <div class="mx-auto rounded w-max border-2 border-black px-6 py-4 mt-5">
            <p class="font-bold">User data</p>
            <p>Name: {{ selectedUser.name }}</p>
            <p>Surname: {{ selectedUser.surname }}</p>
        </div> -->
      <!-- <img class="mx-auto" height="50" :src="qrcode" alt="" /> -->
      <div>
        <SetUpForm @form-submitted ='submitForm' ></SetUpForm>
      </div>
      <div>
        <QrCode ref="child" :session-token="sessionId"></QrCode>
      </div>
      
    </div>
    <div v-else class="card text-center mt-5">
      <div class="rounded w-max mx-auto bg-red-500 border-green p-5">
        If you see this, you need to open the application from i3hub
        <a class="bg-red-200 p-1 rounded" href="https://hub.i3lab.group"
          >https://hub.i3lab.group</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import QrCode from '~/components/QrCode.vue'
import SetUpForm from '~/components/SetUpForm.vue'
import i3hubMixin from '~/mixins/i3hub.mixin'
export default {
    name: "IndexPage",
    components: {QrCode,SetUpForm},
    mixins: [i3hubMixin],
    data() {
        return {
            isLoaded: false,
            selectedUser: null,
            sessionId: "",
            url: "",
            form: "",
            scenesNames: {
                type: Array,
            },
            scenesDifficulty: {
                type: Array,
            },
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
        submitForm(form) {
            this.scenesNames = [];
            this.scenesDifficulty = [];
            for (let index = 0; index < form.scenes.length; index++) {
                const scene = form.scenes[index];
                switch (scene.name) {
                    case "Constant movement":
                        scene.name = 5;
                        break;
                    case "Natural movement":
                        scene.name = 6;
                        break;
                    case "Eight movement":
                        scene.name = 7;
                        break;
                    case "Harmonical movement":
                        scene.name = 8;
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
