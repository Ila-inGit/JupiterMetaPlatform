import { Router } from 'express'

const router = Router()

const serviceHost = process.env.HOST || 'http://localhost:3010'

const getConfiguration = () => {
  console.log(serviceHost)
  return {
    name: 'qrcode',
    label: 'QR Code',
    description: 'Test application with QR Code',
    type: 'full',
    image: `${serviceHost}/img/qr.png`,
    configuration: {
      activitiesConfiguration: {
        activities: [
          {
            name: 'act1',
            description: 'Show the QR Code of the selected user',
            label: 'QR Code Display',
            image: `${serviceHost}/img/qr.png`,
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
          id: '/qrcode.subject',
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
