import { useEffect, useRef, useState } from "react";
import { Room } from "./Room";
import "tailwindcss/tailwind.css"; 
import './Landing.css'
import Navbar from './Navbar'
import Footer from './Footer'

export const Landing = () => {
    const [name, setName] = useState("");
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [joined, setJoined] = useState(false);

    const getCam = async () => {
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        const audioTrack = stream.getAudioTracks()[0];
        const videoTrack = stream.getVideoTracks()[0];
        setLocalAudioTrack(audioTrack);
        setlocalVideoTrack(videoTrack);
        if (videoRef.current) {
            videoRef.current.srcObject = new MediaStream([videoTrack]);
            videoRef.current.play();
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            getCam();
        }
    }, [videoRef]);

    if (!joined) {
        return (
            <>
            <Navbar></Navbar>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                
            <h1 className="text-xl mb-8">Welcome to Creoxy</h1>
            <div className="w-full max-w-3xl aspect-video mb-4">
                <video 
                    autoPlay 
                    ref={videoRef} 
                    className="w-full h-full object-cover border rounded-md shadow-lg"
                ></video>
            </div>
            <input
                type="text"
                placeholder="What can we call you?"
                onChange={(e) => setName(e.target.value)}
                className="mb-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
            onClick={() => setJoined(true)}
                className="px-6 py-2 text-Black rounded-md border border-black hover:bg-gray-300 transition duration-300"
            >
                Join
            </button>
        </div>
        <Footer></Footer>
        </>

        );
    }

    return <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />;
};
