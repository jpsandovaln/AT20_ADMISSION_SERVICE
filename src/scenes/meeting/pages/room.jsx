// eslint-disable-next-line no-unused-vars
import { JaaSMeeting, JitsiMeeting } from '@jitsi/react-sdk';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
// import { searchMeeting } from '../helpers/searchMeeting';
import WaitingRoom from '../components/waiting';
import { useMutation, useQuery } from '@apollo/client';
import { GET_MEETING, GET_TOKEN } from '../../../graphql/metting';

const Room = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_MEETING, {
        variables: { id }
        //call a mutation to get the token
    })
    let meeting;

    const { id: id_user, firstName, lastName, email } = JSON.parse(localStorage.getItem('loginData')).info
    const userToSend = {
        id: id_user,
        name: `${firstName} ${lastName}`,
        email,
        moderator: false
    }

    const [getToken] = useMutation(GET_TOKEN)





    const [canJoin, setCanJoin] = useState(false);

    const JoinRoom = () => {
        // if meeting is not started yet, redirect to waiting room
        // if meeting is started, redirect to meeting
        console.log(meeting);
        const now = new Date();
        const meetingDate = new Date(meeting.date);
        const meetingStartTime = new Date(`${meeting.date} ${meeting.start_time}`);
        const meetingEndTime = new Date(`${meeting.date} ${meeting.end_time}`);

        if (now < meetingDate) {
            // REDIRECT TO WAITING ROOM
            setCanJoin(false);
        }

        if (now > meetingDate && now < meetingStartTime) {
            setCanJoin(false);
        }

        if (now > meetingDate && now > meetingStartTime && now < meetingEndTime) {
            setCanJoin(true);
        }

        if (now > meetingDate && now > meetingEndTime) {
            alert('Meeting has ended');
            return;
        }
        // eslint-disable-next-line no-console
        console.log('can join: ', canJoin);
    };


    useEffect(() => {
        // wait 5 seconds
        try {
            JoinRoom()
        } catch (e) {
            console.log(e)
        }
        console.log('just one');
        getToken({
            variables: {
                idGuest: userToSend.id,
                nameGuest: userToSend.name,
                emailGuest: userToSend.email,
                hostGuest: userToSend.moderator,
                idMeeting: id
            }
        }).then((res) => {
            setUser({
                info: userToSend,
                jwt: res.data.getToken
            })
        })
    }, []);


    const apiRef = useRef();

    // eslint-disable-next-line no-unused-vars
    const handleJitsiIFrameRef1 = iframeRef => {
        iframeRef.style.border = '10px solid #3d3d3d';
        iframeRef.style.background = '#3d3d3d';
        iframeRef.style.height = '400px';
        iframeRef.style.marginBottom = '20px';
    };

    // eslint-disable-next-line no-unused-vars
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

    // eslint-disable-next-line no-unused-vars
    const handleApiReady = apiObj => {
        apiRef.current = apiObj;
    };

    const renderSpinner = () => (
        <div style={{
            fontFamily: 'sans-serif',
            textAlign: 'center',
            color: 'red'
        }}>
            Loading..
        </div>
    );

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    meeting = data.meeting;

    // setUser({
    //     info: userToSend,
    //     jwt: await getToken()
    // })





    console.log(meeting);

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
            {(canJoin && user &&
                <JaaSMeeting
                    appId='vpaas-magic-cookie-e30d3fecc3564383a099d19e7275b56d'
                    roomName={meeting._id}
                    configOverwrite={{
                        subject: meeting.meeting_name,
                        hideConferenceSubject: false,
                        readOnlyName: true,
                        startWithAudioMuted: true,
                        startWithVideoMuted: true
                        // hiddenPremeetingButtons: ['camera','invite'],
                        // toolbarButtons: ['microphone','chat','hangup']
                    }}
                    spinner={renderSpinner}
                    // Update this with the `8x8.vc` or `stage.8x8.vc` version of interest
                    // and avoid mixing up different domains and release versions
                    // on the same page at the same time, as only the first
                    // external api script will be loaded.
                    // // release = 'release-1234'
                    userInfo={user.info}
                    jwt={user.jwt}
                    getIFrameRef={handleJaaSIFrameRef} />
            ) ||
                <WaitingRoom meeting={meeting} onFinishCount={() => {
                    setCanJoin(true);
                }} />}

        </>
    );
};

export default Room;
