pipeline {
    agent any
    environment {
        DOCKER_PASS = credentials('docker_pass')
        SONAR_TOKEN = credentials('sonar_token')
        TARGET_HOST = '192.168.56.61'
        GIT_COMMIT_HASH = sh (script:"git rev-parse --short HEAD", returnStdout: true).trim()
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
                withSonarQubeEnv('sonar_scanner') {
                    sh '/var/jenkins_home/.sonar/sonar-scanner-4.7.0.2747-linux/bin/sonar-scanner \
                        -Dsonar.organization=at20-evv \
                        -Dsonar.projectKey=at20_evv \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=https://sonarcloud.io'  
                }
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
                sh 'docker tag at20_admission_service esther12345/admission_service:${GIT_COMMIT_HASH}'
                sh 'docker push esther12345/admission_service:${GIT_COMMIT_HASH}'
           }
        }
        stage('DeployToDev') {
            steps {
                sh 'export TAG_VERSION=${GIT_COMMIT_HASH} && docker-compose -f docker-compose-evv.yaml up -d'
                sh 'echo command to run smoke test'
            }
        }
        stage('DeployToAuto'){
            steps {
                sh 'export TAG_VERSION=${GIT_COMMIT_HASH} && DOCKER_HOST=ssh://$TARGET_HOST docker-compose -f docker-compose-evv.yaml up -d'
                sh 'echo command to run automation tests'
            }
        }
    }
    post{
        always {
            sh 'docker container prune -f'
            sh 'docker image prune -f --filter "dangling=true"'
            sh 'docker system prune -a -f'
        }
    }    
}	


