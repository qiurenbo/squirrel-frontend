pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
               nodejs(nodeJSInstallationName: 'nodejs') {
                    sh "npm run build"
                }

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
