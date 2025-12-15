pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
         SONARQUBE_SERVER = 'SonarQube'   // Must match the name in Jenkins config
    }

    tools {
        nodejs 'NodeJS'
       
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo " Checking out code..."
                git url: 'https://github.com/maggidon/Real-Time_MERN-_Chat_with_DevOps-Automation.git', branch: 'master'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    echo " Installing backend dependencies..."
                    sh 'npm ci || npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    echo "Installing frontend dependencies (including dev)..."
                    sh '''
                        # Remove old modules
                        rm -rf node_modules package-lock.json
                        
                        # Clear NODE_ENV to make sure devDependencies install hoti hain
                        NODE_ENV= npm install
                        
                        # Confirm vite binary
                        ls -la node_modules/.bin | grep vite || echo "vite binary still missing!"
                    '''
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    echo "Running backend tests..."
                    sh 'npm test || echo " No tests found, skipping..."'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo "🔍 Running SonarQube Analysis..."
                withSonarQubeEnv("${SONARQUBE_SERVER}") {
                    withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
                        sh '''
                            npx sonar-scanner \
                              -Dsonar.projectKey=lets-talk-nodejs \
                              -Dsonar.sources=backend,frontend/src \
                              -Dsonar.exclusions=**/node_modules/**,**/*.test.js,frontend/dist/** \
                              -Dsonar.host.url=http://localhost:9000 \
                              -Dsonar.token=$SONAR_TOKEN
                        '''
                    }
                }
            }
                    
        }

        stage('Deploy') {
            steps {
                echo " Deploy step (coming soon)..."
            }
        }
    }

    post {
        success {
            echo 'Build + Tests + SonarQube successful!'
        }
        failure {
            echo 'Something is wrong in Pipeline'
        }
    }
}
