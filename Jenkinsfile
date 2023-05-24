pipeline {
    agent any
    environment {
        DOCKER_PASS = credentials('docker_pass')
    }
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
                sh 'docker build -t at20_admission_service .'
            }
        }
        stage('Publish') {
           steps {
                sh 'docker login -u esther12345 -p ${DOCKER_PASS}'
                sh 'echo docker tag at20_admission_service esther12345/admission_service'
                sh 'echo docker push esther12345/admission_service'
           }
        }
    }
}