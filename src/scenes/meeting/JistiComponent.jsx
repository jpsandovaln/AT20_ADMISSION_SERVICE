import { JaaSMeeting, JitsiMeeting } from '@jitsi/react-sdk';
import { useRef } from 'react';

export const JitsiComponent = ({user}) => {
    const apiRef = useRef();


    const handleJitsiIFrameRef1 = iframeRef => {
        iframeRef.style.border = '10px solid #3d3d3d';
        iframeRef.style.background = '#3d3d3d';
        iframeRef.style.height = '400px';
        iframeRef.style.marginBottom = '20px';
    };

    const handleJitsiIFrameRef2 = iframeRef => {
        iframeRef.style.marginTop = '10px';
        iframeRef.style.border = '10px dashed #df486f';
        iframeRef.style.padding = '5px';
        iframeRef.style.height = '400px';
    };

    const handleJaaSIFrameRef = iframeRef => {
        iframeRef.style.border = '10px solid #3d3d3d';
        iframeRef.style.background = '#3d3d3d';
        iframeRef.style.height = '90%';
        iframeRef.style.marginBottom = '20px';
    };

    const handleApiReady = apiObj => {
        apiRef.current = apiObj;
    };

    const renderSpinner = () => (
        <div style = {{
            fontFamily: 'sans-serif',
            textAlign: 'center',
            color: 'red'
        }}>
            Loading..
        </div>
    );


    return (
        <>
            {/* <JitsiMeeting
                roomName = "at20-reu-meeting"
                spinner = { renderSpinner }
                configOverwrite = {{
                    subject: 'lalalala',
                    hideConferenceSubject: false
                }}
                getIFrameRef = { handleJitsiIFrameRef1 } /> */}
            <JaaSMeeting
                appId='vpaas-magic-cookie-e30d3fecc3564383a099d19e7275b56d'
                roomName = "at20-reu-meeting"
                configOverwrite = {{
                    subject: 'METTING INFORMATION',
                    hideConferenceSubject: false,
                    readOnlyName: true,
                    startWithAudioMuted: true,
                    startWithVideoMuted: true,
                    // hiddenPremeetingButtons: ['camera','invite'],
                    // toolbarButtons: ['microphone','chat','hangup']
                }}
                spinner = { renderSpinner }
                // Update this with the `8x8.vc` or `stage.8x8.vc` version of interest
                // and avoid mixing up different domains and release versions
                // on the same page at the same time, as only the first
                // external api script will be loaded.
                // // release = 'release-1234'
                userInfo={ user }
                jwt='eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtZTMwZDNmZWNjMzU2NDM4M2EwOTlkMTllNzI3NWI1NmQvNjU2YjA4LVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE2NzkzNDk0MzksImV4cCI6MTY3OTM1NjYzOSwibmJmIjoxNjc5MzQ5NDM0LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtZTMwZDNmZWNjMzU2NDM4M2EwOTlkMTllNzI3NWI1NmQiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6InBlcGl0byIsImlkIjoiZ29vZ2xlLW9hdXRoMnwxMDEzMjExMjI1MTYzMDQ3ODMzMzMiLCJhdmF0YXIiOiIiLCJlbWFpbCI6InBlcGl0b0BnbWFpbC5jb20ifX0sInJvb20iOiIqIn0.dQuzcsI-3j0yflXQYYBFdnxTMMyh5HUGMS2JatZ8UmvfEW1GicdYC04kxOVlX4S69OC3TKuH1tgyAu7L35eBsfpt05qfsihN0uuv5CSaX-jGX9p_jRuLy1hpf93-c2lOMOvENQ-qlzNezhtNyqVKlxZ9ym51E3JxS8W8KihmNnUHp75VNLBvUDgX1ocb0ou28l62v0QfFRliYmd66NrjTLvEjUxRPAHsKvbnWiHgH11XqB87xuJs7NVSdsMC829aSy2kDPnrEO_WyhMtc81A3_9UVbp6XMj6difs3BGNWoBE5hbr9kssz1kkeETk4zJrauqsirzrm3J_hfyPCBiaVA'
                getIFrameRef = { handleJaaSIFrameRef } />
        </>
    );
};
