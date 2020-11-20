pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }

  }
  stages {
    stage('Initialize') {
      steps {
        sh '''node --version



'''
        sh 'pwd'
      }
    }

  }
  environment {
    GITHUB_TOKEN_ARG = '1e97d23ae323504f8de6221feaefc72ab179851d'
  }
}