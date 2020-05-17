pipeline {
    agent any

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
                    remote.port = 22
                    remote.allowAnyHosts = true
                    withCredentials([
                        sshUserPrivateKey(
                            credentialsId: 'test',
                            keyFileVariable: 'identity',
                            passphraseVariable: '',
                            usernameVariable: 'userName')
                        ])
                    {
                        remote.user = userName
                        remote.identityFile = identity

                        sshCommand remote: remote, command: "if [ \$(docker ps | grep -c \"squirrel-frontend\") == 1 ]; then docker stop  squirrel-frontend; fi"
                        sshCommand remote: remote, command: "if [ \$(docker ps -a | grep -c \"squirrel-frontend\") == 1 ]; then docker rm squirrel-frontend; fi"
                        sshCommand remote: remote, command: "if [ \$(docker images | grep -c \"192.168.33.12/library/squirrel-frontend\") == 1 ]; then docker rmi --force 192.168.33.12/library/squirrel-frontend; fi"

                        sshCommand remote: remote, command: "docker login 192.168.33.12 -u admin -p Harbor12345"
                    
                        sshCommand remote: remote, command: "docker pull 192.168.33.12/library/squirrel-frontend"

                        sshCommand remote: remote, command: "docker run -d --network host --restart=always  --name squirrel-frontend 192.168.33.12/library/squirrel-frontend"
                    }
                
                }
      
            }

        }
    }
}
