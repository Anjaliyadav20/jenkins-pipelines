pipeline {
    agent any

    environment {
        EMAIL_TO = 'your-email@gmail.com'
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo.git'
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
                sh 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**'
        }

        failure {
            mail to: "${EMAIL_TO}",
                 subject: "❌ Test Failed",
                 body: "Check report: ${env.BUILD_URL}"
        }

        success {
            mail to: "${EMAIL_TO}",
                 subject: "✅ Test Passed",
                 body: "All tests passed"
        }
    }
}