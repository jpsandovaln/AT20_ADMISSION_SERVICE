import { gql } from '@apollo/client'

export const CREATE_MEETING = gql`
mutation newMeeting($data: String!) {
    newMeeting(data: $data)
  }
`