pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        EMAIL_TO = 'anjaliitspark@gmail.com'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Pulling code from GitHub...'
                git branch: 'main',
                    url: 'https://github.com/Anjaliyadav20/jenkins-pipelines.git'
            }
        }

        stage('Install') {
            steps {
                echo '📦 Installing dependencies...'
                bat 'npm install'
                echo '🎭 Installing Playwright browsers...'
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Running Playwright tests...'
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            echo '📊 Archiving test reports...'
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }

        failure {
            echo '❌ Tests failed! Sending email...'
            mail to: "${EMAIL_TO}",
                 subject: "❌ Test Failed - Build #${env.BUILD_NUMBER}",
                 body: "Tests failed!\n\nBuild URL: ${env.BUILD_URL}\n\nPlease check the console output."
        }

        success {
            echo '✅ All tests passed!'
            mail to: "${EMAIL_TO}",
                 subject: "✅ Test Passed - Build #${env.BUILD_NUMBER}",
                 body: "All tests passed successfully!\n\nBuild URL: ${env.BUILD_URL}"
        }
    }
}
