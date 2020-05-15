pipeline {
    agent any

    tools {nodejs "nodejs"}
    stages {
        stage('Build') {
            steps {
                    sh "npm run build"
            }
        }
        stage('Test') {
            steps {
                //
                echo "test"
            }
        }
        stage('Deploy') {
            steps {
                sh "docker build -t squirrel-frontend ."
            }
        }
    }
}
