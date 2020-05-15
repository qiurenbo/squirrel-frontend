pipeline {
    agent any

    tools {nodejs "nodejs"}
    stages {
        stage('Build') {
            steps {
                    sh "npm install"
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
                docker.build()
                sh "docker build -t squirrel-frontend ."
            }
        }
    }
}
