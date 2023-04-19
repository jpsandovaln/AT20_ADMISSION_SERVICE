import { gql } from '@apollo/client'

export const CREATE_QUESTION_MUTATION = gql`
    mutation CreateQuestion($question: String, $test: String, $imgSrc: String, $type: String, $answer: String, $options: [OptionInput]) {
      createQuestion(question: $question, test: $test, imgSrc: $imgSrc, type: $type, answer: $answer, options: $options) {
        id
        question
        test
        imgSrc
        type
        answer
        options {
          label
          value
        }
      }
    }
  `;