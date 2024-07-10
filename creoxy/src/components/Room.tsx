import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import Navbar from "./Navbar";

import './Room.css';

const URL = "http://localhost:3000";

export const Room = ({
    name,
    localAudioTrack,
    localVideoTrack
}: {
    name: string,
    localAudioTrack: MediaStreamTrack | null,
    localVideoTrack: MediaStreamTrack | null,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [lobby, setLobby] = useState(true);
    const [socket, setSocket] = useState<null | Socket>(null);
    const [sendingPc, setSendingPc] = useState<null | RTCPeerConnection>(null);
    const [receivingPc, setReceivingPc] = useState<null | RTCPeerConnection>(null);
    const [remoteVideoTrack, setRemoteVideoTrack] = useState<MediaStreamTrack | null>(null);
    const [remoteAudioTrack, setRemoteAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [remoteMediaStream, setRemoteMediaStream] = useState<MediaStream | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const [joined, setJoined] = useState(false);

    const initializeSocket = () => {
        const newSocket = io(URL);
        newSocket.on('send-offer', async ({ roomId }) => {
            console.log("sending offer");
            setLobby(false);
            const pc = new RTCPeerConnection();

            setSendingPc(pc);
            if (localVideoTrack) {
                console.error("added track");
                console.log(localVideoTrack);
                pc.addTrack(localVideoTrack);
            }
            if (localAudioTrack) {
                console.error("added track");
                console.log(localAudioTrack);
                pc.addTrack(localAudioTrack);
            }

            pc.onicecandidate = async (e) => {
                console.log("receiving ice candidate locally");
                if (e.candidate) {
                    newSocket.emit("add-ice-candidate", {
                        candidate: e.candidate,
                        type: "sender",
                        roomId
                    });
                }
            };

            pc.onnegotiationneeded = async () => {
                console.log("on negotiation needed, sending offer");
                const sdp = await pc.createOffer();
                //@ts-ignore
                pc.setLocalDescription(sdp);
                newSocket.emit("offer", {
                    sdp,
                    roomId
                });
            };
        });

        newSocket.on("offer", async ({ roomId, sdp: remoteSdp }) => {
            console.log("received offer");
            setLobby(false);
            const pc = new RTCPeerConnection();
            pc.setRemoteDescription(remoteSdp);
            const sdp = await pc.createAnswer();
            //@ts-ignore
            pc.setLocalDescription(sdp);
            const stream = new MediaStream();
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream;
            }

            setRemoteMediaStream(stream);
            setReceivingPc(pc);
            pc.ontrack = (e) => {
                console.log("ontrack");
            };

            pc.onicecandidate = async (e) => {
                if (!e.candidate) {
                    return;
                }
                console.log("on ice candidate on receiving side");
                if (e.candidate) {
                    newSocket.emit("add-ice-candidate", {
                        candidate: e.candidate,
                        type: "receiver",
                        roomId
                    });
                }
            };

            newSocket.emit("answer", {
                roomId,
                sdp: sdp
            });

            setTimeout(() => {
                const track1 = pc.getTransceivers()[0].receiver.track;
                const track2 = pc.getTransceivers()[1].receiver.track;
                console.log(track1);
                if (track1.kind === "video") {
                    setRemoteAudioTrack(track2);
                    setRemoteVideoTrack(track1);
                } else {
                    setRemoteAudioTrack(track1);
                    setRemoteVideoTrack(track2);
                }
                //@ts-ignore
                remoteVideoRef.current.srcObject.addTrack(track1);
                //@ts-ignore
                remoteVideoRef.current.srcObject.addTrack(track2);
                //@ts-ignore
                remoteVideoRef.current.play();
            }, 5000);
        });

        newSocket.on("answer", ({ roomId, sdp: remoteSdp }) => {
            setLobby(false);
            setSendingPc(pc => {
                pc?.setRemoteDescription(remoteSdp);
                return pc;
            });
            console.log("loop closed");
        });

        newSocket.on("lobby", () => {
            setLobby(true);
        });

        newSocket.on("add-ice-candidate", ({ candidate, type }) => {
            console.log("add ice candidate from remote");
            console.log({ candidate, type });
            if (type === "sender") {
                setReceivingPc(pc => {
                    pc?.addIceCandidate(candidate);
                    return pc;
                });
            } else {
                setSendingPc(pc => {
                    pc?.addIceCandidate(candidate);
                    return pc;
                });
            }
        });

        setSocket(newSocket);
    };

    const handleNext = () => {
        if (socket) {
            socket.disconnect();
            setSendingPc(null);
            setReceivingPc(null);
            setRemoteVideoTrack(null);
            setRemoteAudioTrack(null);
            setRemoteMediaStream(null);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = null;
            }
            initializeSocket();
        }
    };

    useEffect(() => {
        initializeSocket();
    }, [name]);

    useEffect(() => {
        if (localVideoRef.current) {
            if (localVideoTrack) {
                localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
                localVideoRef.current.play();
            }
        }
    }, [localVideoRef]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="text-lg font-semibold text-gray-800 mb-4">
                    Hi {name}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 w-full">
                    <video className="w-full md:w-1/2 rounded shadow-md" autoPlay ref={localVideoRef} />
                    {lobby && (
                        <div className="text-gray-600 text-center w-full md:w-1/2">
                            Waiting to connect you to someone
                        </div>
                    )}
                    <video className="w-full md:w-1/2 rounded shadow-md" autoPlay ref={remoteVideoRef} />
                </div>
            </div>
            <button
                onClick={handleNext}
                className="border border-gray-500 rounded-lg bg-transparent px-5 py-2 hover:bg-gray-500 hover:text-white transition duration-300 Next">
                Next
            </button>
        </>
    );
};
