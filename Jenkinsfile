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
                sh 'docker build -t at20_admission_service .'
            }
        }
        stage('Publish') {
           steps {
                sh 'echo docker tag at20_admission_service esther12345/admission_service'
                sh 'echo docker push esther12345/admission_service'
           }
        }
    }
}