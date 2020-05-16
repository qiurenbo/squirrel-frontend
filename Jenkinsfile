pipeline {
    agent any

    tools {nodejs "nodejs"}
    stages {
      stage('Build') {
            steps {
                sh "docker build -t squirrel-frontend ."
              
            }
        }

        stage('Test') {
            steps {
                //
                echo "test"
            }
        }
     stage('Push to harbor') {
            steps {
                sh "docker login 192.168.33.12 -u admin -p Harbor12345"
                sh "docker tag squirrel-frontend 192.168.33.12/library/squirrel-frontend"
                sh "docker push 192.168.33.12/library/squirrel-frontend"
                sh "docker rmi --force 192.168.33.12/library/squirrel-frontend"
            }
        }

        stage('Pull from harbor') {
            steps {

                script {
                    def remote = [:]
                    remote.name = 'test'
                    remote.host = '192.168.33.10'
                    remote.user = 'root'
                    remote.port = 22
                    remote.password = 'vagrant'
                    remote.allowAnyHosts = true

                    sshCommand remote: remote, command: "docker stop  squirrel-frontend"
                    sshCommand remote: remote, command: "docker rm squirrel-frontend"
                    sshCommand remote: remote, command: "docker rmi --force 192.168.33.12/library/squirrel-frontend"

                    sshCommand remote: remote, command: "docker login 192.168.33.12 -u admin -p Harbor12345"
                
                    sshCommand remote: remote, command: "docker pull 192.168.33.12/library/squirrel-frontend"

                    sshCommand remote: remote, command: "docker run -d --network host --restart=always  --name squirrel-frontend 192.168.33.12/library/squirrel-frontend"
                }
      
            }

        }
    }
}
