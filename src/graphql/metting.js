import { gql } from '@apollo/client'

export const CREATE_MEETING = gql`
mutation newMeeting($data: String!) {
    newMeeting(data: $data)
  }
`

export const GET_MY_MEETINGS = gql`
query MyMeetings($id: ID) {
  myMeetings(_id: $id) {
    _id
    date
    description
    end_time
    start_time
    meeting_name
  }
}
`

export const GET_MEETING = gql`
query Meeting($id: ID!) {
  meeting(_id: $id) {
    _id
    date
    description
    end_time
    start_time
    meeting_name
  }
}`;

export const GET_TOKEN = gql`
mutation GetToken($idGuest: String, $nameGuest: String, $emailGuest: String, $hostGuest: Boolean, $idMeeting: String) {
  getToken(id_guest: $idGuest, name_guest: $nameGuest, email_guest: $emailGuest, host_guest: $hostGuest, id_meeting: $idMeeting)
}
`