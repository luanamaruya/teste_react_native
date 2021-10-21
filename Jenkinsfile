pipeline {
  agent any
  stages {
    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            echo 'Building....'
          }
        }

        stage('Paralele build') {
          steps {
            echo 'Par build'
          }
        }

      }
    }

    stage('Teste') {
      steps {
        echo 'Testing'
      }
    }

    stage('Deploy') {
      steps {
        echo 'deploying'
      }
    }

  }
}