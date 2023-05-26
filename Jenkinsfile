pipeline {
    agent any
    environment {
        DOCKER_PASS = credentials('docker_pass')
        SONAR_TOKEN = credentials('sonar_token')
    }
    stages {
        stage('Test') {
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
        stage('Code Inspection') {
            steps {
                sh '/var/jenkins_home/.sonar/sonar-scanner-4.7.0.2747-linux/bin/sonar-scanner \
                        -Dsonar.organization=at20-evv \
                        -Dsonar.projectKey=at20_evv \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=https://sonarcloud.io'  
            }
        }
        stage('Quality Gate') {
            steps {
                script {
                    timeout(time: 1, unit: 'HOURS') {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
                    }
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
                sh 'docker tag at20_admission_service esther12345/admission_service'
                sh 'docker push esther12345/admission_service'
           }
        }
    }
}