pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
               sh "npm run build"
            }
        }
        stage('Test') {
            steps {
                //
            }
        }
        stage('Deploy') {
            steps {
                sh "docker build -t squirrel-frontend ."
            }
        }
    }
}
