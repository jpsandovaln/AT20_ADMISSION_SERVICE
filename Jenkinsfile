pipeline {
    agent any
    stages {
        stage('Test'){
            agent { docker 'node:18-alpine3.16' }
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
    }
}
