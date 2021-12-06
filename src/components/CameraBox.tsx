import { useEffect, useRef } from 'react'

const captureImage = (videoRef: any) => {
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

  console.log(imageData.data)
}

export const CameraBox = () => {
  const videoRef = useRef<any>()
  const intervalRef = useRef<any>()

  useEffect(() => {
    const enableStream = async () => {
      // Add error handling later
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 500,
          height: 500,
        },
      })
      videoRef.current.srcObject = stream
      videoRef.current.play()
    }

    try {
      enableStream()

      intervalRef.current = setInterval(() => {
        captureImage(videoRef)
      }, 1000)
    } catch (err) {
      console.error(`unable to enable stream: ${err}`)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [videoRef])

  return (
    <div>
      <video ref={videoRef} />
    </div>
  )
}
