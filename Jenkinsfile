pipeline {
    agent any

    environment {
        EMAIL_TO = 'anjaliitspark@gmail.com'
    }

    stages {
        // Stage 1: GitHub से code लाओ
        stage('Checkout') {
            steps {
                echo '📥 Pulling code from GitHub...'
                git 'https://github.com/Anjaliyadav20/jenkins-pipelines.git'
            }
        }

        // Stage 2: Dependencies install करो
        stage('Install') {
            steps {
                echo '📦 Installing dependencies...'
                bat 'npm install'  // ← Windows के लिए 'sh' की जगह 'bat'
                echo '🎭 Installing Playwright browsers...'
                bat 'npx playwright install'  // ← Windows के लिए 'bat'
            }
        }

        // Stage 3: Tests चलाओ
        stage('Run Tests') {
            steps {
                echo '🧪 Running Playwright tests...'
                bat 'npx playwright test'  // ← Windows के लिए 'bat'
            }
        }
    }

    // Build complete होने के बाद
    post {
        // हमेशा चलेगा (success हो या fail)
        always {
            echo '📊 Archiving test reports...'
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            // Report को publish करो
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
        }

        // Test fail हो गया
        failure {
            echo '❌ Tests failed! Sending email...'
            mail to: "${EMAIL_TO}",
                 subject: "❌ Test Failed - Build #${env.BUILD_NUMBER}",
                 body: "Tests failed!\n\nBuild URL: ${env.BUILD_URL}\n\nCheck the report for details."
        }

        // Test pass हो गया
        success {
            echo '✅ All tests passed!'
            mail to: "${EMAIL_TO}",
                 subject: "✅ Test Passed - Build #${env.BUILD_NUMBER}",
                 body: "All tests passed successfully!\n\nBuild URL: ${env.BUILD_URL}"
        }
    }
}