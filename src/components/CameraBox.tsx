import { useEffect, useRef, useState } from 'react'
import jsQR, { QRCode } from 'jsqr'

const captureImage = (videoRef: any, handler: Function) => {
  let video: HTMLVideoElement = videoRef.current

  let canvas: HTMLCanvasElement = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  let ctx = canvas.getContext('2d')

  ;(ctx as CanvasRenderingContext2D).drawImage(
    video,
    0,
    0,
    canvas.width,
    canvas.height,
  )
  let imageData = (ctx as CanvasRenderingContext2D).getImageData(
    0,
    0,
    canvas.width,
    canvas.height,
  )

  const code = jsQR(imageData.data, canvas.width, canvas.height)

  handler(code)
}

const getColorForQRData = (qrData: QRCode | null, selectedSize: string) => {
  if (qrData) {
    if (qrData.data === selectedSize) {
      return "green"
    } else {
      return "red"
    }
  }  else {
    return "yellow"
  }

}

interface CameraBoxProps {
  selectedSize: string
}

export const CameraBox = (props:CameraBoxProps) => {
  const videoRef = useRef<any>()
  const intervalRef = useRef<any>()
  const [qrData, setQrData] = useState<QRCode | null>(null)

  useEffect(() => {

  }, [qrData])

  useEffect(() => {
    const enableStream = async () => {
      // Add error handling later
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: {
            min: 300,
            ideal: 350,
            max: 500
          },
          height: {
            min: 300,
            ideal: 350,
            max: 500
          }
        },
      })
      videoRef.current.srcObject = stream
      videoRef.current.play()
    }

    try {
      enableStream()

      intervalRef.current = setInterval(() => {
        captureImage(videoRef, (code: QRCode | null) => {setQrData(code)})
      }, 1000)
    } catch (err) {
      console.error(`unable to enable stream: ${err}`)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [videoRef, setQrData])

  return (
    <div>
      <video ref={videoRef} playsInline/>
      {getColorForQRData(qrData, props.selectedSize)}
    </div>
  )
}
