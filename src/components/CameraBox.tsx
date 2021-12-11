import { useEffect, useRef, useState } from "react";
import jsQR, { QRCode } from "jsqr";

const captureImage = (videoRef: any, handler: Function) => {
  let video: HTMLVideoElement = videoRef.current;

  let canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  let ctx = canvas.getContext("2d");

  (ctx as CanvasRenderingContext2D).drawImage(
    video,
    0,
    0,
    canvas.width,
    canvas.height
  );
  let imageData = (ctx as CanvasRenderingContext2D).getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const code = jsQR(imageData.data, canvas.width, canvas.height);

  handler(code);
};

const MATCH_VALUE = "COCOK";
const NOT_MATCH_VALUE = "TIDAK COCOK";
const SEARCHING_VALUE = "MENCARI";
const NO_SELECTION = "";

const borderColorValue: { [key: string]: string } = {
  [MATCH_VALUE]: "border-green-400",
  [NOT_MATCH_VALUE]: "border-red-400",
  [SEARCHING_VALUE]: "border-yellow-400",
};

const getValueForQRDataMatching = (
  qrData: QRCode | null,
  selectedSize: string
) => {
  if (qrData) {
    if (qrData.data === selectedSize) {
      return MATCH_VALUE;
    } else {
      return NOT_MATCH_VALUE;
    }
  } else {
    return SEARCHING_VALUE;
  }
};

interface CameraBoxProps {
  selectedSize: string;
}

export const CameraBox = (props: CameraBoxProps) => {
  const videoRef = useRef<any>();
  const intervalRef = useRef<any>();
  const [matchStatus, setMatchStatus] = useState<string>(SEARCHING_VALUE);

  const { selectedSize } = props;

  useEffect(() => {
    const enableStream = async () => {
      // Add error handling later
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: {
            min: 300,
            ideal: 350,
            max: 500,
          },
          height: {
            min: 300,
            ideal: 350,
            max: 500,
          },
        },
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    };

    try {
      enableStream();
    } catch (err) {
      console.error(`unable to enable stream: ${err}`);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [videoRef, setMatchStatus]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (selectedSize) {
      intervalRef.current = setInterval(() => {
        captureImage(videoRef, (code: QRCode | null) => {
          console.log({ selectedSize });
          setMatchStatus(getValueForQRDataMatching(code, selectedSize));
        });
      }, 1000);
    }
  }, [selectedSize]);

  return (
    <div>
      <video
        className={`border-4 ${borderColorValue[matchStatus]}`}
        ref={videoRef}
        playsInline
      />
      {selectedSize === NO_SELECTION ? (
        <div>Mohon Pilih Ukuran</div>
      ) : (
        <div className="">{matchStatus}</div>
      )}
    </div>
  );
};
