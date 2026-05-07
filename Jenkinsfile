pipeline {

    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        EMAIL_TO = 'anjaliitspark@gmail.com'
    }

    stages {

        stage('Checkout Code') {
            steps {

                echo '📥 Pulling code from GitHub...'

                git branch: 'main',
                    url: 'https://github.com/Anjaliyadav20/jenkins-pipelines.git'
            }
        }

        stage('Install Dependencies') {
            steps {

                echo '📦 Installing npm packages...'

                bat 'npm install'

                echo '🎭 Installing Playwright browsers...'

                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {

                echo '🧪 Running Playwright tests...'

                bat 'npx playwright test'
            }
        }
    }

    post {

        always {

            echo '📊 Publishing Playwright Report...'

            archiveArtifacts artifacts: 'playwright-report/**',
                             allowEmptyArchive: true

            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }

        success {

            echo '✅ Tests Passed! Sending success email...'

            emailext(
                to: "${EMAIL_TO}",
                subject: "✅ Playwright Tests Passed - Build #${env.BUILD_NUMBER}",

                body: """
                <h2>✅ Playwright Automation Success</h2>

                <p>All tests passed successfully 🎉</p>

                <p>
                <b>Build Number:</b> ${env.BUILD_NUMBER}
                </p>

                <p>
                <b>Build URL:</b>
                <a href="${env.BUILD_URL}">
                Open Jenkins Build
                </a>
                </p>
                """,

                mimeType: 'text/html'
            )
        }

        failure {

            echo '❌ Tests Failed! Sending failure email...'

            emailext(
                to: "${EMAIL_TO}",
                subject: "❌ Playwright Tests Failed - Build #${env.BUILD_NUMBER}",

                body: """
                <h2>❌ Playwright Automation Failed</h2>

                <p>Some tests failed during execution.</p>

                <p>
                <b>Build Number:</b> ${env.BUILD_NUMBER}
                </p>

                <p>
                <b>Build URL:</b>
                <a href="${env.BUILD_URL}">
                Open Jenkins Build
                </a>
                </p>

                <p>Please check console logs and HTML report.</p>
                """,

                mimeType: 'text/html'
            )
        }
    }
}
