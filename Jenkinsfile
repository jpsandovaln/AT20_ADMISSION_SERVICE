pipeline {
    agent any
    stages {
        stage('Test'){
            agent { docker 'node:18-alpine3.16' }
            steps {
                sh 'npm install'
                sh 'npx jest'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'test/report/report.html', followSymlinks: false
                }
            }
        }
        stage('Package') {
            steps {
                sh 'docker build -t at20_meeting_service .'
            }
        }
        stage('Publish') {
           
        }
    }
}