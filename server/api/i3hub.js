import { Router } from 'express'

const router = Router()

const serviceHost = process.env.HOST || 'http://localhost:3010'

const getConfiguration = () => {
  console.log(serviceHost)
  return {
    name: 'jupiter',
    label: 'Jupiter',
    description: 'Jupiter HoloLens',
    type: 'full',
    image: `${serviceHost}/img/Jgrande.png`,
    configuration: {
      activitiesConfiguration: {
        activities: [
          {
            name: 'act1',
            description: 'Generate QR from init parameters',
            label: 'Generate QR',
            image: `${serviceHost}/img/Jgrande.png`,
            isPlaylist: false,
            isConfigurable: false,
            type: 'live',
            manifest: {},
            configuration: {},
          },
        ],
      },
      sessionConfiguration: {
        postSessionConfiguration: {},
        liveSessionConfiguration: {
          payloadThrough: 'frontend',
          livePath: '/',
          lockControls: false,
        },
      },
      serviceConfiguration: {
        hasActivities: true,
        hasConfigurableActivities: false,
        serviceUrl: serviceHost,
      },
      subjectConfiguration: {
        isMandatory: false,
        manifest: {
          id: '/jupiter.subject',
          type: 'object',
          properties: {
            favColor: {
              label: 'Favourite colour',
              description: 'The favourite colour of the user',
              type: 'string',
              default: 'red',
            },
          },
        },
      },
    },
  }
}

router.get('/service', async (req, res) => {
  return res.json(getConfiguration())
})

router.get('/fileToDownload', async (req, res) => {
  return res.sendStatus(200)
})

router.get('/healthcheck', async (req, res) => {
  return res.sendStatus(200)
})

router.post('/payload', (req, res) => {
  return res.send(`<html>
  <script>
  localStorage.setItem('payload', '${JSON.stringify(
    req.body.payload,
    null,
    2
  )}');
  </script>
  </html>`)
})

export default router
