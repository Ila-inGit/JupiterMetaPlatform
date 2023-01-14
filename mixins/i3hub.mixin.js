export default {
  data() {
    return {
      currentActivity: null,
      allActivities: [],
      currentSubjects: [],
      currentOperator: null,
    }
  },
  methods: {
    parsePayload() {
      const payloadString = localStorage.getItem('payload')
      if (payloadString === undefined || !payloadString) {
        console.error('Impossibile to find the payload string')
        throw new Error('Impossibile to find the payload string')
      }
      const payload = JSON.parse(Buffer.from(payloadString, 'base64'))
      if (!payloadString) {
        console.error('Impossibile to parse the payload string')
        throw new Error('Impossibile to parse the payload string')
      }
      const { currentActivities, currentSubjects, currentOperator } = payload
      this.currentActivities = currentActivities
      this.currentSubjects = currentSubjects
      this.currentOperator = currentOperator
      let activity = currentActivities[0]
      if (activity.children && activity.children.length) {
        for (; activity.children.length > 0; activity = activity.children[0]) {
          this.currentActivity = activity
        }
      } else {
        this.currentActivity = activity
      }
    },
  },
}
